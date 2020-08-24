import { Component, OnInit } from '@angular/core';
import M from 'materialize-css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title: String = 'covid19trackerAngular';
  public allCountries: Array<any>;
  public currentCountry:string;
  public currentCountryDetails:object = {};

  async ngOnInit() {
    const elems = document.querySelectorAll('select');

    const apiCall = await fetch('https://disease.sh/v3/covid-19/countries');
    const result = await apiCall.json();
    this.allCountries = result.map((detail: any) => {
      return {
        id: detail.countryInfo._id,
        country: detail.country,
        code: detail.countryInfo.iso2,
      };
    });
    setTimeout(() => {
      M.FormSelect.init(elems, {});
    }, 10);
  }

  async selectCountry(event:any){
    let apiCall:any;
    let result:any
    if(event.target.value === 'worldwide'){
      this.currentCountry = "all";
      apiCall = await fetch(`https://disease.sh/v3/covid-19/all`);
      result = await apiCall.json();
    }else{
      this.currentCountry = event.target.value;
      apiCall = await fetch(`https://disease.sh/v3/covid-19/countries/${this.currentCountry}`);
      result = await apiCall.json();
    }
    
    this.currentCountryDetails = result;
    console.log(this.currentCountryDetails);
  }

}
