// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-about-us',
//   templateUrl: './about-us.component.html',
//   styleUrls: ['./about-us.component.styl']
// })
// export class AboutUsComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient} from '@angular/common/http';
import { ValidateService} from '../services/validate.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.styl']
})
export class AboutUsComponent implements OnInit {

  constructor(private authService : AuthService,
    private router : Router,
    private flashMessages : FlashMessagesService ,
    private Route:  ActivatedRoute,
    private http: HttpClient,
    private validateService : ValidateService,
    private config: NgbCarouselConfig) { }

  private groupInfo = [
    {
      "name" : "Vaishvik K. Brahmbhatt",
      "id" : "201601459",
      "role" : "Full stack developer"
    },
    {
      "name" : "Kalpit Shah",
      "id" : "201601441",
      "role" : "Full stack developer"
    }
  ]
  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  private msg = "";
  // sendMail(){
  //   if(this.msg == null){
  //     this.flashMessages.show('Fields can not be null !!' ,{cssClass: 'alert-danger' ,timeout :4000});
  //     document.body.scrollTop = 0; // For Safari
  //     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  //     this.msg = null;
  //   }else{
  //   // console.log(this.semail + " "+ this.spw + " "+ this.remail + " ");
  //   console.log(this.msg);
  //   let object = {
  //     sender_email : "jamessathomfox@gmail.com",
	//     sender_pw : "@asdfghjkl@",
	//     receiver_email : "jamessathomfox@gmail.com",
	//     message : this.msg
  //   }
  //   console.log(object);
  //   this.authService.sendEmails(object).subscribe((Response)=>{
  //     if(Response.success)    this.flashMessages.show('Email is successfully sent to Rentkaro service center' ,{cssClass: 'alert-success' ,timeout :4000});
  //     else { this.flashMessages.show('Error in sending email to  Rent karo service center . Try again later !' ,{cssClass: 'alert-danger' ,timeout :4000}); }
  //     this.msg = null;
  //     document.body.scrollTop = 0; // For Safari
  //     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  //   });
  // }
  // }
}
