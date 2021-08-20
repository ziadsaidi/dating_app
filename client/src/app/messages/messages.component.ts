import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages :Message[];
  pagination:Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading =false;



  constructor(private messageService:MessageService) { }


  getMessages(){
    this.loading = true;
    this.messageService.getMessages(this.pageNumber,
      this.pageSize,this.container).subscribe(messages =>{
       this.messages = messages.result;
       this.pagination = messages.pagination;
       this.loading = false;
      })
  }

  ngOnInit(): void {
    this.getMessages();

  }
  deleteMessage(event,id:number){
    event.stopPropagation();
          
      this.messageService.deleteMessage(id).subscribe(res =>{
        console.log(res);
      })
    
   
     this.messages = this.messages.filter( m => m.id !== id)
  }

  pageChanged(event:any){
    this.pageNumber = event.page;
   
   
    this.getMessages();
  }

}
