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
import { FbLayoutComponent } from './layouts/fb-layout/fb-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';

//Guards
import { AuthGuard, UnAuthGuard } from './modules/ng-innoway/services/auth-guard.service';
import { FbGuard } from './modules/ng-innoway/services/fb.guard';
export const router : Routes = [
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' 
    },
    {
        path: '',
        component: FullLayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            { 
                path: 'contact', 
                component: ContactComponent 
            },
            { 
                path: 'registration', 
                component: RegistrationComponent,
                canActivate: [UnAuthGuard] 
            },
            { 
                path: 'about', 
                component: AboutComponent 
            },
            { 
                path: 'news', 
                component: NewsComponent 
            },
            { 
                path: 'profile', 
                component: 
                ProfileComponent
            },
            { 
                path: 'checkout', 
                component: CheckoutComponent,
                canActivate: [AuthGuard]
            },
            { 
                path: 'userProfile',
                component: UserProfileComponent, 
                canActivate: [AuthGuard]
            },
            { 
                path: 'promotion',
                component: PromotionComponent, 
                canActivate: [AuthGuard]
            },
        ]
    },
    { 
        path: 'fb', 
        component: FbLayoutComponent,
        children: [
            { 
                path: 'profile/:senderId', 
                component: ProfileComponent,
                canDeactivate: [FbGuard]
            },
            { 
                path: 'profile', 
                component: ProfileComponent,
                canDeactivate: [FbGuard]
            },
            { 
                path: 'checkout', 
                component: CheckoutComponent,
                canActivate: [AuthGuard],
                canDeactivate: [FbGuard]
            },
            { 
                path: 'registration/:senderId', 
                component: RegistrationComponent,
                canActivate: [UnAuthGuard],
                canDeactivate: [FbGuard] 
            },
            { 
                path: 'registration', 
                component: RegistrationComponent,
                canActivate: [UnAuthGuard],
                canDeactivate: [FbGuard] 
            },
        ]
    }
]

export const routers : ModuleWithProviders = RouterModule.forRoot(router);