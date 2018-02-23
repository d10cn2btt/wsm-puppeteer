import {Component, OnInit, HostBinding} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {Router} from '@angular/router';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

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
    userInfo: Object;

    constructor(fb: FormBuilder, private apiService: ApiService, private router: Router) {
        this.loginForm = fb.group({
            'email': ["", Validators.email],
            'password': ["", Validators.minLength(6)],
        });
        this.submitForm({'email': "bui.tuan.truong@framgia.com", 'password': "truong123"})
    }

    ngOnInit() {
    }

    submitForm(value: any) {
        this.router.navigate([{outlets: {loading: 'compose'}}]);
        this.apiService.performLogin(value).subscribe(response => {
            this.listDate = response;
            this.userInfo = value;
            this.router.navigate([{outlets: {loading: null}}]);
        });
    }

    checkError(field: string, errorCode: string) {
        return this.loginForm.controls[field].hasError(errorCode) && this.loginForm.controls[field].touched;
    }

}
