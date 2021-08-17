import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegsiterComponent implements OnInit {
  
   @Output() cancelResgister = new EventEmitter();


   registerForm:FormGroup;
   maxDate:Date;
   validationErrors : string[] =[];

  constructor(
    private fb:FormBuilder,
    private router:Router,
    public accountService:AccountService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  initializeForm(){

    this.registerForm = this.fb.group({
      gender:['male'],
      username:['',Validators.required],
      knownAs:['',Validators.required],
      dateOfBirth:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password:['',[Validators.minLength(4),Validators.required]],
      confirmPassword:['',[this.matchValues('password'),Validators.required]]
    })
  }

  matchValues(matchTo:string):ValidatorFn{
    return (control:AbstractControl) =>{
      return control?.value === control?.parent?.controls[matchTo].value? null:{
        isMatching:true
      }
    }
  }

  register(){
   this.accountService.register(this.registerForm.value).subscribe(user=>{
     this.router.navigateByUrl('/members')
     },err =>{
       this.validationErrors = err;

     })


  }

  cancel(){
    this.cancelResgister.emit(false);
  }

}
