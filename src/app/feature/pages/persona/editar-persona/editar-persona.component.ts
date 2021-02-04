import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/core/models/persona.model';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

  persona: Persona;

  constructor(private readonly router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.persona = navigation?.extras?.state?.value;
    console.log('Wohoo llego para ser editado:', this.persona);
  }

  ngOnInit(): void {
  }

}
