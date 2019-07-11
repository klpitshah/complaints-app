import { TestBed, inject } from '@angular/core/testing';

import { WebService } from './websocket.service';

describe('WebService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebService]
    });
  });

  it('should be created', inject([WebService], (service: WebService) => {
    expect(service).toBeTruthy();
  }));
});
