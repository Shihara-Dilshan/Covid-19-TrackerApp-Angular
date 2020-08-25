import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recovered',
  templateUrl: './recovered.component.html',
  styleUrls: ['./recovered.component.css']
})
export class RecoveredComponent implements OnInit {
  @Input() countryDetail:any;
  constructor() { }

  ngOnInit(): void {
  }

}
