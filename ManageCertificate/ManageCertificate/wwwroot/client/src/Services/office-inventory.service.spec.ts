import { TestBed } from '@angular/core/testing';

import { OfficeInventoryService } from './office-inventory.service';

describe('OfficeInventoryService', () => {
  let service: OfficeInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
