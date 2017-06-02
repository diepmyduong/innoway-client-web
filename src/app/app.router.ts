import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

//Pages
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PromotionComponent } from './pages/promotion/promotion.component';

//Guards
import { AuthGuard, UnAuthGuard } from './modules/ng-innoway/services/auth-guard.service';

export const router : Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'registration', component: RegistrationComponent,canActivate: [UnAuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'news', component: NewsComponent },
    { path: 'profile', component: ProfileComponent},
    { path: 'checkout', component: CheckoutComponent,canActivate: [AuthGuard]},
    { path: 'userProfile',component: UserProfileComponent, canActivate: [AuthGuard]},
    { path: 'promotion',component: PromotionComponent, canActivate: [AuthGuard]}
]

export const routers : ModuleWithProviders = RouterModule.forRoot(router);