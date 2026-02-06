import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ModalLibsRef, ModalLibsService } from 'libs';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule, DropDownListModule],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss',
})
export class AlertModalComponent {
  config = {};
  progressBar: number = 0;
  parsingState: any = {};
  private readonly modalService = inject(ModalLibsService);
  uploading: boolean = false;
  itemData = [
    {
      value: '1',
      text: 'thai',
    },
    {
      value: '2',
      text: 'lao',
    },
    {
      value: '3',
      text: 'india',
    },

    {
      value: '4',
      text: 'english',
    },
  ];
  ngOnInit() {
    console.log('init', this.config);
  }
  hide() {
    this.modalService.hide();
  }
  manualUpload() {}
  onClickUpload() {
    this.uploading = true;
  }
  complete() {}
  onResumeUpload(e: any) {
    this.uploading = true;
  }
}
