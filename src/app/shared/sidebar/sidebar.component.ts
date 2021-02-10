import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarioLogin: string;

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.usuarioLogin = this.authService.getJwtUsername();
  }
}
