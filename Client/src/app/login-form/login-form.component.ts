import {Component, OnInit, HostBinding} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Router} from '@angular/router';

import {slideInDownAnimation} from '../animations';
import {ApiService} from '../service/api.service';
import {StorageService} from '../service/storage.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    animations: [slideInDownAnimation],
})

export class LoginFormComponent implements OnInit {
    @HostBinding('@flyInOut') flyInOut = true;
    @HostBinding('style.display') display = 'block';

    bsModalRef: BsModalRef;
    loginForm: FormGroup;
    listDate: Object;
    userInfo: Object;

    constructor(fb: FormBuilder, private apiService: ApiService, public router: Router, private storage: StorageService) {
        this.storage.get('user_info', (data) => {
            // this.title = '22222222222222222';
            this.userInfo = data;
        });

        this.loginForm = fb.group({
            'email': ['', Validators.email],
            'password': ['', Validators.minLength(6)],
            'save_info': [false]
        });

        this.loginForm.value.email = '13123';

        // this.performLogin({'email': "bui.tuan.truong@framgia.com", 'password': "truong123"})
    }

    ngOnInit() {
    }

    performLogin(value: any) {
        this.apiService.performLogin(value).subscribe(response => {
            this.listDate = response;
            this.userInfo = value;

            this.storage.set({
                'user_info': value
            })
        });
    }

    checkError(field: string, errorCode: string) {
        return this.loginForm.controls[field].hasError(errorCode) && this.loginForm.controls[field].touched;
    }

    batoutput() {
        this.listDate = "";
        this.router.navigate(['/']);
    }

}
