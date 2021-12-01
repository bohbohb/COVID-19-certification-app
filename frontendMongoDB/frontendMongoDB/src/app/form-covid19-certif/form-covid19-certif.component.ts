import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Covid19Service } from '../covid-19.service';
import { TestForm, VaccinationForm, AddVaccineForm } from '../form';
import { Certificate } from '../certificate';

@Component({
  selector: 'app-form-covid19-certif',
  templateUrl: './form-covid19-certif.component.html',
  styleUrls: ['./form-covid19-certif.component.css']
})
export class FormCovid19CertifComponent implements OnInit {

  manufacturers: string[] = []
  places: string[] = []
  doses: string[] = []
  genCertif: Certificate | undefined = undefined
  certificates: Certificate[] = []
  persons: string[] = []


  typeCertif: string = "vaccination"

  readonly personForm = {
    firstname: ["", [Validators.required]],
    lastname: ["", [Validators.required]],
    birthdate: ["", [Validators.required]],
    birthplace: ["", [Validators.required]],
    phonenumber: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    ecFirstname: ["", [Validators.required]],
    ecLastname: ["", [Validators.required]],
    ecPhonenumber: ["", [Validators.required]]
  }

  readonly vaccinationForm = {
    ...this.personForm,
    dose: ["", [Validators.required]],
    vaccinationDate: ["", [Validators.required]],
    vaccinationPlace: ["", [Validators.required]],
    manufacturer: ["", [Validators.required]]
  }

  readonly testForm = {
    ...this.personForm,
    testDate: ["", [Validators.required]],
    testPlace: ["", [Validators.required]],
    testResult: ["", [Validators.required]]
  }

  readonly addVaccineForm = {
    fullname: ["", [Validators.required]],
    dose: ["", [Validators.required]],
    vaccinationDate: ["", [Validators.required]],
    vaccinationPlace: ["", [Validators.required]],
    manufacturer: ["", [Validators.required]]
  }


  certifCovForm!: FormGroup
  isSubmit = false

  constructor(public formBuilder: FormBuilder, private Covid19Service: Covid19Service) { }

  ngOnInit(): void {
    this.getManufacturers()
    this.getPlaces()
    this.getDoses()
    this.loadForm()
    this.getVaccination()
    this.getPersons();
  }

  getManufacturers() {
    this.Covid19Service.getManufacturers().subscribe(m => this.manufacturers = m)
  }

  getPlaces() {
    this.Covid19Service.getPlaces().subscribe(p => this.places = p)
  }

  getDoses() {
    this.Covid19Service.getDoses().subscribe(d => this.doses = d)
  }

  getVaccination() {
    this.Covid19Service.getVaccination().subscribe(c => this.certificates = c)
  }

  getPersons() {
    this.Covid19Service.getPersons().subscribe(p => this.persons = p);
  }

  changeTypeCertif(e: any) {
    switch(e.target.value) {
      case "vaccination":
        this.typeCertif = e.target.value;
        break
      case "test":
        this.typeCertif = e.target.value;
        break
      case "add-vac":
        this.typeCertif = e.target.value;
        break
    }
    this.loadForm();
  }

  loadForm() {
    switch(this.typeCertif) {
      case "test":
        this.certifCovForm = this.formBuilder.group(this.testForm)
        break
      case "add-vac":
        this.certifCovForm = this.formBuilder.group(this.addVaccineForm)
        break
      default:
        this.certifCovForm = this.formBuilder.group(this.vaccinationForm)
    }
  }

  get errorControl() {
    return this.certifCovForm.controls;
  }

  async submitForm() {
    this.isSubmit = true;
    if (!this.certifCovForm.valid) {
      return false
    }
    
    let data: VaccinationForm | TestForm | AddVaccineForm = this.certifCovForm.value;
    
    switch(this.typeCertif) {
      case "vaccination":
        this.Covid19Service.postVaccination(data as VaccinationForm).subscribe(c => this.genCertif = c);
        break
      case "test":
        this.Covid19Service.postTest(data as TestForm).subscribe(c => this.genCertif = c);
        break
      case "add-vac":
        data.lastname = (data as AddVaccineForm).fullname.split(" ")[1]
        data.firstname = (data as AddVaccineForm).fullname.split(" ")[0]
        console.log(data);
        this.Covid19Service.putVaccination(data as AddVaccineForm).subscribe(c => this.genCertif = c);
        break
    }

    return true
  }

}
