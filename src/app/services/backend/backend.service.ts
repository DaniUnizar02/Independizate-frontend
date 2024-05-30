import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = "http://backend-independizate.eggtf5e6dvh8hngq.spaincentral.azurecontainer.io:3000/api/";

  private readonly COOKIE_KEY = 'user_info';

  setCookie(cookie: { usuario: string; nombreUsuario: string; token: string; esInvitado: boolean }): void {
    this.cookieService.set(this.COOKIE_KEY, JSON.stringify(cookie), 1, '/', '', false, 'Lax');
  }

  getCookie(): { usuario: string; nombreUsuario: string; token: string; esInvitado: boolean } | null {
    const cookieValue = this.cookieService.get(this.COOKIE_KEY);
    console.log("COOKIE: ", JSON.parse(cookieValue));
    return cookieValue ? JSON.parse(cookieValue) : null;
  }

  clearCookie(): void {
    this.cookieService.delete(this.COOKIE_KEY, '/', '');
  }

  // Define la cabecera con el token de autorización
  private headers = new HttpHeaders();

  public setHeaders() {
    var cockie=this.getCookie();
    var data = '';
    if (cockie) {
      data = cockie.token;
    }

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${data}`
    });

  }

  public hashPassword(contrasena: string) {
    const fixedSalt = '$2a$10$abcdefghijklmnopqrstuv';
    return bcrypt.hashSync(contrasena, fixedSalt);
  }

  // REVIEW:
  constructor(private cookieService: CookieService, private http: HttpClient) { }

  /* #region NOTE: Admin */
  getAdminReports(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}admin/reports/`, { headers: this.headers });
  }

  putApiAdminReportRejectId(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}admin/reports/reject/${id}/`, {}, { headers: this.headers });
  }

  putAdminAcceptReportIdCategoria(id: string, categoria: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}admin/accept/report/${id}/${categoria}/`, body, { headers: this.headers });
  }

  getAdminSuggestions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}admin/suggestions/`, { headers: this.headers });
  }

  putAdminSuggestionsRejectId(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}admin/suggestions/reject/${id}/`, {}, { headers: this.headers });
  }

  putAdminSuggestionsAnswerId(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}admin/suggestions/answer/${id}/`, body, { headers: this.headers });
  }

  putAdminUsersId(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}admin/users/${id}/`, {}, { headers: this.headers });
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

  postAuthLogingoogle(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/loginGoogle/`, body);
  }

  postAuthSignupgoogle(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/signupGoogle/`, body);
  }
  /* #endregion */

  /* #region NOTE: ContactUs */
  postContactUs(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}contactUs/`, body, { headers: this.headers });
  }

  // getContactUs(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}contactUs/`, { headers: this.headers });
  // }
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

  getPostsId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}posts/${id}/`);
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

  putProfilesIdStampsFavs(id: string, body: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}profiles/${id}/stamps/favs/`, body, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: Stamps */
  getStamps(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}stamps/`, { headers: this.headers });
  }

  getStampsUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}stamps/user/`, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: Statistics */
  getStatisticsAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}statistics/admin/`, { headers: this.headers });
  }

  getStatisticsUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}statistics/user/`, { headers: this.headers });
  }
  /* #endregion */

  /* #region NOTE: Users */
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/`, { headers: this.headers });
  }

  getUsersIdBasic(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/${id}/basic/`);
  }

  getUsersUsuarioType(usuario: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/${usuario}/type/`);
  }

  getUsersGoogleIdGoogleExists(idGoogle: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/google/${idGoogle}/exists/`);
  }
  /* #endregion */

  /* #region NOTE: Reports */
  postReports(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}reports/`, body, { headers: this.headers });
  }
  /* #endregion */
}
