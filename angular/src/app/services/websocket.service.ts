import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";

@Injectable()
export class WebService {
  authToken: any;
  user: any;
  private socket = io('http://localhost:4000');
  constructor(private http : Http) { }

  onlineUserSend(){
    //console.log("num of onlineUser send to server ...");
    this.socket.emit('onlineUsers');
  }


  sendUsername(name){
    //console.log("sending username index...." + name);
    this.socket.emit('onlineUsername',name);
  }

  checkOther(){
    //console.log("checking");
    this.socket.emit('check');
  }

  checkingAtLogout(){
    this.socket.emit('checkLogout');
  }

  
  checkingAtLogIn(){
    this.socket.emit('checkLogIn');
  }

  refreshRealtime(){
    // console.log("profile Realtime constructor");
    this.socket.emit('profileRealtime');
  }

  getSocket(){
      return this.socket;
  }

  
  joinRoom(data) {
    console.log(data);
    this.socket.emit('join', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }



}