import { TestBed } from '@angular/core/testing';

import { ColorUpdateService } from './color-update.service';

describe('ColorUpdateService', () => {
  let service: ColorUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
