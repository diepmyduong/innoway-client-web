import { Directive, ElementRef, Input, OnInit } from '@angular/core';

declare var $:any;

@Directive({
  selector: '[appBgImage]'
})
export class BgImageDirective implements OnInit {

  @Input() imageSrc:string;
  constructor(
    private el: ElementRef
  ) { 
    console.log(this.imageSrc);
  }

  ngOnInit(){
    // $(el.nativeElement).css("background","url("+$(el.nativeElement).data("image-src")+") no-repeat center center");
    $(this.el.nativeElement).css("background","url("+this.imageSrc+") no-repeat center center");
    $(this.el.nativeElement).css("background-size","cover");
  }
}
