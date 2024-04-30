import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:3000/api/';
  public user: any; // DELETE O NO

  // Define la cabecera con el token de autorización
  private headers = new HttpHeaders();


  // DELETE: Usuario por defecto
  usuario = {
    usuario: 'string',
    contrasegna: 'string',
    rememberMe: true
  };  

  constructor(private http: HttpClient) { 
    this.postAuthLogin(this.usuario).subscribe(valor => {
      this.user = valor.id;
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${valor.token}`
      }); 
    },
    error => {
      console.error('Error al obtener token: ', error);
    });
  }

  postAuthLogin(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/login/`, body);
  }

  postContactUs(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}contactUs/`, body, {headers: this.headers});
  } 
}
