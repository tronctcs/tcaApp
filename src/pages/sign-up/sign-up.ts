import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  specialChars= /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\;|\:|\s/g

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userRegistration: UserRegisterServices, public ticketServices: TicketServices,
    public statusBar: StatusBar, public loadingCntrl: LoadingController) {
  }

  ngOnInit() {
    this.user = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern(this.specialChars)]),
      lastName: new FormControl('', [Validators.pattern(this.specialChars)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required]),
      re_password: new FormControl('', [Validators.required, this.equalto('password')])
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#105ee8');
    this.statusBar.styleLightContent();
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
    const loading = this.loadingCntrl.create({
      content: 'Please wait...'
    });
    this.userRegistration.userRegister(this.user.value).subscribe(data => {
      loading.dismiss();
      if (data) {
        let d = '<b>' + data + '</b>';
        this.ticketServices.handleAlert('Registration successful. Your user id is ' + d +
          '', 's');
        this.navCtrl.pop();
      } else {
        this.ticketServices.handleAlert('Some error occoured while registring the user. Please try again.', 'e');
      }

    }, (err) => {
      loading.dismiss();
      this.ticketServices.handleAlert('Some error occoured while registring the user. Please try again.', 'e');
    });
  }
}
