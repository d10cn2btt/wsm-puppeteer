import {Component, OnInit} from '@angular/core';

import {StorageService} from './service/storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'app';

    ngOnInit() {
    }

    constructor(private storage: StorageService) {
        this.getItem();
    }

    setItem() {
        this.storage.set({
            'user_info': {
                'email': 'abc@gmail.com',
                'password': '123123123'
            }
        })
    }

    getItem() {
        this.storage.get('user_info', (data) => {
            // this.title = '22222222222222222';
            this.title = data;
        });
    }
}
