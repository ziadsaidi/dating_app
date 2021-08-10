import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {}

  login() {

   this.accountService.login(this.model).subscribe(res =>{
     console.log(res);
     this.loggedIn = true;
   })

  }

  logout(){
    this.loggedIn = false;
  }
}
