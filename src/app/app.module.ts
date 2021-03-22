import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { AuthenticationGuard } from './core/guards/authentication.guard';
import { NotificationModule } from './shared/notification/notification.module';

//
import { AppRoutingModule } from './routes';
import { MatButtonModule } from '@angular/material/button';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/interceptor/token-interceptor';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { NotificationService } from './shared/notification/services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NotificationModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [AuthenticationGuard, NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      // useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
