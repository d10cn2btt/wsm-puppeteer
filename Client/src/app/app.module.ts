import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap';
import {TabsModule} from 'ngx-bootstrap';
import {BsDropdownModule} from 'ngx-bootstrap';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {ApiService} from './service/api.service';
import {MessageService} from './service/message.service';
import {ListDateComponent} from './list-date/list-date.component';
import {PageNotFoundComponent} from './not-found.component';
import {LoadingComponent} from './loading/loading.component';
import {PopupComponent} from './popup/popup.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginFormComponent,
        ListDateComponent,
        PageNotFoundComponent,
        LoadingComponent,
        PopupComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,

        ModalModule.forRoot(),
        TabsModule.forRoot(),
        BsDropdownModule.forRoot(),
    ],
    providers: [ApiService, MessageService],
    bootstrap: [AppComponent],
    entryComponents: [
        PopupComponent
    ]
})
export class AppModule {
}
