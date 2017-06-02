import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimsitionDirective } from './animsition.directive';
import { BgImageDirective } from './bg-image.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AnimsitionDirective, BgImageDirective],
  exports: [
    AnimsitionDirective,
    BgImageDirective
  ]
})
export class FoodyModule { }
