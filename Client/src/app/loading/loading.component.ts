import {Component, HostBinding} from '@angular/core';
import {Router} from '@angular/router';

import {slideInDownAnimation}   from '../animations';

@Component({
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.scss'],
    animations: [slideInDownAnimation]
})

export class LoadingComponent {
    @HostBinding('@flyInOut') routeAnimation = true;

    constructor(private router: Router) {
    }

    closePopup() {
        // Providing a `null` value to the named outlet
        // clears the contents of the named outlet
        this.router.navigate([{outlets: {loading: null}}]);
    }
}