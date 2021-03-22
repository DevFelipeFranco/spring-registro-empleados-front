import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardPreviewProfileComponent } from './card-preview-profile/card-preview-profile.component';
import { DetailInformationProfileComponent } from './detail-information-profile/detail-information-profile.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent, CardPreviewProfileComponent, DetailInformationProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule
  ],
  exports: [HeaderComponent, FooterComponent, SidebarComponent, CardPreviewProfileComponent]
})
export class SharedModule { }
