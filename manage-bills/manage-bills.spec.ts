import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBills } from './manage-bills';

describe('ManageBills', () => {
  let component: ManageBills;
  let fixture: ComponentFixture<ManageBills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
