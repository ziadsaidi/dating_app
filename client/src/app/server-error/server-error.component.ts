import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
   error:any
  constructor(private router:Router) { 
    this.error = this.getErrors();
  }

  getErrors(){
    const error = this.router.getCurrentNavigation()?.extras?.state?.error;
    console.log(error);
    return error;
  }

  ngOnInit(): void {


  }

}
