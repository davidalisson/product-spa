import { TestBed } from '@angular/core/testing';

import { ResolverProductResolver } from './resolver-product.resolver';

describe('ResolverProductResolver', () => {
  let resolver: ResolverProductResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResolverProductResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
