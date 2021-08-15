import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm:NgForm;
  member:Member
  user:User
  @HostListener('window:beforeunload',['$event']) 
  unloadNotification(event:any){
    if(this.editForm.dirty){
      event.returnValue = true;

    }
  }

  constructor(private accountServ:AccountService,
    private toastr:ToastrService,
    private memberServ:MembersService) {
      this.accountServ.currentUser$.pipe(take(1)).subscribe(user=>{
        this.user = user;
      })

     }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberServ.getMember(this.user.username).subscribe(member =>{
      this.member= member;
      console.log(member);
    })
  }

  updateMember(){
    this.memberServ.updateMember(this.member).subscribe(()=>{
      this.toastr.success("Profile updated successfully");
      this.editForm.reset(this.member);
    })
    
  }

}
