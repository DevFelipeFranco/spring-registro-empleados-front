import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { NotifierDefaultOptions } from './notification-confi.model';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NotifierModule.withConfig(NotifierDefaultOptions)
  ],
  exports: [NotifierModule]
})
export class NotificationModule { }
