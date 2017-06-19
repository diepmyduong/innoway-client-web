import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { AgmCoreModule} from 'angular2-google-maps/core';
import { DatePickerModule } from 'ng2-datepicker';
import { Ng2TableModule } from 'ng2-table';
import { MdButtonModule } from '@angular/material';
import 'hammerjs';

import { routers } from './app.router';
import { FoodyModule } from './modules/foody/foody.module';
import { NgInnowayModule } from './modules/ng-innoway/ng-innoway.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewsComponent } from './pages/news/news.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { BlHeaderComponent } from './blocks/bl-header/bl-header.component';
import { BlFooterComponent } from './blocks/bl-footer/bl-footer.component';
import { BlSliderComponent } from './blocks/bl-slider/bl-slider.component';
import { BlProductsComponent } from './blocks/bl-products/bl-products.component';
import { BlDownloadComponent } from './blocks/bl-download/bl-download.component';
import { ModalOrderComponent } from './modals/modal-order/modal-order.component';
import { BlHIWComponent } from './blocks/bl-hiw/bl-hiw.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ModalUserInfoComponent } from './modals/modal-user-info/modal-user-info.component';
import { BlMapComponent } from './blocks/bl-map/bl-map.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ModalBillDetailComponent } from './modals/modal-bill-detail/modal-bill-detail.component';
import { PromotionComponent } from './pages/promotion/promotion.component';
import { FbLayoutComponent } from './layouts/fb-layout/fb-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

//CSS

//CSS

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProfileComponent,
    NewsComponent,
    ContactComponent,
    RegistrationComponent,
    BlHeaderComponent,
    BlFooterComponent,
    BlSliderComponent,
    BlProductsComponent,
    BlDownloadComponent,
    ModalOrderComponent,
    BlHIWComponent,
    CheckoutComponent,
    ModalUserInfoComponent,
    BlMapComponent,
    UserProfileComponent,
    ModalBillDetailComponent,
    PromotionComponent,
    FbLayoutComponent,
    FullLayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routers,
    FoodyModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    NgInnowayModule,
    Ng2PageScrollModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8A704eZF3d4cYOCrjEyO5P-6jvArar0s',
      libraries: ["places"]
    }),
    DatePickerModule,
    Ng2TableModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalOrderComponent,
    ModalUserInfoComponent,
    ModalBillDetailComponent,
  ],
  exports: [
    BlSliderComponent,
    BlProductsComponent,
    BlDownloadComponent,
    BlHIWComponent,
    BlMapComponent,
    FoodyModule
  ]
})
export class AppModule { }
