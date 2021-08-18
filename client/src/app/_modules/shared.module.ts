import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {BsDatepickerModule} from'ngx-bootstrap/datepicker';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ButtonsModule} from"ngx-bootstrap/buttons";
import {TabsModule} from "ngx-bootstrap/tabs"
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    TimeagoModule.forRoot()
  
  ],
  exports:[
    ToastrModule,
    BsDropdownModule,
    PaginationModule,
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule,
    ButtonsModule,
    TimeagoModule

  ]
})
export class SharedModule { }
