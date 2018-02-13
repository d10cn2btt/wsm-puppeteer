import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError} from "rxjs/operators/catchError";
import {tap} from "rxjs/operators/tap";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
};

@Injectable()
export class LoginService {
    private URL_LOGIN = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private http: HttpClient) {
    }

    performLogin(formData: string) {
        return this.http.post(this.URL_LOGIN, formData, httpOptions).pipe(
            tap(response => response),
            catchError(this.handleError('abc', []))
        );
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
