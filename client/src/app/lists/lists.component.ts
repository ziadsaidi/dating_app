import { Component, OnInit } from '@angular/core';
import { LikeParams } from '../_models/likeParams';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { MembersService } from '../_services/members.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {

  members:Partial<Member[]> ;
  pagintion:Pagination;
  likeParams:LikeParams;
  user:User

  constructor(private memberService:MembersService) {

    this.user = memberService.user;
    this.likeParams= memberService.likeParams;
  }

  ngOnInit(): void {
    this.loadLikes();
  }

  resetFilters(){
    this.likeParams = this.memberService.resetLikeParams();
    this.loadLikes();


  }

  loadLikes(){
    
    this.memberService.getLikes(this.likeParams).subscribe(response =>{
      this.members = response.result
      this.pagintion = response.pagination
    })
  }

  pageChanged(event:any){
    this.likeParams.pageNumber = event.page;
    this.memberService.likeParams = this.likeParams;
    this.loadLikes();
  }
}
