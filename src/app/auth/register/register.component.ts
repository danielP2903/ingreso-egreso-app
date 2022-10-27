import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;
  constructor(private fb : FormBuilder, private authService: AuthService,public auth: AngularFireAuth,private router:Router) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(){

    this.registroForm = this.fb.group({
      nombre : ['',Validators.required],
      email : ['',Validators.compose([Validators.required,Validators.email])],
      password : ['',Validators.required]
    })
  }
  async crearUsuario(){
   if(this.registroForm.invalid){return}
   Swal.fire({
    title: 'Espere por favor!',
    didOpen: () => {
      Swal.showLoading()
    
    },
   
  });
   const {nombre, email, password} = this.registroForm.value;
   this.authService.crearUsuario(email,password).then(credenciales =>{
    console.log(credenciales);
    Swal.close();

    this.router.navigate(['/'])
   }).catch(err =>{
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos...',
      text: 'Ya existe un usuario asociado a este correo!',
    })
   }
    );

  }
}
