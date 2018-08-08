import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Injectable } from '@angular/core';

import * as Constants from '../constants/app.constants';

@Injectable()
export class UserRegisterServices{
    constructor( private http: Http){}

    userRegister(user){
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let userName=user.firstName+user.lastName;
        let body = "Name=" + userName + "&Password=" + btoa(user.password) + "&Email=" + user.email;

        return this.http.post(Constants.baseURL + "/SignupUsers", body, {headers: headers})
            .map((response: Response) => {
                return response.json();
            });
    }
}