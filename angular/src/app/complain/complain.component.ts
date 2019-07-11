import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';

import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.styl']
})
export class ComplainComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private router : Router ,
    private route : ActivatedRoute,
    private flashMessages : FlashMessagesService
  ) { 

  }
  cid = null;
  user : Object;
  complain : Object;
  time : Date;
  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.cid = this.route.snapshot.paramMap.get('id');
    console.log(this.cid);

    this.authService.viewComplainById(this.cid).subscribe( res => {
      // console.log(res.json());
      this.complain = res.json();
    });
  }

}
