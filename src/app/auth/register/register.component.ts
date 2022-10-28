import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { isLoading } from 'src/app/shared/ui.actions';
import { stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup;
  cargando:boolean = false;
  uiSubscription!: Subscription;
  constructor(private fb : FormBuilder, 
              private authService: AuthService,
              public auth: AngularFireAuth,
              private router:Router,
              private store : Store<AppState>
              ) { }
  

  ngOnInit(): void {
    this.inicializarFormulario();

    this.uiSubscription = this.store.select('ui').subscribe(ui =>{
      this.cargando = ui.isLoading;
      
    })
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
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

   this.store.dispatch(isLoading());

  //  Swal.fire({
  //   title: 'Espere por favor!',
  //   didOpen: () => {
  //     Swal.showLoading()
    
  //   },
   
  // });
   const {nombre, email, password} = this.registroForm.value;
   this.authService.crearUsuario(email,password).then(credenciales =>{
    console.log(credenciales);
    // Swal.close();
    this.store.dispatch(stopLoading());

    this.router.navigate(['/'])
   }).catch(err =>{
    this.store.dispatch(stopLoading());

    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos...',
      text: 'Ya existe un usuario asociado a este correo!',
    })
   }
    );

  }
}
