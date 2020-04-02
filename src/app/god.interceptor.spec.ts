import { TestBed } from '@angular/core/testing';

import { GodInterceptor } from './god.interceptor';

describe('GodInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GodInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GodInterceptor = TestBed.inject(GodInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
