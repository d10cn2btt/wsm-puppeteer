import {Component, OnInit, HostBinding} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Router} from '@angular/router';

import {slideInDownAnimation} from '../animations';
import {ApiService} from '../service/api.service';

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
    userInfo = {
        'email': '',
        'password': '',
        'save_info': false,
    };

    constructor(fb: FormBuilder, private apiService: ApiService, public router: Router) {
        if (localStorage.user_info) {
            this.userInfo = JSON.parse(localStorage.user_info);
        }

        this.loginForm = fb.group({
            'email': [this.userInfo.email, Validators.email],
            'password': [this.userInfo.password, Validators.minLength(6)],
            'save_info': [this.userInfo.save_info]
        });
    }

    ngOnInit() {
    }

    performLogin(value: any) {
        this.apiService.performLogin(value).subscribe(response => {
            this.listDate = response;
            this.userInfo = value;
            if (value.save_info) {
                localStorage.user_info = JSON.stringify(value);
            }
        });
    }

    checkError(field: string, errorCode: string) {
        return this.loginForm.controls[field].hasError(errorCode) && this.loginForm.controls[field].touched;
    }

    logout() {
        this.listDate = "";
        this.router.navigate(['/']);
    }

}
