import { TestBed } from '@angular/core/testing';

import { ChemistService } from './chemist.service';

describe('ChemistService', () => {
  let service: ChemistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChemistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
