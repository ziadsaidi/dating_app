import { JsonPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LikeParams } from '../_models/likeParams';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members:Member[] =[];
  memberCache = new Map();
  private _user:User;
  private _userParams:UserParams

  private _likeParams:LikeParams = new LikeParams();
 



  constructor(private http:HttpClient,private accountService:AccountService) {

    this.accountService.currentUser$.pipe(take(1))
    .subscribe(user=>{
      this.user = user;
      this.userParams = new UserParams(user);

    })
   }

   //getters and setters
    get likeParams (){
     return this._likeParams;
   }

   set likeParams(params:LikeParams){
       this._likeParams = params;
   }

   //getters and setters
   get userParams (){
    return this._userParams;
  }

  set userParams(params:UserParams){
   this._userParams = params;
  }


    get user (){
    return this._user;
  }

   set user(user:User){
   this._user = user;
  }

  resetUserParams(){
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  resetLikeParams(){
    this.likeParams = new LikeParams();
    return this.likeParams;
  }




  getMembers(userParams:UserParams){
   
    //caching mechanism
  var response = this.memberCache.get(Object.values(userParams).join('-'));
  if(response){
    return of(response);
  }
    let params = this.getPaginationHeaders(userParams.pageNumber,userParams.pageSize);

    params = params.append('minAge',userParams.minAge.toString());
    params = params.append('maxAge',userParams.maxAge.toString());
    params = params.append('gender',userParams.gender);
    params = params.append('orderBy',userParams.orderBy);
    
    return this.getPaginatedResult<Member[]>(this.baseUrl+ "users", params)
    .pipe(
      map((response)=>{
        this.memberCache.set(Object.values(userParams).join('-'),response);
        return response;
      })
    );

  }

 

  getMember(username:string){
    const member = 
    [...this.memberCache.values()]
    .reduce((arr,elem)=>{
      return arr.concat(elem.result)

    },[]).find((member:Member)=> member.username === username);

    if(member){
      return of(member);
    }


   return  this.http.get<Member>(this.baseUrl+ "users/"+username)
  }

  updateMember(member:Member){
    return this.http.put(this.baseUrl + "users",member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId:number){
   return  this.http.put(this.baseUrl +"users/set-main-photo/"+photoId,{});
  }

  deletePhoto(photoId:number){
    return  this.http.delete(this.baseUrl +"users/delete-photo/"+photoId,{});

  }


addLike(username:string){
  return this.http.post(this.baseUrl +'likes/'+ username,{})
}

getLikes(likeParams:LikeParams):Observable<PaginatedResult<Partial<Member[]>>>{

  let params = this.getPaginationHeaders(likeParams.pageNumber,likeParams.pageSize);
  params = params.append('predicate',likeParams.predicate);

  return this.getPaginatedResult<Partial<Member[]>>(this.baseUrl +'likes?predicate='+likeParams.predicate, params)
  .pipe(
    map((response)=>{
      this.memberCache.set(Object.values(likeParams).join('-'),response);
      return response;
    })
  );
 
}


  private getPaginatedResult<T>(url,params) {
    const  paginatedResult:PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
      paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;

      })
    );
  }

  private getPaginationHeaders(pageNumber:number,pageSize:number){

    let params = new HttpParams();
      params = params.append('pageNumber',pageNumber.toString());
      params = params.append('pageSize',pageSize.toString());
      return params;
    
  }
}
