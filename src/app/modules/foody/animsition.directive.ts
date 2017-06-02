import { Directive, ElementRef, Input } from '@angular/core';

declare var $:any;

@Directive({
  selector: '[appAnimsition]'
})
export class AnimsitionDirective {

  constructor(
    private el: ElementRef
  ) { 
    $(el.nativeElement).animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 300,
        outDuration: 300,
        linkElement: '.animsition-link', // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        unSupportCss: ['animation-duration', '-webkit-animation-duration', '-o-animation-duration'], //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'body'
    });
  }

}
