import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import {ToastOptions} from 'ng2-toastr';

import { AuthService } from './services/auth.service';
import { ProductsService } from './services/products.service';
import { KeysPipe } from './pipes/keys.pipe';
import { AuthGuard, UnAuthGuard} from './services/auth-guard.service';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { CardService } from './services/card.service';
import { NotifyService , NotifyToastOption} from './services/notify.service';
import { AgmCoreModule,GoogleMapsAPIWrapper,MarkerManager,MapsAPILoader} from 'angular2-google-maps/core';
import { BillService } from './services/bill.service';
import { BlogsService } from './services/blogs.service';
import { PromotionService } from './services/promotion.service';
import { FbGuard } from './services/fb.guard';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyD8A704eZF3d4cYOCrjEyO5P-6jvArar0s',
    //   libraries: ["places"]
    // }),
  ],
  declarations: [KeysPipe, SearchFilterPipe],
  providers: [
    {provide: ToastOptions, useClass: NotifyToastOption},
    AuthService, ProductsService,AuthGuard,UnAuthGuard, CardService, NotifyService,
    BillService,
    BlogsService,
    PromotionService,
    FbGuard
  ],
  exports: [
    KeysPipe,SearchFilterPipe
  ]
})
export class NgInnowayModule { 

}


