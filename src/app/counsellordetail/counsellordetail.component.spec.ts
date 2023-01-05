import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounsellordetailComponent } from './counsellordetail.component';

describe('CounsellordetailComponent', () => {
  let component: CounsellordetailComponent;
  let fixture: ComponentFixture<CounsellordetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounsellordetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounsellordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
