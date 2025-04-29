import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequestesComponent } from './all-requestes.component';

describe('AllRequestesComponent', () => {
  let component: AllRequestesComponent;
  let fixture: ComponentFixture<AllRequestesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllRequestesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRequestesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
