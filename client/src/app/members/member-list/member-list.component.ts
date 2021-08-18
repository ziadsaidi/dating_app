import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members:Member[];
  pagintion:Pagination;
  userParams:UserParams;
  user:User;
  genderList =[{
    value:'male',
    display:'Males'
  },{
    value:'female',
    display:"Females"
  }];

  constructor( private accountService:AccountService, private memberservice:MembersService) { 
    this.accountService.currentUser$.pipe(take(1))
    .subscribe(user=>{
      this.user = user;
      this.userParams = new UserParams(user);

    })

  }

  resetFilters(){
    this.userParams = new UserParams(this.user);
    this.laodMembers();


  }

  ngOnInit(): void {
    this.laodMembers();
  
  }

  laodMembers(){
    this.memberservice.getMembers(this.userParams).subscribe(response =>{
      this.members = response.result;
      this.pagintion = response.pagination;
    })

  }
  pageChanged(event:any){
    this.userParams.pageNumber = event.page;
    this.laodMembers();
  }


}
