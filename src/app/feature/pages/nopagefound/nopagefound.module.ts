import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NopagefoundComponent } from './nopagefound.component';
import { NoPageFoundRoutingModule } from './nopagefound.routing';



@NgModule({
  declarations: [NopagefoundComponent],
  imports: [
    CommonModule,
    NoPageFoundRoutingModule
  ]
})
export class NopagefoundModule { }
