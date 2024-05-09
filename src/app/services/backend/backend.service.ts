import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:3000/api/';
  public user: string = ''; // DELETE: O NO
  public nombreUsuario: string = 'User'; // DELETE: O NO

  // Define la cabecera con el token de autorización
  private headers = new HttpHeaders();


  // DELETE: Usuarios por defecto
  admin = {
    usuario: 'dani',
    contrasegna: 'dani',
    rememberMe: false
  };

  usuario = {
    usuario: 'usuario',
    contrasegna: 'usuario',
    rememberMe: false
  };

  usuario1 = {
    usuario: 'string',
    contrasegna: 'string',
    rememberMe: false
  };

  // REVIEW:
  constructor(private http: HttpClient) {
    var u = this.admin;
    this.postAuthLogin(u).subscribe(valor => {
      this.user = valor.id;
      this.nombreUsuario = u.usuario;
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${valor.token}`
      });
      console.log(`Token: ${valor.token}`); // LOG:
    },
      error => {
        console.error('Error al obtener token: ', error);
      });
  }

  /* #region NOTE: Apartments */
  getAparments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}apartments/`);
  }

  getApartmentsId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}apartments/${id}/`);
  }
  /* #endregion */

  /* #region NOTE: Auth */
  postAuthLogin(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/login/`, body);
  }
  /* #endregion */

  /* #region NOTE: ContactUs */
  postContactUs(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}contactUs/`, body, { headers: this.headers });
  }

  getContactUs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}contactUs/`, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: FAQ */
  getFaqs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}faqs/`);
  }
  /* #endregion */

  /* #region NOTE: Forums */
  getForumCategoriaPostsFavs(categoria: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}forum/${categoria}/posts/favs/`, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: Messages */
  postMessagesPostId(post_id: string, body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}messages/${post_id}/`, body, { headers: this.headers });
  }

  postMessagesPostIdMessageIdReply(post_id: string, message_id: string, body: any) {
    return this.http.post<any>(`${this.apiUrl}messages/${post_id}/${message_id}/reply/`, body, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: Notifications */
  getNotifications(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}notifications/`, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: Posts */
  postPosts(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}posts/`, body, { headers: this.headers });
  }

  putPostsFavoritesPostId(post_id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}posts/favorites/${post_id}/`, {}, { headers: this.headers });
  }

  putPostsLikePostId(post_id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}posts/like/${post_id}/`, {}, { headers: this.headers });
  }

  getPostsIdMessages(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}posts/${id}/messages/`, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: Profiles */
  getProfilesId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}profiles/${id}/`, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: Users */
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/`, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: Reports */
  postReports(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}reports/`, body, { headers: this.headers });
  }
  /* #endregion */
}
