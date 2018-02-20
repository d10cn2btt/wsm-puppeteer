import {Component, OnInit, HostBinding} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {slideInDownAnimation} from '../animations';
import {LoginService} from '../service/login.service';
import {PopupComponent} from "../popup/popup.component";

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

    constructor(fb: FormBuilder, private loginService: LoginService, private router: Router, private modalService: BsModalService) {
        this.loginForm = fb.group({
            'email': ["", Validators.email],
            'password': ["", Validators.minLength(6)],
        });
        this.openModalWithComponent();
    }

    openModalWithComponent() {
        const initialState = {
            list: [
                'Open a modal with component',
                'Pass your data',
                'Do something else',
                '...',
                'PROFIT!!!'
            ],
            title: 'Modal with component',
            closeBtnName: 'Close'
        };
        this.bsModalRef = this.modalService.show(PopupComponent, {initialState});
    }

    ngOnInit() {
    }

    submitForm(value: any) {
        this.router.navigate([{outlets: {loading: 'compose'}}]);
        this.loginService.performLogin(value).subscribe(response => {
            console.log(response);
            this.router.navigate([{outlets: {loading: null}}]);
        });
    }

    debug(value: any) {
        console.log(value);
    }

    checkError(field: string, errorCode: string) {
        return this.loginForm.controls[field].hasError(errorCode) && this.loginForm.controls[field].touched;
    }

}
