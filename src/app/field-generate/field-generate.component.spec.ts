import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGenerateComponent } from './field-generate.component';

describe('FieldGenerateComponent', () => {
  let component: FieldGenerateComponent;
  let fixture: ComponentFixture<FieldGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldGenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
