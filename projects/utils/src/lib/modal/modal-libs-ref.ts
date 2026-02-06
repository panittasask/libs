import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class ModalLibsRef<T = any> {
  private overlayRef: OverlayRef | null;
  onHide = new Subject<unknown>();
  onHidden = new Subject<unknown>();
  onSubmit = new Subject<unknown>();

  content?: T;

  constructor(overlayRef: OverlayRef) {
    this.overlayRef = overlayRef;
    this.overlayRef.backdropClick().subscribe(() => {
      if ((this.content as any)?.backdrop === 'static' ? false : true)
        this.hide();
    });
  }

  hide() {
    this.onHide.next(false);

    this.overlayRef?.dispose();

    this.onHidden.next(false);
    this.overlayRef = null;
  }
  submit() {
    this.onSubmit.next(true);
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  setClass(newClass: string) {
    this.overlayRef?.addPanelClass(newClass);
  }
}
