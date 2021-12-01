import { Component, OnInit, Input } from '@angular/core';
import { Certificate } from '../certificate';
import { TestForm, VaccinationForm } from '../form';

@Component({
  selector: 'app-covid19-certificate',
  templateUrl: './covid19-certificate.component.html',
  styleUrls: ['./covid19-certificate.component.css']
})
export class Covid19CertificateComponent implements OnInit {

  @Input() certif: Certificate | undefined = undefined
  
  json: string = ""

  constructor() { }

  ngOnInit(): void {
    console.log(this.certif)
    this.json = JSON.stringify(this.certif);
  }

}
