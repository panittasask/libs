import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-template-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngTemplateOutlet="template; context: context"></ng-container>
  `,
})
export class ModalTemplateWrapperComponent {
  // รับ TemplateRef เข้ามา
  template!: TemplateRef<any>;

  // รับ data (initialState) เข้ามา
  context: any = {};
}
