import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The dating App';
  users:any

  public constructor(private accountService:AccountService){

  }

  ngOnInit() {
    this.setCurrentUser();
  }


 
   setCurrentUser(){
     const user:User= JSON.parse(localStorage.getItem("user") as any);
     this.accountService.setCurrentUser(user);
     
   }
  
  
  
}
