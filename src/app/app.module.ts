import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxWebstorageModule } from 'ngx-webstorage';

//
import { AppRoutingModule } from './routes';
import { MatButtonModule } from '@angular/material/button';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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
    NgxWebstorageModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
