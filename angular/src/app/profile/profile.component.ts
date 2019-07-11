import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { UsernameValidators } from '../register/username.validators';
import { and } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  user :Object;
  nm;
  name : String;
  showDivWorker = false;
  complains = [];
  assignedComplains = [];
  workersComplain = [];
  countAssComp  = 0;
  countNonAssComp  = 0;
  nonAssComplains = [];
  selectedWorkers = [];
  countSW = 0;
  workers = [];
  isAdmin = false;
  isWorker = false;
  countW = 0;
  user_type = false;
  progArr = [];
  constructor(private authService : AuthService ,
              private flashMessages : FlashMessagesService ,
              private usernameValidators : UsernameValidators,
              private router : Router,
              private Route: ActivatedRoute) { 

                this.authService.getProfile().subscribe( profile =>{
                 var us = profile.user.username ;
                 this.user = profile.user;
                //  console.log(profile.user.type);
                if(profile.user.type == "Complainer"){
                  this.user_type = true;
                }
                  this.router.navigate(['/Profile',us]);
                },err=>{
                  console.log(err);
                  return false;
                });
            
 }
 
  form2 = new FormGroup({
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    password3: new FormControl('', [
        Validators.required,
        Validators.minLength(6)     
      ]
    ),
    });
  usernameOfCurrentUser = "";
  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    this.nm = this.Route.snapshot.paramMap.get('username');
    // console.log(this.nm);
    if(this.nm == null){
      this.authService.getProfile().subscribe( profile =>{
        var us = profile.user.username  ;
        this.usernameOfCurrentUser = us;
        this.user = profile.user;
        this.router.navigate(['/Profile',us]);

       },err=>{
         console.log(err);
         return false;
       });
    }
    // console.log("nm: "+ this.nm);

    this.authService.getProfile().subscribe( profile =>{
      this.user = profile.user  ;
      this.name = profile.user.name;
      console.log(this.user);
      if(profile.user.type == "Admin of Department"){
        this.isAdmin = true;
        this.isWorker = false;
      }
      if(profile.user.type == "Worker"){
        this.isWorker = true;
        this.isAdmin = false;
        this.authService.getWorkersComplain(profile.user._id).subscribe(res =>{
          // console.log(res.json());
          for(let i=0;i< res.json().length;i++){
            this.workersComplain[i] = {
                _id: res.json()[i]._id,
                complainerName:  res.json()[i].complainerName,
                complainName: res.json()[i].complainName,
                complainerId: res.json()[i].complainerId,
                complainId: res.json()[i].complainId,
                time: res.json()[i].time ,
                status: res.json()[i].status,
                type: res.json()[i].type,
                workerId: res.json()[i].workerId,
                workerName: res.json()[i].workerName
            };
        }
        });
      }
      // console.log(profile.user._id);
      this.authService.viewMyComplains(profile.user._id).subscribe( res =>{
        // console.log(res.json());
        for(let i=0;i< res.json().length;i++){
          this.complains[i] = {
            id : res.json()[i]._id,
            complainerName : res.json()[i].complainerName,
            complainName : res.json()[i].complainName,
            type : res.json()[i].type,
            city : res.json()[i].city,
            area : res.json()[i].area,
            time : res.json()[i].time,
            image : null,
            status : res.json()[i].status,
            completed: res.json()[i].completed,
            assigned: res.json()[i].assigned
          };
      }
      });
    },err=>{
      console.log(err);
      return false;
    });

    this.authService.getAllUsers().subscribe(res =>{
      for(let i=0;i<res.json().length;i++){
        if(res.json()[i].type == "Worker"){
          this.workers[this.countW++] = {
            id: res.json()[i]._id,
            name: res.json()[i].name,
            username : res.json()[i].username,
            email: res.json()[i].email,
            category: res.json()[i].category
          }
        }
      }
    });

    this.authService.viewMyComplains("GiveMeAllComplains").subscribe( res =>{
        for(let j=0;j< res.json().length;j++){
          if(res.json()[j].assigned == false){
            this.nonAssComplains[this.countNonAssComp++] = {
              id : res.json()[j]._id,
              complainerName : res.json()[j].complainerName,
              complainName : res.json()[j].complainName,
              complainerId : res.json()[j].complainerId,
              type : res.json()[j].type,
              city : res.json()[j].city,
              area : res.json()[j].area,
              time : res.json()[j].time,
              image : null,
              status : res.json()[j].status
            };
          }
          else{
            this.assignedComplains[this.countAssComp++] = {
              id : res.json()[j]._id,
              complainerName : res.json()[j].complainerName,
              complainName : res.json()[j].complainName,
              complainerId : res.json()[j].complainerId,
              type : res.json()[j].type,
              city : res.json()[j].city,
              area : res.json()[j].area,
              time : res.json()[j].time,
              image : null,
              status : res.json()[j].status
            };
          }

      }
      console.log(this.countAssComp + "        " + this.countNonAssComp);
    });

  }

  addComplain(){
    this.router.navigate(['/addComplain']);
  }
  viewComplain(id){
    console.log(id);
    this.router.navigate(['/complain',id]);
  }

  selectedItem = null;
  selectedComplainWorker = null;
  showDiv = false;
  workIsDone = false;
  progValue = 0;
  ViewDivWorker(item){
    this.showDiv = false;
    this.showDivWorker = true;
    console.log(item);
    this.selectedComplainWorker = item;
    let number = item.status;
    if(number == 0){
      this.progArr = [ 25 , 50 , 75 , 100];
    }
    if(number == 25){
      this.progArr = [ 50 , 75, 100];
    }
    if(number == 50){
      this.progArr = [ 75 , 100 ];
    }
    if(number == 75){
      this.progArr = [100];
    }
    if(number == 100){
      this.progArr = [];
      this.workIsDone = true;
    }
  }

  giveProg(id){
    let obj = {
      number : this.progValue
    }
    console.log(obj);
    // console.log(id + " " + this.progValue);
    this.authService.progComplainBar(obj,id).subscribe(res =>{
      if(res.success){
        this.flashMessages.show(res.msg ,{cssClass: 'alert-success' ,timeout :5000});
      }else{
        this.flashMessages.show(res.msg ,{cssClass: 'alert-success' ,timeout :5000});
      }
      this.showDiv = false;
      this.showDivWorker = false;
    });
  }
  ViewDiv(item){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.showDiv = true;
    this.showDivWorker = false;
    this.selectedItem = item;
    // console.log(item);
    this.authService.getAllUsers().subscribe( res =>{
      for(let i=0;i<res.json().length;i++){
        // console.log(res.json()[i]);
        if(res.json()[i].type == "Worker" && res.json()[i].category == item.type ){
          this.selectedWorkers[this.countSW++] = {
            id: res.json()[i]._id,
            name: res.json()[i].name,
            username : res.json()[i].username,
            email: res.json()[i].email,
            category: res.json()[i].category
          }
        }
      }
    });

  }

  hide(){
    this.showDiv = !this.showDiv;
  }
  hide2(){
    this.showDivWorker = !this.showDivWorker;
    this.workIsDone = false;
  }

  assignWork(item){
    if(this.selectedItem == null){
      alert("Refresh the page. Something Went Wrong !!!");
      return;
    }
    console.log(item);
    console.log(this.selectedItem);
    var object = {
        complainId:  this.selectedItem.id,
        complainerName : this.selectedItem.complainerName,
        complainName : this.selectedItem.complainName,
        complainerId :  this.selectedItem.complainerId,
        workerId : item.id,
        type: this.selectedItem.type,
        workerName : item.username
    };
    console.log(object);
    this.authService.assignWorkerToComplain(object).subscribe(data =>{
      if(data.success){
        this.flashMessages.show(data.msg ,{cssClass: 'alert-success' ,timeout :5000});
        this.hide();
        this.authService.viewMyComplains("GiveMeAllComplains").subscribe( res =>{
          for(let j=0;j< res.json().length;j++){
            if(res.json()[j].assigned == false){
              this.nonAssComplains[this.countNonAssComp++] = {
                id : res.json()[j]._id,
                complainerName : res.json()[j].complainerName,
                complainName : res.json()[j].complainName,
                complainerId : res.json()[j].complainerId,
                type : res.json()[j].type,
                city : res.json()[j].city,
                area : res.json()[j].area,
                time : res.json()[j].time,
                image : null,
                status : res.json()[j].status
              };
            }
            else{
              this.assignedComplains[this.countAssComp++] = {
                id : res.json()[j]._id,
                complainerName : res.json()[j].complainerName,
                complainName : res.json()[j].complainName,
                complainerId : res.json()[j].complainerId,
                type : res.json()[j].type,
                city : res.json()[j].city,
                area : res.json()[j].area,
                time : res.json()[j].time,
                image : null,
                status : res.json()[j].status
              };
            }
  
        }
      });
      }
      else {
        this.flashMessages.show(data.msg ,{cssClass: 'alert-danger' ,timeout :5000});
      }
    })
  }
}

