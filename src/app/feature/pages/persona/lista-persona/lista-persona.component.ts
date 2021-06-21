import { Persona } from './../../../../core/models/persona.model';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PersonaService } from 'src/app/core/services/persona/persona.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeletePersonaDialogComponent } from '../delete-persona-dialog/delete-persona-dialog.component';
import { NotificationService } from 'src/app/shared/notification/services/notification.service';
import { NotificationType } from 'src/app/core/enum/notification-type.enum';

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {

  @Input() esActivo: boolean;
  personas: Persona[];
  @Output() editarPersona = new EventEmitter<Persona>();

  displayedColumns: string[] = ['tipoDocumento', 'identificacion', 'nombres', 'fechaNacimiento', 'edad', 'email', 'direccion', 'editar', 'eliminar'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly personaService: PersonaService,
              private readonly notificationService: NotificationService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.consultarPersona();
  }

  consultarPersona(): void {
    this.personaService.consultarUsuario(this.esActivo).subscribe((personas: Persona[]) => {
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
    const dialogReg = this.dialog.open(DeletePersonaDialogComponent, {
      width: '50%'
    });

    dialogReg.afterClosed().subscribe((motivo: string) => {
      console.log('Motivo eliminacion', motivo);
      console.log('Eliminara a la persona', persona.idPersona);
      if (motivo && motivo.length > 0) {
        this.personaService.eliminarPersona(persona.idPersona, motivo).subscribe(info => {
          console.log(info);
          const listaPersonasActualizada = this.dataSource.data.filter(person => persona.idPersona !== person.idPersona);
          this.cargarTabla(listaPersonasActualizada);
          console.log('Asi quedo la tabla', this.dataSource);
          this.notificationService.notify(NotificationType.SUCCESS, 'Se elimino al empleado: '
                                          + persona.primerNombre + ' ' + persona.primerApellido);
        });
      } else {
        console.log('Error no tiene motivo', motivo);
        this.notificationService.notify(NotificationType.ERROR, 'Debes ingresar un motivo de retiro');
      }
    });
  }
}
