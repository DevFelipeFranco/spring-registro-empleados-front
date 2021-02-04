import { Persona } from './../../../../core/models/persona.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {

  @Input() personas: Persona[];
  @Output() editarPersona = new EventEmitter<Persona>();

  displayedColumns: string[] = ['tipoDocumento', 'identificacion', 'nombres', 'fechaNacimiento', 'edad', 'email', 'direccion', 'editar', 'eliminar'];
  dataSource: Persona[];

  constructor() { }

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla(): void {
    this.dataSource = this.personas;
    console.log(this.dataSource);
  }

  onEditarPersona(persona: Persona): void {
    console.log('Esta es la persona seleccionada:', persona);
    this.editarPersona.emit(persona);
  }
}
