import { Device } from "@ionic-native/device";
import { Injectable } from "@angular/core";
import { Http, RequestOptions,Headers } from "@angular/http";

@Injectable()
export class AuthServices{
    private deviceId:string='';

    constructor(public device:Device,private http:Http){
        this.deviceId=this.device.uuid;
        if(!this.deviceId){
            this.deviceId='0000';
        }
    }
    

    signIn(userid:string,password:string){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    let body = "userid=" + userid.toLowerCase() + "&password=" + btoa(password) + "&deviceid=" +this.deviceId;
    
    return new Promise((resolve) => {
                    this.http.post("https://stagetca.tronc.com/api/tca/IsLogin", body, {headers:headers}).subscribe((data) => {
                    if (data.json()) {
                        resolve(data.json());
                    } else {
                        console.log("Error");
                    }
                }
            )
        });

    }
    logOut(){
        
    }
}