import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend/backend.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  gBody = {
    id: '',
    password: ''
  }

  constructor(private router: Router, private http:HttpClient) { }

  ngOnInit() {

    this.googleAuthSDK();
  }

  validateGoogleToken(idToken: string) {
    return this.http.get<any>(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
  }

  callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs

        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());       

        //Validate token
        const idToken = googleAuthUser.getAuthResponse().id_token;
        
        this.validateGoogleToken(idToken).subscribe(
          (response) => {
            // Handle response of the token validation
            if (response.sub) {
              // Valid token
              //TODO: Verify if the user is already registered
              //TODO: Use modals for errors

              this.router.navigate(['/sidebar']);
            } else {
              // Invalid token
              alert('Token validation failed');
            }
          },
          (error) => {
            // Handle error
            alert('Error validating token: ' + error.message);
          }
        );
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '871724941026-uhmab7h6l438mh96f0ontoak5t2a8ne5.apps.googleusercontent.com',
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }
}
