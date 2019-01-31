import { Directive, AfterViewInit, ElementRef, OnChanges, Input } from '@angular/core';

@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit, OnChanges {
    @Input() appAutofocus: boolean;
    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        this.checkAutofocus();
    }

    ngOnChanges() {
        this.checkAutofocus();
    }

    checkAutofocus() {
        if (this.appAutofocus) {
            this.el.nativeElement.focus();
        }
    }

}
