import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissiontableComponent } from './admissiontable.component';

describe('AdmissiontableComponent', () => {
  let component: AdmissiontableComponent;
  let fixture: ComponentFixture<AdmissiontableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissiontableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissiontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
