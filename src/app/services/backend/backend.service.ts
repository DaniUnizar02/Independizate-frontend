import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:3000/api/';

  public cookie = {
    usuario: '',
    nombreUsuario: '',
    token: '',
    esInvitado: true
  }

  // Define la cabecera con el token de autorización
  private headers = new HttpHeaders();

  public setHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${this.cookie.token}`
    });
  }

  public hashPassword(contrasena: string) {
    const fixedSalt = '$2a$10$abcdefghijklmnopqrstuv'; // TODO: Cambiar al pasar a producción
    return bcrypt.hashSync(contrasena, fixedSalt);
  }


  // public user: string = ''; // DELETE: O NO
  // public nombreUsuario: string = 'User'; // DELETE: O NO

  // // DELETE: Usuarios por defecto
  // admin = {
  //   usuario: 'dani',
  //   contrasegna: 'dani',
  //   rememberMe: false
  // };

  // david = {
  //   usuario: 'David',
  //   contrasegna: '123',
  //   rememberMe: false
  // }

  // usuario = {
  //   usuario: 'usuario',
  //   contrasegna: 'usuario',
  //   rememberMe: false
  // };

  // usuario1 = {
  //   usuario: 'string',
  //   contrasegna: 'usuario',
  //   rememberMe: false
  // };

  // REVIEW:
  constructor(private http: HttpClient) { }

  /* #region NOTE: Admin */
  getAdminReports(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}admin/reports/`, { headers: this.headers });
  }

  putApiAdminReportRejectId(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}admin/reports/reject/${id}/`, {}, { headers: this.headers });
  }

  putAdminSuggestionsRejectId(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}admin/suggestions/reject/${id}/`, {}, { headers: this.headers });
  }
  /* #endregion */

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

  postAuthSignup(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/signup/`, body);
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
  getForumCategoriaPosts(categoria: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}forum/${categoria}/posts/`);
  }

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
  getNotificationsAutorAutor(autor: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}notifications/autor/${autor}/`, { headers: this.headers });
  }

  putNotificationsIdRead(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}notifications/${id}/read/`, {}, { headers: this.headers });
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

  putProfilesId(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}profiles/${id}/`, body, { headers: this.headers });
  }

  getProfilesIdStamps(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}profiles/${id}/stamps/`, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: Stamps */
  getStamps(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}stamps/`, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: Users */
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/`, { headers: this.headers });
  }

  getUsersIdBasic(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/${id}/basic/`);
  }
  /* #endregion */

  /* #region NOTE: Reports */
  postReports(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}reports/`, body, { headers: this.headers });
  }
  /* #endregion */
}
