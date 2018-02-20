import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError} from "rxjs/operators/catchError";
import {tap} from "rxjs/operators/tap";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable()
export class LoginService {
    // private DOMAIN = 'https://test-puppeteer-d10cn2btt.c9users.io:8080/';
    private DOMAIN = 'http://127.0.0.1:3000/';
    private URL_CHECK_DATE = this.DOMAIN + 'check_il_le';
    // private URL_CHECK_DATE = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private http: HttpClient) {
    }

    performLogin(formData: string) {
        console.log(formData);
        return this.http.post(this.URL_CHECK_DATE, formData, httpOptions).pipe(
            tap(response => response),
            catchError(this.handleError('abc', []))
        );
        // return this.http.get(this.DOMAIN + 'hehe', httpOptions).pipe(
        //     tap(response => response),
        //     catchError(this.handleError('abc', []))
        // );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
