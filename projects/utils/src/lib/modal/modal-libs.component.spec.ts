import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLibsComponent } from './modal-libs.component';

describe('ModalLibsComponent', () => {
  let component: ModalLibsComponent;
  let fixture: ComponentFixture<ModalLibsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalLibsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLibsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
