import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 

import { LoadContentService } from './load-content.service';

describe('LoadContentService', () => {
  let service: LoadContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule] 
    });
    service = TestBed.inject(LoadContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
