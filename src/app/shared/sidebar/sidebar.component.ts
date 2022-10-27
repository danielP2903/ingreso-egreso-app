import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService : AuthService,private router : Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logut().then(data =>{
      console.log(data);
      this.router.navigate(['/login'])
    }).catch(err =>{
      
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos...',
          text: 'Ocurrio un error al cerrar la sesión del usuario!',
        })
       
    });
  }
}
