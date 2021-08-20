import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/message';
import { getPaginatedResult, getPaginationHeaders } from './PaginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) {


   }



   getMessages(pageNumber,pageSize,container){
     let params = getPaginationHeaders(pageNumber,pageSize);
     params = params.append('Container',container);

     return getPaginatedResult<Message[]>(this.http,this.baseUrl+'messages',params)

   }

   getMessageThread(username:string){
     console.log(username)
     return this.http.get<Message[]>(this.baseUrl +'messages/thread/'+username);
   }


   sendMessage(username:string, content:string){
     return this.http.post<Message> (this.baseUrl +'messages',{
      recipientUsername:username,
      content
     });
   }
   
   deleteMessage(id:number){
     console.log(id);
     return this.http.delete(this.baseUrl+"messages/"+id)
   }


   



}
