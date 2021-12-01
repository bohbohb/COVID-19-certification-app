import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Certificate } from './certificate';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DbConnectorService } from './db-connector.service';
import { AddVaccineForm, TestForm, VaccinationForm } from './form';


@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor(private dbConnector: DbConnectorService) { }

  getManufacturers(): Observable<string[]> {
    const route = `/api/covidapp/dropdown/manufacturers`

    return this.dbConnector.getHttp(route, undefined, undefined).pipe(
      map((res: any) => {
        let manufacturers = res[0].manufacturer as string[];
        return manufacturers
      })
    )
  }

  getPlaces(): Observable<string[]> {
    const route = `/api/covidapp/dropdown/places`

    return this.dbConnector.getHttp(route, undefined, undefined).pipe(
      map((res: any) => {
        let places = res[0].place as string[];
        return places
      })
    )
  }

  getDoses(): Observable<string[]> {
    const route = `/api/covidapp/dropdown/dose`

    return this.dbConnector.getHttp(route, undefined, undefined).pipe(
      map((res: any) => {
        let doses = res[0].dose as string[];
        return doses
      })
    )
  }

  getVaccination(): Observable<Certificate[]> {
    const route = `/api/covidapp/vaccination`

    return this.dbConnector.getHttp(route, undefined, undefined).pipe(
      map((res: any) => {
        let vaccinations = res as Certificate[];
        return vaccinations
      })
    )
  }

  getVaccinationWithModerna(): Observable<Certificate[]> {
    const route = `/api/covidapp/type`

    return this.dbConnector.getHttp(route, undefined, undefined).pipe(
      map((res: any) => {
        let vaccinations = res as Certificate[];
        return vaccinations
      })
    )
  }

  getVaccinationLugano(): Observable<Certificate[]> {
    const route = `/api/covidapp/lugano`

    return this.dbConnector.getHttp(route, undefined, undefined).pipe(
      map((res: any) => {
        let vaccinations = res as Certificate[];
        return vaccinations
      })
    )
  }

  getUniqueManufacturers(): Observable<string[]> {
    const route = `/api/covidapp/manufacturers`

    return this.dbConnector.getHttp(route, undefined, undefined).pipe(
      map((res: any) => {
        let manufacturers = res as string[];
        return manufacturers
      })
    )
  }

  getPersons(): Observable<string[]> {
    const route = `/api/covidapp/person`

    return this.dbConnector.getHttp(route, undefined, undefined).pipe(
      map((res: any) => {
        let persons = res as string[];
        return persons
      })
    )
  }

  getPositiveTests(): Observable<Certificate[]> {
    const route = `/api/covidapp/positivetest`

    return this.dbConnector.getHttp(route, undefined, undefined).pipe(
      map(res => {
        let certifs = res as Certificate[];
        return certifs
      })
    )
  }

  getTestTypes(): Observable<string[]> {
    const route = `/api/covidapp/testtype`

    return this.dbConnector.getHttp(route, undefined, undefined).pipe(
      map((res: any) => {
        let testTypes = res as string[];
        return testTypes
      })
    )
  }

  postVaccination(data: VaccinationForm): Observable<Certificate> {
    const route = `/api/covidapp/vaccination`

    return this.dbConnector.postHttp(route, data, undefined).pipe(
      map(res => {
        let certif = res as Certificate;
        return certif
      })
    )
  }

  postTest(data: TestForm): Observable<Certificate> {
    const route = `/api/covidapp/test`

    return this.dbConnector.postHttp(route, data, undefined).pipe(
      map(res => {
        let certif = res as Certificate;
        return certif
      })
    )
  }

  putVaccination(data: AddVaccineForm): Observable<Certificate> {
    const route = '/api/covidapp/vaccination'

    return this.dbConnector.putHttp(route, data, undefined).pipe(
      map(res => {
        console.log(res)
        let certif = res as Certificate;
        return certif
      })
    )
  }
}
