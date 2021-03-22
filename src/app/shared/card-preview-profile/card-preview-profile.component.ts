import { LoginResponse, Usuario } from './../../core/models/usuario.model';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailInformationProfileComponent } from '../detail-information-profile/detail-information-profile.component';

@Component({
  selector: 'app-card-preview-profile',
  templateUrl: './card-preview-profile.component.html',
  styleUrls: ['./card-preview-profile.component.css']
})
export class CardPreviewProfileComponent implements OnInit {

  @Input() public usuario: Usuario;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModal(): void {
    const dialogRef = this.dialog.open(DetailInformationProfileComponent, {
      width: '100%',
      data: this.usuario
    });
  }

}
