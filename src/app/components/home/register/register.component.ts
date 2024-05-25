import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  password: string = '';
  password2: string = '';
  google: boolean = false;

  constructor(private router: Router, private _snackBar: MatSnackBar, private route: ActivatedRoute) { }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    console.log('Google: ', this.google);

    console.log('Form submitted')
    if (this.password === this.password2) {
      console.log('Passwords match')
      // Passwords match, navigate to registration page
      this.router.navigateByUrl('');
    } else {
      console.log('Passwords do not match')
      // Passwords don't match, display alert
      this._snackBar.open('Las contraseñas no coinciden', 'Cerrar', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center', // Positioning
        verticalPosition: 'bottom',
      });
    }
  }
}
