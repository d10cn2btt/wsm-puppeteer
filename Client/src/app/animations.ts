import {trigger, state, style, animate, transition} from '@angular/animations';

// Component transition animations
export const slideInDownAnimation =
    trigger('flyInOut', [
        // transition('void => *', [
        //     style({transform: 'translateX(-100%)'}),
        //     animate(100)
        // ]),
        // transition('* => void', [
        //     animate(100, style({transform: 'translateX(100%)'}))
        // ]),
        transition(':enter', [style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
            animate('0.5s ease-in')]), // void => *
        transition(':leave', [
            animate('0.5s ease-out', style({
                opacity: 0,
                transform: 'translateY(100%)'
            }))
        ]), // * => void
    ]);