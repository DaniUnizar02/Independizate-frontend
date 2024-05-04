import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:3000/api/';
  public user: any; // DELETE: O NO

  // Define la cabecera con el token de autorización
  private headers = new HttpHeaders();


  // DELETE: Usuario por defecto
  usuario = {
    usuario: 'dani',
    contrasegna: 'dani',
    rememberMe: false
  };  

  // REVIEW:
  constructor(private http: HttpClient) {
    this.postAuthLogin(this.usuario).subscribe(valor => {
      this.user = valor.id;
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

  // NOTE: Admin

  // NOTE: Apartments
  // IN PROGRESS: Sin probar
  getAparments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}apartments/`);
  }

  // IN PROGRESS: Sin probar
  getAparmentsId(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}apartments/${id}/`);
  }

  // IN PROGRESS: Sin probar
  getAparmentsLocations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}apartments/locations/`);
  }

  // IN PROGRESS: Sin probar
  getAparmentsIdDescription(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}apartments/${id}/description`);
  }

  // IN PROGRESS: Sin probar
  getAparmentsIdGeneralInfo(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}apartments/${id}/generalInfo`);
  }

  // NOTE: Auth
  // IN PROGRESS: Sin probar
  postAuthSignup(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/signup/`, body);
  }

  postAuthLogin(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/login/`, body);
  }

  // NOTE: ContactUs
  postContactUs(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}contactUs/`, body, {headers: this.headers});
  } 
  
  // IN PROGRESS: Sin probar
  getContactUs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}contactUs/`, {headers: this.headers});
  }

  // NOTE: FAQ
  getFaqs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}faqs/`);
  }

  // IN PROGRESS: Sin probar
  postFaqs(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}faqs/`, body);
  }

  // IN PROGRESS: Sin probar
  getFaqsId(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}faqs/${id}/`);
  }

  // IN PROGRESS: Sin probar
  putFaqsId(id: String): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}faqs/${id}/`, {});
  }

  // IN PROGRESS: Sin probar
  deleteFaqsId(id: String): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}faqs/${id}/`);
  }

  // NOTE: Messages
  // IN PROGRESS: Sin probar
  postMessagesPost_id(post_id: String, body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}messages/${post_id}/`, body);
  }

  // IN PROGRESS: Sin probar
  getMessages(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}messages/`);
  }

  // IN PROGRESS: Sin probar
  getMessagesId(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}messages/${id}/`);
  }

  // NOTE: Notifications
  // IN PROGRESS: Sin probar
  getNotifications(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}notifications/`);
  }

  // IN PROGRESS: Sin probar
  postNotifications(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}notifications/`, body);
  }

  // IN PROGRESS: Sin probar
  getNotificationsAutor(autor: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}notifications/${autor}/`);
  }

  // IN PROGRESS: Sin probar
  putNotificacionEstado(id: String): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}notifications/${id}/`, {});
  }

  // IN PROGRESS: Sin probar
  deleteNotificationsId(id: String): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}notifications/${id}/`);
  }

  // NOTE: Posts
  // IN PROGRESS: Sin probar
  postPosts(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}posts/`, body, {headers: this.headers});
  }

  // TEST: Usada en posts.component.ts, hay que probarla bien
  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}posts/`);
  }

  // IN PROGRESS: Sin probar
  getPostsId(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}posts/${id}/`);
  }

  // IN PROGRESS: Sin probar
  putPostsIdMessage(id: String): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}posts/${id}/message/`, {});
  }

  // NOTE: Profiles
  // IN PROGRESS: Sin probar
  getProfilesId(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}profiles/${id}/`);
  }

  // IN PROGRESS: Sin probar
  putProfilesId(id: String): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}profiles/${id}/`, {});
  }

  // IN PROGRESS: Sin probar
  getProfilesIdStamps(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}profiles/${id}/stamps/`);
  }

  // IN PROGRESS: Sin probar
  putProfilesIdStamps(id: String): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}profiles/${id}/stamps/`, {});
  }

  // IN PROGRESS: Sin probar
  putProfilesIdStampsFavs(id: String): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}profiles/${id}/stamps/favs/`, {});
  }

  // IN PROGRESS: Sin probar
  getProfilesUser_idStampsStamp_id(user_id: String, stamp_id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}profiles/${user_id}/stamps/${stamp_id}/`);
  }

  // IN PROGRESS: Sin probar
  putProfilesIdPhoto(id: String): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}profiles/${id}/photo/`, {});
  }

  // NOTE: Stamps
  // IN PROGRESS: Sin probar
  getStamps(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}stamps/`);
  }

  // IN PROGRESS: Sin probar
  postStamps(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}stamps/`, body);
  }

  // IN PROGRESS: Sin probar
  getStampsId(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}stamps/${id}/`);
  }

  // IN PROGRESS: Sin probar
  putStampsId(id: String): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}stamps/${id}/`, {});
  }

  // IN PROGRESS: Sin probar
  deleteStampsId(id: String): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}stamps/${id}/`);
  }

  // NOTE: Users
  // IN PROGRESS: Sin probar
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/`, {headers: this.headers});
  }

  // IN PROGRESS: Sin probar
  postsUsers(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}users/`, body);
  }

  // IN PROGRESS: Sin probar
  getUsersId(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/${id}/`);
  }

  // IN PROGRESS: Sin probar
  deleteUsersId(id: String): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}users/${id}/`);
  }

  // IN PROGRESS: Sin probar
  putUsersId(id: String): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}users/${id}/`, {});
  }

  // IN PROGRESS: Sin probar
  getUsersIdBasic(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/${id}/basic/`);
  }

  // IN PROGRESS: Sin probar
  putUsersIdDisable(id: String): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}users/${id}/disable/`, {});
  }
}
