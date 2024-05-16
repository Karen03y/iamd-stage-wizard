import { TestBed } from '@angular/core/testing';

import { FontUpdateService } from './font-update.service';

describe('FontUpdateService', () => {
  let service: FontUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
