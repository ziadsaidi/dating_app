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


   



}
