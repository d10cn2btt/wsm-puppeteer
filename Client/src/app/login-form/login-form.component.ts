import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {LoginService} from '../service/login.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    loginForm: FormGroup;

    constructor(fb: FormBuilder, private loginService: LoginService) {
        this.loginForm = fb.group({
            'email': ["", Validators.email],
            'password': ["", Validators.minLength(6)],
        });
    }

    ngOnInit() {
    }

    submitForm(value: any) {
        this.loginService.performLogin(value).subscribe(response => {
            console.log(response);
        });
    }

    debug(value: any) {
        console.log(value);
    }

    checkError(field: string, errorCode: string) {
        return this.loginForm.controls[field].hasError(errorCode) && this.loginForm.controls[field].touched;
    }

}
