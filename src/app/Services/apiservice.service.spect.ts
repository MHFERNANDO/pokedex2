import { TestBed } from '@angular/core/testing';

import { PokeapiService } from './apiservice.service';

describe('APIServiceService', () => {
  let service: PokeapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
