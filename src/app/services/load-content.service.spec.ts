import { TestBed } from '@angular/core/testing';

import { LoadContentService } from './load-content.service';

describe('LoadContentService', () => {
  let service: LoadContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
