import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from "rxjs/operators/catchError";
import {tap} from "rxjs/operators/tap";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {PopupComponent} from "../popup/popup.component";
import {MessageService} from "./message.service";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable()
export class LoginService {
    // private DOMAIN = 'https://test-puppeteer-d10cn2btt.c9users.io:8080/';
    private DOMAIN = 'http://127.0.0.1:3000/';
    private URL_CHECK_DATE = this.DOMAIN + 'take_IL1';
    // private URL_CHECK_DATE = 'https://jsonplaceholder.typicode.com/posts';
    bsModalRef: BsModalRef;

    constructor(private http: HttpClient, public messageService: MessageService) {
    }

    performLogin(formData: string) {
        // this.openModalWithComponent(['xvzxcv']);
        // return this.http.post(this.URL_CHECK_DATE, formData, httpOptions).map(response => response);
        return this.http.post(this.URL_CHECK_DATE, formData, httpOptions).pipe(
            tap( // Log the result or error
                data => data,
                error => this.messageService.openModalWithComponent(error.message)
            ),
            catchError(this.handleError)
        );
    }

    handleError(error: HttpErrorResponse) {
        // this.openModalWithComponent(['zxcvzxcv']);
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    }
}
