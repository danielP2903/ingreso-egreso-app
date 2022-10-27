import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb:FormBuilder,private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    })
  }

 async autenticarUsuario(){
    if(this.loginForm.invalid){return};
    Swal.fire({
      title: 'Espere por favor!',
      didOpen: () => {
        Swal.showLoading()
      
      },
     
    });
    const {email,password} = this.loginForm.value
     this.authService.autenticarUsuario(email,password).then(credenciales =>{
      console.log(credenciales);
      Swal.close();
      this.router.navigate(['/'])
     }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos...',
        text: 'Usuario o contraseña invalidos!',
      })
     }
     
     
     
     );

   
  }

}
