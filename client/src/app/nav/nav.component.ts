import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  model:any ={}

  loggedIn:boolean = false;
  constructor(private accountService:AccountService) {}

  ngOnInit(): void {
    this. getCurrentUser();
  }

  login() {

   this.accountService.login(this.model).subscribe(res =>{
   
   })

  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe((user)=>{
      this.loggedIn = !!user;
    },err=> console.error(err))
  }

  logout(){
    this.accountService.logout();
  }
}
