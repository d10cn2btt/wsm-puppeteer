const puppeteer = require('puppeteer');
const DOMAIN = 'https://wsm.framgia.vn';

const URL_TIMESHEET = DOMAIN + '/vi/dashboard/user_timesheets';
const URL_FORM_REQUEST = DOMAIN + '/vi/dashboard/users/598/request_leaves/new';
const URL_LIST_FORM = DOMAIN + '/vi/dashboard/users/598/request_leaves';

const STATUS_OK = 200;
const STATUS_ERROR = 401;

const TYPE_REQUEST_IL = 1;
const TYPE_REQUEST_LE = 14;

let browser = "";
let statusCode = STATUS_OK;
let resContent = {};

module.exports.checkDate = async function (email, password) {
    try {
        let page = await loginWSM(email, password);
        resContent.check_date = await page.evaluate(() => {
            let dayIL = [];
            let dayLE = [];
            document.querySelectorAll(".calendar-content .calendar-content .brg-red.event-in").forEach(function (day) {
                dayIL.push(day.closest('td').getAttribute('class') + ' ' + day.innerText);
            });

            document.querySelectorAll(".calendar-content .calendar-content .brg-red.event-out").forEach(function (day) {
                dayLE.push(day.closest('td').getAttribute('class') + ' ' + day.innerText);
            });

            return {
                "day_IL": dayIL,
                "day_LE": dayLE,
            };
        });

        // const promises = [];
        // for (let i = 0; i < dateResponse.length; i++) {
        //     promises.push(await inputForm(dateResponse[i], page));
        // }
        //
        // await Promise.all(promises);
        // browser.close();
        // return dateResponse;
    } catch (error) {
        statusCode = STATUS_ERROR;
        resContent.message = error.message;
    }

    browser.close();
    return {
        "status_code": statusCode,
        "res_content": resContent
    }
};

async function loginWSM(email, password) {
    browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.setViewport({width: 1280, height: 720});
    await page.goto(URL_TIMESHEET);

    // START LOGIN ===============
    await page.click('.btn-login');

    await page.type('#user_email', email);
    await page.waitFor(500);
    await page.type('#user_password', password);
    await page.waitFor(500);

    await page.click('#devise-login-form .login-success');
    // check authentication
    await page.waitForSelector('.curr tbody tr', {timeout: 10000}).catch(async function (e) {
        throw new Error("Login fail");
    });
    // =============== END LOGIN

    return page;
}

module.exports.submitFormRequest = async function (req) {
    try {
        let params = req.body;
        let page = await loginWSM(params.email, params.password);
        let elementTime = "request_leave_checkin_morning";

        await page.goto(URL_FORM_REQUEST);

        if (params.type_request == TYPE_REQUEST_LE) {
            await page.waitFor(500);
            await page.select('select[name="request_leave[leave_type_id]"]', params.type_request.toString());
            elementTime = "request_leave_early";
        }

        await page.waitFor(500);
        await page.type('#' + elementTime, params.date);
        await page.waitFor(500);
        await page.keyboard.press('Tab');
        await page.waitFor(500);
        // check valid time
        let timeInvalid = await page.waitForSelector('.showSweetAlert', {timeout: 500})
            .then(async function (e) {
                return await page.evaluate(() => {
                    return document.querySelector('.showSweetAlert p').innerText;
                });
            }).catch(async function (e) { return true; });
        
        if (typeof timeInvalid == "string") {
            throw new Error(timeInvalid);
        }

        await page.type('#new_request_leave textarea', params.reason);
        await page.waitFor(500);

        await page.click('#new_request_leave input[name=commit]');
        // wait until page loaded
        await page.waitForNavigation();

        resContent.url_edit = await page.waitForSelector('#request_leave_search', {timeout: 2000})
            .then(async function (e) {
                return await page.evaluate(() => {
                    return DOMAIN + document.querySelector(".list-request-leaves tr:nth-child(1) td:last-child a.btn-warning").getAttribute('href');
                });
            })
            .catch(async function (e) {
                const errorSubmitForm = await page.evaluate(() => {
                    return document.querySelector('#error_explanation ul').innerText;
                });
                throw new Error(errorSubmitForm);
            });

        resContent.url_list = URL_LIST_FORM;

    } catch (error) {
        statusCode = STATUS_ERROR;
        resContent.message = error.message;
    }

    browser.close();
    return {
        "status_code": statusCode,
        "res_content": resContent
    }
};
