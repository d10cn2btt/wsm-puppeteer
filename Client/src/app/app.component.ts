import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor () {
        if (chrome !== undefined && chrome.browserAction !== undefined) {
            var ba = chrome.browserAction;
            ba.setBadgeText({text: ''});   // <-- set text to '' to remove the badge
        }
    }
}
