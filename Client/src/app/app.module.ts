import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {LoginService} from './service/login.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [LoginService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
