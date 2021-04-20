import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Cliente } from 'src/app/core/models/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  public fechaActual = new Date();
  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  editarCliente(cliente: Cliente): void {
    console.log('Se envio la persona del componente hijo al padre', cliente);
    this.navigationExtras.state.value = cliente;
    this.router.navigate(['/dashboard/cliente/editar-crear-cliente'], this.navigationExtras);
  }
}
