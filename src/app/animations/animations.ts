import { query, trigger, transition, animate, style, group, stagger, keyframes } from '@angular/animations';


export const slideAnimation = trigger('slideAnimation', [
    transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
            animate('.6s ease-in', keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
            ]))]), { optional: true }),
        query(':leave', stagger('500ms', [
            animate('.6s ease-out', keyframes([
                style({ opacity: .85, offset: 0 }),
                style({ opacity: .5, offset: 0.3 }),
                style({ opacity: 0, offset: 1.0 }),
            ]))]), { optional: true })
    ])
]);
