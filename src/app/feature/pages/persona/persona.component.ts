import { Persona } from './../../../core/models/persona.model';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/core/services/persona/persona.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private readonly personaService: PersonaService,
              private readonly router: Router) { }

  ngOnInit(): void { }

  editarPersona(persona: Persona): void {
    console.log('Se envio la persona del componente hijo al padre', persona);
    this.navigationExtras.state.value = persona;
    this.router.navigate(['/dashboard/persona/editar-crear-persona'], this.navigationExtras);
  }
}
