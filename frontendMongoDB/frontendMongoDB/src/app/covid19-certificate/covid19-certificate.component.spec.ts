import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19CertificateComponent } from './covid19-certificate.component';

describe('Covid19CertificateComponent', () => {
  let component: Covid19CertificateComponent;
  let fixture: ComponentFixture<Covid19CertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Covid19CertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19CertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
