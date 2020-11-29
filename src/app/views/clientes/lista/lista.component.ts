import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  clienteLogado:Cliente
  cliente:Cliente
  clientes:Cliente[]

  ngOnInit(): void {
    this.clienteLogado = JSON.parse(localStorage.getItem("cliente"));

    if(!this.clienteLogado){
      this.router.navigateByUrl("/")
      return
    }

    this.cliente = new Cliente()

    this.carregarClientes()
  }

  public async salvar() {
    await  this.cliente.salvar(this.http, this.clienteLogado.token)
    this.cliente = new Cliente()
    this.carregarClientes();
  }

  private async carregarClientes() {
    this.clientes = await new Cliente(this.clienteLogado.token).busca(this.http)
  }

  public sair(){
    localStorage.removeItem("cliente")
    this.router.navigateByUrl("/")
  }

}
