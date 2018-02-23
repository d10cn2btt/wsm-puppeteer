import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from "rxjs/operators/catchError";
import {tap} from "rxjs/operators/tap";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {MessageService} from "./message.service";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable()
export class ApiService {
    // private DOMAIN = 'https://test-puppeteer-d10cn2btt.c9users.io:8080/';
    private DOMAIN = 'http://127.0.0.1:3000/';
    private URL_CHECK_DATE = this.DOMAIN + 'take_IL1';
    private URL_SUBMIT_REQUEST = this.DOMAIN + 'submit_form_request';
    // private URL_CHECK_DATE = 'https://jsonplaceholder.typicode.com/posts';
    bsModalRef: BsModalRef;

    constructor(private http: HttpClient, public messageService: MessageService) {
    }

    performLogin(formData: string) {
        return this.http.post(this.URL_CHECK_DATE, formData, httpOptions).pipe(
            tap( // Log the result or error
                data => data,
                error => this.messageService.openModalWithComponent(error.error.message)
            ),
        );
    }

    submitRequest(formData) {
        return this.http.post(this.URL_SUBMIT_REQUEST, formData, httpOptions).pipe(
            tap( // Log the result or error
                data => data,
                error => this.messageService.openModalWithComponent([error.error.message])
            ),
        );
    }
}
