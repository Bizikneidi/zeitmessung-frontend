import { Directive, AfterViewInit, ElementRef, OnChanges, Input } from '@angular/core';

@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit, OnChanges {
    @Input() appAutofocus: boolean;
    /**
     *Creates an instance of AutofocusDirective.
     * @param {ElementRef} el
     * @memberof AutofocusDirective
     */
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        this.checkAutofocus();
    }

    ngOnChanges() {
        this.checkAutofocus();
    }

    /**
     *focuses a new element
     *
     * @memberof AutofocusDirective
     */
    checkAutofocus() {
        if (this.appAutofocus) {
            this.el.nativeElement.focus();
        }
    }

}
