import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceGraphComponent } from './audience-graph.component';

describe('AudienceGraphComponent', () => {
  let component: AudienceGraphComponent;
  let fixture: ComponentFixture<AudienceGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudienceGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
