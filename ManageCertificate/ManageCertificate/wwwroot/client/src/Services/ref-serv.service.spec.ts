import { TestBed } from '@angular/core/testing';

import { RefServService } from './ref-serv.service';

describe('RefServService', () => {
  let service: RefServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
