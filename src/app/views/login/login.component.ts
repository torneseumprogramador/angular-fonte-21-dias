import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  public cliente:Cliente

  ngOnInit(): void {
    this.cliente = JSON.parse(localStorage.getItem("cliente"));
    if(this.cliente){
      this.router.navigateByUrl("/clientes")
      return
    }
    else{
      this.cliente = new Cliente();
    }
  }

  public async Logar(){
    try{
      await this.cliente.logar(this.http)
      this.router.navigateByUrl("/clientes")
    }
    catch(e){
      alert(JSON.stringify(e));
    }
  }

}
