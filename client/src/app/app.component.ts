import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The dating App';
  users:any

  public constructor(private http:HttpClient){

  }

  getUsers(){
    this.http.get("https://localhost:5001/api/users").subscribe(_users => {
      this.users = _users;
    },err => console.error(err))
   }
 
  ngOnInit() {
    this.getUsers();
  }
  
  
}
