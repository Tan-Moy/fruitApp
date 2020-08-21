import { TestBed } from '@angular/core/testing';

import { TruevaultService } from './truevault.service';

describe('TruevaultService', () => {
  let service: TruevaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TruevaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
