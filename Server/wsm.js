async function run() {
    let browser = "";
    try {
        const puppeteer = require('puppeteer');
        const URL = 'https://wsm.framgia.vn/vi/dashboard/user_timesheets';
        const EMAIL_LOGIN = 'bui.tuan.truong@framgia.com';
        const PASSWORD_LOGIN = 'truong123';

        browser = await puppeteer.launch({headless: false});
        console.log('xcvxcv');
        const page = await browser.newPage();
        page.setViewport({width: 1280, height: 720});
        await page.goto(URL);

        // START LOGIN ===============
        await page.click('.btn-login');

        await page.type('#user_email', EMAIL_LOGIN);
        await page.waitFor(500);
        await page.type('#user_password', PASSWORD_LOGIN);
        await page.waitFor(500);

        await page.click('#devise-login-form .login-success');
        await page.waitForSelector('.curr tbody tr');
        // =============== END LOGIN

        const dateResponse = await page.evaluate(() => {
            let dayIL = [];
            document.querySelectorAll(".calendar-content .calendar-content .brg-pink").forEach(function (day) {
                dayIL.push(day.closest('td').getAttribute('class') + ' ' + day.innerText);
            });
            return dayIL;
        });

        console.log(dateResponse);

        if (dateResponse.length == 0) {
            return 'You\'re so good';
        }

        const promises = [];
        for (let i = 0; i < dateResponse.length; i++) {
            promises.push(await inputForm(dateResponse[i], page));
        }

        await Promise.all(promises);
        return 'Done';
    } catch (error) {
        browser.close();
        return error.message;
    }
}

async function inputForm(date, page) {
    await page.goto('https://wsm.framgia.vn/vi/dashboard/users/598/request_leaves/new');
    await page.waitFor(500);
    await page.type('#request_leave_checkin_morning', date);
    await page.waitFor(500);
    await page.type('#new_request_leave textarea', "Em test thôi ạ. đừng approve (bow)");
    await page.waitFor(500);
    await page.click('#new_request_leave input[name=commit]');

    await page.waitForSelector('#request_leave_search', {timeout: 10000}).catch(async function (e) {
        const errorSubmitForm = await page.evaluate(() => {
            return document.querySelector('#error_explanation ul').innerText;
        });
        throw new Error(errorSubmitForm);
    });
    await page.waitFor(500);

    return page;
}

// module.exports = run;
