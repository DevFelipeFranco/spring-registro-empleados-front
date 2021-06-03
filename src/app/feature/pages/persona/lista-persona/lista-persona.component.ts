import { Persona } from './../../../../core/models/persona.model';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PersonaService } from 'src/app/core/services/persona/persona.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {

  personas: Persona[];
  @Output() editarPersona = new EventEmitter<Persona>();

  displayedColumns: string[] = ['tipoDocumento', 'identificacion', 'nombres', 'fechaNacimiento', 'edad', 'email', 'direccion', 'editar', 'eliminar'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly personaService: PersonaService) { }

  ngOnInit(): void {
    this.consultarPersona();
  }

  consultarPersona(): void {
    this.personaService.registrarUsuario().subscribe((personas: Persona[]) => {
      this.personas = personas;
      this.cargarTabla(this.personas);
    });
  }

  cargarTabla(personas: Persona[]): void {
    this.dataSource = new MatTableDataSource(personas);
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }

  onEditarPersona(persona: Persona): void {
    console.log('Esta es la persona seleccionada:', persona);
    this.editarPersona.emit(persona);
  }

  onEliminarPersona(persona: Persona): void {
    console.log('Eliminara a la persona', persona.idPersona);
    this.personaService.eliminarPersona(persona.idPersona).subscribe(info => {
      console.log(info);
      const listaPersonasActualizada = this.dataSource.filter(person => persona.idPersona !== person.idPersona);
      this.cargarTabla(listaPersonasActualizada);
      console.log('Asi quedo la tabla', this.dataSource);
    });
  }
}
