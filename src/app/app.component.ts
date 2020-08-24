import { Component, OnInit } from '@angular/core';
import M from 'materialize-css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:String = 'covid19trackerAngular';
  allCountries:Array<any>;

  async ngOnInit(){
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});

    const apiCall= await fetch('https://disease.sh/v3/covid-19/countries');
    const result = await apiCall.json();
    this.allCountries = result.map( (detail: any) => {
      return {
        id: detail.countryInfo._id,
        country: detail.country,
        code: detail.countryInfo.iso2,
      }
    });
    console.log(this.allCountries);

  }
}
