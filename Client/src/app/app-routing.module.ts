import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";

import {LoginFormComponent} from './login-form/login-form.component';
import {ListDateComponent} from './list-date/list-date.component';
import {PageNotFoundComponent} from './not-found.component';
import {LoadingComponent} from './loading/loading.component';

const appRoutes: Routes = [
    {path: '', component: ListDateComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'list-date', component: ListDateComponent},
    {path: '**', component: PageNotFoundComponent},
    {
        path: 'compose',
        component: LoadingComponent,
        outlet: 'loading'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: false} // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}