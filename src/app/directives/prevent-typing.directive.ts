import { Directive, HostListener, NgModule } from '@angular/core';

@Directive({
    selector: '[prevent-typing]'
})
export class PreventTypingDirective {
    constructor() {}

    @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
        e.preventDefault();
    }

    @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
        e.preventDefault();
    }

    @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
        e.preventDefault();
    }

    @HostListener('keydown', ['$event']) blockType(e: KeyboardEvent) {
        e.preventDefault();
    }
}

@NgModule({
    declarations: [PreventTypingDirective],
    exports: [PreventTypingDirective]
})
export class PreventTypingModule {}
