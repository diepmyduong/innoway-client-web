import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class MapPosition {
  public latitude:number;
  public longitude:number;
}

@Component({
  selector: 'app-bl-map',
  templateUrl: './bl-map.component.html',
  styleUrls: ['./bl-map.component.css']
})
export class BlMapComponent implements OnInit {

  private _position = new BehaviorSubject<MapPosition>({
    latitude: 16.1059989,
    longitude: 101.8609345
  });
  @Input()
  set position(data){
    console.log('SET POSITION',data);
    this._position.next(data);
  };
  get position(){
    return this._position.getValue();
  }
  @Output() positionUpdate = new EventEmitter();

  currentPosition: any;
  mapZoom: number;
  addressMarkers: Array<any> = [];
  constructor(
    public mapsAPILoader: MapsAPILoader,
  ) { 
    this.mapZoom = 6;
    this.currentPosition = {
      latitude: 16.1059989,
      longitude: 101.8609345
    };
    
  }

  ngOnInit() {
    this._position.subscribe(position =>{
      console.log('SUBCRIBLE POSITION',position);
      this.currentPosition = position;
      this.mapZoom = 17;
      this.setAddressMarker(position.latitude,position.longitude);
    })
    this.mapsAPILoader.load().then(()=>{
      // this.addressAutocomplete = new google.maps.places.Autocomplete(this.placeSearchBarRef._searchbarInput.nativeElement, {
      //   types: ["address"]
      // });
      // this.addressSearchBox = new google.maps.places.SearchBox(this.placeSearchBarRef._searchbarInput.nativeElement);
      // this.addressSearchBox.addListener("places_changed",this.onSearchPlaceChange.bind(this));
    })
  }

  private setAddressMarker(lat,lng){
    this.addressMarkers.pop();
    
    this.addressMarkers.push({
      lat: lat,
      lng: lng
    });
    this.loadAddress({
      lat: lat,
      lng: lng
    }).then(result =>{
      this.positionUpdate.emit(result);
      console.log('RESULT',result);
    })
  }

  onMapClick(ev){
    console.log('map click:',ev);
    this.setAddressMarker(ev.coords.lat,ev.coords.lng);
    // this.addInfoWindows.pop();
    // this.addInfoWindows.push({
    //   lat: ev.coords.lat,
    //   lng: ev.coords.lng,
    //   isOpen: true
    // });
  }

  loadAddress(location){
    return new Promise((resolve,reject)=>{ 
      
      this.mapsAPILoader.load().then(()=>{
        var geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng)
        }},(results,status)=>{
          var result = {};
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              results[0].address_components.map(component =>{
                component.types.map(type =>{
                  result[type] = component.long_name;
                })
              })
              result['formatted_address'] = results[0].formatted_address;
              result['place_id'] = results[0].formatted_address;
              result['latitude'] = parseFloat(location.lat);
              result['longitude'] = parseFloat(location.lng);
              resolve(result);
            } else {
              reject('No results found')
            }
          } else {
            reject('Geocoder failed due to: '+status)
          }
        });
      })
    })
  }

}
