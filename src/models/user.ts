import { Token } from "../../node_modules/@angular/compiler";

export class User{
    constructor(public Email:string, public Fname:string, public Lname:string,
    public Token:Token,public UserId:number, public UserName:string){}
}