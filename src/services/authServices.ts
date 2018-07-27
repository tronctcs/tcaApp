import { Device } from "@ionic-native/device";
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Storage } from "@ionic/storage";

import * as Constants from '../constants/app.constants';
import { User } from "../models/user";

@Injectable()
export class AuthServices {
    private deviceId: string = '';
    public user:User;

    constructor(public device: Device, private http: Http, public storage: Storage) {
        this.deviceId = this.device.uuid;
        if (!this.deviceId) {
            this.deviceId = '0000';
        }
    }


    signIn(userid: string, password: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = "userid=" + userid.toLowerCase() + "&password=" + btoa(password) + "&deviceid=" + this.deviceId;

        return this.http.post(Constants.baseURL + "/IsLogin", body, { headers: headers })
            .map((response: Response) => {
                return response.json();
            });


    }

    logOut() {
        this.storage.get('tkn').then((val) => {
            new Promise((resolve) => {
                this.http.get(Constants.baseURL + '/logout?authkey=' + val)
                    .subscribe();
            });
        }).then(() => {
            this.storage.remove('tkn');
        });

    }
    
    getUserDetails(val){
        return this.http.get(Constants.baseURL+'/Details?token=' + val)
            .map((response: Response) => {
                return response.json();
            }).do((data) => {
                this.user=data;
            });
    }
}