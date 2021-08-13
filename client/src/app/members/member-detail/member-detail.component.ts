import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {


  member:Member
  galleryOptions:NgxGalleryOptions[]
  galleryImages:NgxGalleryImage[];

  constructor(private memberService:MembersService,
    private route:ActivatedRoute
    ) { }

    getImages():NgxGalleryImage[]{
      const imageUrls:NgxGalleryImage[] =[];
      for(const photo of this.member.photos){
        imageUrls.push({
          small:photo?.url,
          medium:photo?.url,
          big:photo?.url

        })
      }
      return imageUrls;
    }

    loadMember(){
      const username = this.route.snapshot.paramMap.get('username');
      this.memberService.getMember(username).subscribe(user=>{
        this.member = user;
        this.galleryImages = this.getImages();
      })
    }

   

  ngOnInit(): void {
    this.loadMember();
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
  }
   

}
