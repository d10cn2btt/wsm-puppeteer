import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from "rxjs/operators/catchError";
import {tap} from "rxjs/operators/tap";
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/finally';

import {MessageService} from "./message.service";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable()
export class ApiService {
    private DOMAIN = 'https://test-puppeteer-d10cn2btt.c9users.io:8080/';
    // private DOMAIN = 'http://127.0.0.1:3000/';
    private URL_CHECK_DATE = this.DOMAIN + 'take_IL1';
    private URL_SUBMIT_REQUEST = this.DOMAIN + 'submit_form_request';
    // private URL_CHECK_DATE = 'https://jsonplaceholder.typicode.com/posts';
    bsModalRef: BsModalRef;

    constructor(private http: HttpClient, public messageService: MessageService, private router: Router) {
    }

    performLogin(formData: string) {
        this.router.navigate([{outlets: {loading: 'compose'}}]);
        return this.http.post(this.URL_CHECK_DATE, formData, httpOptions)
            .finally(() => {
                this.router.navigate([{outlets: {loading: null}}]);
            })
            .pipe(
                tap( // Log the result or error
                    data => data,
                    error => this.messageService.openModalWithComponent(error.error.message),
                ),
            );
    }

    submitRequest(formData) {
        this.router.navigate([{outlets: {loading: 'compose'}}]);
        return this.http.post(this.URL_SUBMIT_REQUEST, formData, httpOptions)
            .finally(() => {
                this.router.navigate([{outlets: {loading: null}}]);
            })
            .pipe(
                tap( // Log the result or error
                    data => data,
                    error => this.messageService.openModalWithComponent(error.error.message)
                ),
            );
    }
}
