import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm!: FormGroup;
  cargando:boolean = false;
  uiSubscription!: Subscription;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }
  

  ngOnInit(): void {
    this.inicializarFormulario();

    this.uiSubscription =  this.store.select('ui').subscribe(ui=>{
      this.cargando = ui.isLoading;
      console.log('cargando subs');
      
    })
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  inicializarFormulario(){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    })
  }

 async autenticarUsuario(){
    if(this.loginForm.invalid){return};

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Espere por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()
      
    //   },
     
    // });
    const {email,password} = this.loginForm.value
     this.authService.autenticarUsuario(email,password).then(credenciales =>{
      console.log(credenciales);
      // Swal.close();
      this.store.dispatch(stopLoading());
      this.router.navigate(['/'])
     }).catch(err => {
      this.store.dispatch(stopLoading());

      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos...',
        text: 'Usuario o contraseña invalidos!',
      })
     }
     
     
     
     );

   
  }

}
