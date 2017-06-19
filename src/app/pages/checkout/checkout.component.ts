import { Component, OnInit, ElementRef , ViewChild, NgZone, Input} from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { CardService } from '../../modules/ng-innoway/services/card.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormBuilder , FormGroup} from '@angular/forms';
import { RegisWithProviderFormGroup, RegistrationValidateMessages } from '../../forms/registration.group';
import { AddressFormGroup, AddressValidateMessages } from '../../forms/address.group';
import { OrderFormGroup, OrderValidateMessages } from '../../forms/order.group';
import { AuthService } from '../../modules/ng-innoway/services/auth.service';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { MapPosition } from '../../blocks/bl-map/bl-map.component';
import {} from '@types/googlemaps';
import { Router } from '@angular/router';

declare var google: any,MessengerExtensions:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('placeSearchbar') placeSearchBarRef: ElementRef;
 
  date: DateModel;
  options: DatePickerOptions;
  cards:Observable<[any]>;
  private _cards = [];
  //Address Form
  frmAddress:FormGroup;
  locationSubmited:Boolean = false;
  locationValidMessage;
  location:any;
  //Order Form
  frmRegistration:FormGroup;
  regisSubmited:Boolean = false;
  regisCbMessage:string = null;
  regisValidMessages;
  addressAutocomplete: google.maps.places.Autocomplete;
  addressSearchBox: google.maps.places.SearchBox;
  addressPosition: BehaviorSubject<MapPosition>;
  orderId:string;

  currentStep = 'location';
  step = {
    location: true,
    order: false,
    complete: false,
  }
  constructor(
    private fb: FormBuilder,
    public cardService:CardService,
    public authService:AuthService,
    public mapsAPILoader: MapsAPILoader,
    private zone:NgZone,
    private router:Router
  ) {
    // this.options = new DatePickerOptions();
    // this.options.initialDate = new Date();
    // this.options.style = 'normal';
    this.frmAddress = AddressFormGroup(fb);
    this.locationValidMessage = AddressValidateMessages;
    this.frmRegistration = OrderFormGroup(fb);
    this.regisValidMessages = OrderValidateMessages;
    this.cards = this.cardService.getCards();
    this.cards.subscribe(cards=>{
      this._cards = cards;
    })
    var userInfo = authService.userInfo;
    this.frmRegistration.get('phone').setValue(userInfo.Phone);
    this.frmRegistration.get('fullName').setValue(userInfo.Fullname);
    this.frmRegistration.get('email').setValue(userInfo.Email);
    
  }

  ngOnInit() {
    this.location = {
      latitude: 10.1059989,
      longitude: 101.8609345
    }
    this.mapsAPILoader.load().then(()=>{
      this.addressAutocomplete = new google.maps.places.Autocomplete(this.placeSearchBarRef.nativeElement, {
        types: ["address"]
      });
      this.addressSearchBox = new google.maps.places.SearchBox(this.placeSearchBarRef.nativeElement);
      this.addressSearchBox.addListener("places_changed",this.onSearchPlaceChange.bind(this));
    })
    this.addressPosition = new BehaviorSubject<MapPosition>(this.location);
    window.navigator.geolocation.getCurrentPosition(position => {
      this.location = {
        latitude: position.coords.latitude ,
        longitude: position.coords.longitude 
      }
      this.addressPosition.next(this.location);
    })
    
  }

  chooseLocation(){
    this.currentStep = 'location';
  }

  billInfo(){
    this.locationSubmited = true;
    console.error('this.frmAddress.valid',this.frmAddress.valid);
    if(this.frmAddress.valid){
      this.currentStep = 'order';
      this.frmRegistration.controls['address'].setValue(this.frmAddress.controls['address'].value);
      this.step.order = true;
    }else{
      this.step.order = false;
    }
  }

  complete(){
    this.regisSubmited = true;
    if(this.frmAddress.valid && this.frmRegistration.valid){
      
      var data = {
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        promotionCode: this.frmRegistration.get('promotion').value,
        address: this.frmRegistration.get('address').value,
        area: this.frmAddress.get('area').value,
        details: this._cards.map((card,index)=>{
          return {
            ProductId: card.Id,
            Quantity: card.Quantity
          }
        })
      }
      // if(this.router.routerState.snapshot.url.includes('/fb/')){
      //   data = Object.assign(data,{
      //     senderId: localStorage.getItem('demo.innoway.fb.senderId')
      //   })
      // }
      this.cardService.order(data).then((result:any) =>{
        this.currentStep = 'complete';
        this.step.complete = true;
        this.orderId = result.Code;
        if(this.router.routerState.snapshot.url.includes('/fb/')){
          MessengerExtensions.requestCloseBrowser((success)=>{
              // this.orderId  = success;
          },(err,mess) =>{ 
            // this.orderId = mess;      
          });
        }
      }).catch(err =>{
        console.error('ERROR',err);
      })
    }
  }

  private onSearchPlaceChange(){
    console.log("place_changed");
    //get the place result
    let place: google.maps.places.PlaceResult = this.addressSearchBox.getPlaces()[0];
    if (place === undefined || place.geometry === undefined || place.geometry === null) {   
      return;
    }
    //set latitude, longitude and zoom
    this.location = {
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    }
    this.zone.run(()=>{
      this.addressPosition.next(this.location)
    })
    
  }

  onPositionChange(addressInfo){
    console.log('POSITION Change',addressInfo);
    this.frmAddress.controls['address'].setValue(addressInfo.formatted_address);
    this.frmAddress.controls['area'].setValue(addressInfo.administrative_area_level_2);
    this.location = {
      latitude: addressInfo.latitude,
      longitude: addressInfo.longitude
    }
  }

}
