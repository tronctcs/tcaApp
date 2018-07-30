import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserRegisterServices } from '../../services/userRegister.services';
import { TicketServices } from '../../services/ticketServices';
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage implements OnInit {
  user: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userRegistration: UserRegisterServices, public ticketServices: TicketServices,
    public statusBar: StatusBar) {
    this.statusBar.backgroundColorByHexString('#105ee8');
  }

  ngOnInit() {
    this.user = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required]),
      re_password: new FormControl('', [Validators.required, this.equalto('password')])
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      let input = control.value;

      let isValid = control.root.value[field_name] == input
      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }

  onSubmit() {
    this.userRegistration.userRegister(this.user.value).subscribe(data => {
      if (data) {
        this.ticketServices.handleAlert('Thank you for registring Ticket claim application.' +
          'You will receive an email for confirmation. Please follow instructions in the mail for further steps.', 's');
      } else {
        this.ticketServices.handleAlert('Some error occoured while registring the user. Please try again.', 'e');
      }
    }, (err) => {
      this.ticketServices.handleAlert('Some error occoured while registring the user. Please try again.', 'e');
    });
  }
}
