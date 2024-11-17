import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignUp = false;
  signUpName = '';
  signUpEmail = '';
  signUpPassword = '';
  signInEmail = '';
  signInPassword = '';

  constructor(private router: Router, private authService: AuthService) { }

  toggleForm() {
    this.isSignUp = !this.isSignUp;
  }

  onSignUp() {
    this.authService.register(this.signUpName, this.signUpEmail, this.signUpPassword).subscribe({
      next: (response) => {
        // Aquí puedes manejar la respuesta de la API si es necesario
        Swal.fire('Registro exitoso', 'Ahora puedes iniciar sesión', 'success');

        // Redirigir al login después de un registro exitoso
        this.router.navigate(['/login']); // Cambia '/login' por la ruta correspondiente a tu página de inicio de sesión
      },
      error: (error) => {
        Swal.fire('Error', 'Ocurrió un error al registrarse', 'error');
        // Manejar errores de registro aquí (por ejemplo, mostrar un mensaje al usuario)
      }
    });

    // Implement sign up logic here
  }

  onSignIn() {
    this.authService.login(this.signInEmail, this.signInPassword).subscribe({
      next: (response) => {
        // Aquí puedes manejar la respuesta de la API si es necesario
        Swal.fire('Inicio de sesión exitoso', 'Bienvenido', 'success');
        localStorage.setItem('token', response as string);
        this.router.navigate(['/feed']); // Cambia '/' por la ruta correspondiente a tu página de inicio
      },
      error: (error) => {
        Swal.fire('Error', 'Ocurrió un error al iniciar sesión', 'error');
        // Manejar errores de inicio de sesión aquí (por ejemplo, mostrar un mensaje al usuario)
      }
    });

  }
}