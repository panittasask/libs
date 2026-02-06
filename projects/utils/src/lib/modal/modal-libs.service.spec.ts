import { TestBed } from '@angular/core/testing';

import { ModalLibsService } from './modal-libs.service';

describe('ModalLibsService', () => {
  let service: ModalLibsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalLibsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
