import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment.prod'

export class Cliente{
  constructor(token:string = ""){
    this.token = token
  }

  id:number
	nome:string
	telefone:string
  endereco:string
	login:string
	senha:string
  regraAcesso:string
  token:string

  public async logar(http: HttpClient){
    if(!this.login || !this.senha) throw "Login e senha são obrigatórios"
    const cliente:Cliente = await http.post<Cliente>(`${environment.api}/clientes/login`, { login: this.login, senha: this.senha }, { headers: new HttpHeaders({authorization: `Bearer ${this.token}`})}).toPromise()
    if(!cliente || cliente.id == 0) throw "Login ou senha inválidos"
    cliente.senha = ""
    localStorage.setItem("cliente", JSON.stringify(cliente));
  }

  public async salvar(http: HttpClient, token:string){
    if(!this.nome || !this.regraAcesso || !this.login || !this.senha) throw "Preencha os campos corretamente"
    return await http.post<Cliente>(`${environment.api}/clientes`, this, { headers: new HttpHeaders({authorization: `Bearer ${token}`})}).toPromise()
  }

  public async busca(http: HttpClient){
    return await http.get<Cliente[]>(`${environment.api}/clientes/`, { headers: new HttpHeaders({authorization: `Bearer ${this.token}`})}).toPromise()
  }

  public async buscaPorId(http: HttpClient, id:number, token:string){
    return await http.get<Cliente>(`${environment.api}/clientes/${this.id}`, { headers: new HttpHeaders({authorization: `Bearer ${token}`})}).toPromise()
  }
}
