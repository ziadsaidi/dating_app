import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegsiterComponent implements OnInit {
   model:any ={}
   @Output() cancelResgister = new EventEmitter();
  constructor(public accountService:AccountService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(user=>{
      this.cancel();
    },err =>{
      this.toastr.error(err.error);
    })
  }

  cancel(){
    this.cancelResgister.emit(false);
  }

}
