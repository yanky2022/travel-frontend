import { TestBed } from '@angular/core/testing';

import { ClientTravelService } from './client-travel.service';

describe('ClientTravelService', () => {
  let service: ClientTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
