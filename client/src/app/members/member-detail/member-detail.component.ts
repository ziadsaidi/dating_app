import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

 @ViewChild('memberTabs',{static:true}) memberTabs :TabsetComponent
  member:Member
  galleryOptions:NgxGalleryOptions[]
  galleryImages:NgxGalleryImage[];
  activeTab:TabDirective
  messages : Message[] = [];

  constructor(private memberService:MembersService,
    private messageService:MessageService,
    private route:ActivatedRoute
    ) { }

    getImages():NgxGalleryImage[]{
      const imageUrls:NgxGalleryImage[] =[];
      console.log(this.member.photos);
      for(const photo of this.member.photos){
        imageUrls.push({
          small:photo?.url,
          medium:photo?.url,
          big:photo?.url

        })
      }
      return imageUrls;
    }


    onTabActivated(data:TabDirective){
      this.activeTab = data;
      if(this.activeTab.heading ==="Messages" && this.messages.length ===0){
        this.loadMessages();
      }
    }
   
    loadMessages(){
      this.messageService.getMessageThread(this.member.username).subscribe(messages =>{
        this.messages = messages;
      })
    }

    selectTab(tabId:number){
      console.log(tabId);
      this.memberTabs.tabs[tabId].active = true;
    }

    
  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      this.member  = data.member;
    })
    this.route.queryParams.subscribe(params =>{
      params.tab ? 
      this.selectTab( params.tab)
      :this.selectTab(0)
    })


   
    this.galleryOptions =[
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ]
    this.galleryImages = this.getImages();
  }
   

}
