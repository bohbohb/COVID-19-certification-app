import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCovid19CertifComponent } from './form-covid19-certif.component';

describe('FormCovid19CertifComponent', () => {
  let component: FormCovid19CertifComponent;
  let fixture: ComponentFixture<FormCovid19CertifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCovid19CertifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCovid19CertifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
