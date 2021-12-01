import { Component, OnInit } from '@angular/core';
import { Certificate } from '../certificate';
import { Covid19Service } from '../covid-19.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  vaccinations: Certificate[] = []
  vaccinationsWithModerna: Certificate[] = []
  uniqueManufacturers: string[] = []
  positiveTests: Certificate[] = []
  testTypes: string[] = []
  vaccinationsLugano: Certificate[] = []

  constructor(private Covid19Service: Covid19Service) { }

  ngOnInit(): void {
    this.getVaccinations()
    this.getVaccinationsWithModerna()
    this.getUniqueManufacturers()
    this.getPositiveTest()
    this.getTestTypes()
    this.getVaccinationLugano()
  }

  getVaccinations() {
    this.Covid19Service.getVaccination().subscribe(v => this.vaccinations = v)
  }

  getVaccinationsWithModerna() {
    this.Covid19Service.getVaccinationWithModerna().subscribe(v => this.vaccinationsWithModerna = v)
  }

  getUniqueManufacturers() {
    this.Covid19Service.getUniqueManufacturers().subscribe(m => this.uniqueManufacturers = m)
  }

  getPositiveTest() {
    this.Covid19Service.getPositiveTests().subscribe(t => this.positiveTests = t)
  }

  getTestTypes() {
    this.Covid19Service.getTestTypes().subscribe(t => this.testTypes = t)
  }

  getVaccinationLugano() {
    this.Covid19Service.getVaccinationLugano().subscribe(v => this.vaccinationsLugano = v)
  }

}
