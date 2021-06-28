import { TestBed } from '@angular/core/testing';
import { AudienceOverlapListenerService } from './audience-overlap-listener.service';

describe('AudienceOverlapListenerService', () => {
  let service: AudienceOverlapListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudienceOverlapListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
