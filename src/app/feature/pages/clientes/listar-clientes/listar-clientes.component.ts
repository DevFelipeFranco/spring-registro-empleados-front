import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/core/models/cliente.model';
import { ClienteService } from '../../../../core/services/cliente/cliente.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  @Input() esActivo: boolean;
  public clientes: Cliente[];
  displayedColumns: string[] = ['nombreCliente', 'nombreProyecto', 'avanceProyecto', 'cantidadTrabajadores', 'editar', 'eliminar'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly clienteService: ClienteService) { }

  ngOnInit(): void {
    this.consultarCliente();
  }

  consultarCliente(): void {
    console.log(this.esActivo);
    this.clienteService.consultarClientes(this.esActivo).subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
      this.cargarTabla(this.clientes);
    });
  }

  cargarTabla(cliente: Cliente[]): void {
    this.dataSource = new MatTableDataSource(cliente);
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }
}
