import { Component, OnInit } from '@angular/core';
import M from 'materialize-css';
import Chart from 'chart.js';


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
  public tableData:Array<any>;

  async ngOnInit() {
    const elems = document.querySelectorAll('select');

    const firstLoadAPiCall = await fetch(`https://disease.sh/v3/covid-19/all`);
    const resultFIrst = await firstLoadAPiCall.json();
    this.currentCountryDetails = resultFIrst;

    const apiCall = await fetch('https://disease.sh/v3/covid-19/countries');
    const result = await apiCall.json();
    this.allCountries = result.map((detail: any) => {
      return {
        id: detail.countryInfo._id,
        country: detail.country,
        code: detail.countryInfo.iso2,
      };
    });

    this.tableData = result.map( (country:any) => {
      return{
        name: country.country,
        cases: country.cases,
      }
    });

    this.tableData = [
      ...this.tableData
        .sort((a, b) => {
          if (a.cases > b.cases) {
            return -1;
          } else {
            return 1;
          }
        })
        .slice(0, 15),
    ];
    setTimeout(() => {
      M.FormSelect.init(elems, {});
    }, 10);

    const getDetails = await fetch(
      "https://www.disease.sh/v3/covid-19/historical/all"
    );
    const resultHistory = await getDetails.json();

    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(resultHistory.cases),
        datasets: [
          {
            label: 'Total Cases',
            data: Object.values(resultHistory.cases),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
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
