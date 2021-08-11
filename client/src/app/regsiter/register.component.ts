import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegsiterComponent implements OnInit {
   model:any ={}
   @Output() cancelResgister = new EventEmitter();
  constructor(public accountService:AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(user=>{
      this.cancel();
    })
  }

  cancel(){
    this.cancelResgister.emit(false);
  }

}
