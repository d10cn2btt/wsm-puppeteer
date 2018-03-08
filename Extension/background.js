chrome.webNavigation.onCompleted.addListener(function (details) {
    let userInfo = localStorage.user_info;
    let today = moment().format('YYYY-MM-DD');

    const HOUR_RUN = "12:00:00";
    const URL_CHECK_TIME = 'https://test-puppeteer-d10cn2btt.c9users.io:8080/check_il_le';

    // check run only 1 time per day
    if (typeof localStorage.run_bg != "undefined" && localStorage.run_bg == today) {
        return false;
    }

    // check isset userInfo
    if (typeof userInfo == "undefined") {
        return false;
    }

    // run after 12:00 PM
    if (moment().diff(moment().format('YYYY-MM-DD ' + HOUR_RUN)) < 0) {
        return false;
    }

    userInfo = JSON.parse(userInfo);
    let data = "email=" + userInfo.email + "&password=" + userInfo.password;

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let response = JSON.parse(this.responseText);
            let unreadItemCount = response.day_IL.length + response.day_LE.length;
            if (unreadItemCount > 0) {
                chrome.browserAction.setBadgeText({text: '' + unreadItemCount});
            }

            localStorage.run_bg = moment().format('YYYY-MM-DD');
        }
    });

    xhr.open("POST", URL_CHECK_TIME);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
});
