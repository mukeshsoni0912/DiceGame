import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceHomeComponent } from './dice-home.component';

describe('DiceHomeComponent', () => {
  let component: DiceHomeComponent;
  let fixture: ComponentFixture<DiceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
