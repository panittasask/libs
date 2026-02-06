import {
  ApplicationRef,
  ComponentRef,
  inject,
  Injectable,
  Injector,
  NgZone,
  TemplateRef,
} from '@angular/core';
import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalLibsComponent } from './modal-libs.component';
import { modal_config } from './modal-config';
import { ModalLibsRef } from './modal-libs-ref';
import { ModalTemplateWrapperComponent } from './ModalTemplateWrapperComponent';
@Injectable({
  providedIn: 'root',
})
export class ModalLibsService {
  constructor() {}
  private appRef = inject(ApplicationRef);
  private readonly zone = inject(NgZone);
  public config: any = {};
  private activeModal?: ModalLibsRef<any>[] = [];
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);
  show<T>(
    componentTemplate: ComponentType<T> | TemplateRef<T>,
    config?: modal_config,
  ): ModalLibsRef<T> {
    return this.zone.run(() => {
      if (componentTemplate instanceof TemplateRef) {
        return this.show(ModalTemplateWrapperComponent, {
          ...config,
          initialState: {
            template: componentTemplate,
            context: config?.initialState || {},
          },
        }) as unknown as ModalLibsRef<T>;
      }
      const component = componentTemplate as ComponentType<T>;
      this.config = config;
      const positionStrategy = this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();

      const splitClass = config?.class?.split(' ') ?? [];
      const cssClass = ['modal-content', ...splitClass];

      const overlayConfig = new OverlayConfig({
        hasBackdrop: config?.hasBackdrop ?? true,
        backdropClass:
          config?.backdropClass?.split(' ') ?? 'cdk-overlay-dark-backdrop',
        panelClass: cssClass?.length > 0 ? cssClass : 'modal-content',
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy,
      });
      const overlayRef = this.overlay.create(overlayConfig);

      const modalRef = new ModalLibsRef<T>(overlayRef);

      this.activeModal?.push(modalRef);

      const originalHide = modalRef.hide.bind(modalRef);

      modalRef.hide = () => {
        const overlayPane = overlayRef.overlayElement;

        if (overlayPane) {
          // ป้องกัน User กดซ้ำระหว่าง Animation
          overlayPane.style.pointerEvents = 'none';

          // สั่ง Animation ขาออก (ย้อนกลับขาเข้า)
          overlayPane.style.transform = 'translateY(50px)'; // เลื่อนลงนิดนึง
          overlayPane.style.opacity = '0'; // จางหายไป

          // (Transition ถูก set ไว้แล้วตอนขาเข้าคือ 0.4s ไม่ต้อง set ใหม่)

          // 3. รอให้ Animation เล่นจบ (400ms) แล้วค่อยสั่ง Dispose จริง
          setTimeout(() => {
            originalHide(); // เรียกฟังก์ชันเดิมเพื่อทำลาย Overlay
          }, 200); // เวลาต้องตรงกับ transition (0.4s = 400ms)
        } else {
          // ถ้าหา Element ไม่เจอ ให้ปิดไปเลยทันที
          originalHide();
        }
      };

      const injector = Injector.create({
        parent: this.injector,
        providers: [{ provide: ModalLibsRef, useValue: modalRef }],
      });

      const portal = new ComponentPortal(component, null, injector);
      if (config?.backdrop === 'static') {
        config.initialState = {
          ...(config.initialState || {}),
          backdrop: 'static',
        };
      }
      const componentRef = overlayRef.attach(portal);
      if (config?.initialState) {
        Object.assign(componentRef.instance as object, config?.initialState);
      }
      modalRef.content = componentRef.instance;

      this.appRef.attachView(componentRef.hostView);
      overlayRef.detachments().subscribe(() => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      });
      componentRef.changeDetectorRef.detectChanges();
      const overlayPane = overlayRef.overlayElement;

      if (overlayPane) {
        overlayPane.style.transform = 'translateY(50px)';
        overlayPane.style.opacity = '0';
        // const initialHeight = overlayPane.offsetHeight;
        // const initialWidth = overlayPane.offsetWidth;

        // overlayPane.style.minHeight = `${initialHeight}px`;
        // overlayPane.style.minWidth = `${initialWidth}px`;

        // ตั้งค่าเริ่มต้นให้ modal อยู่ด้านล่าง

        void overlayPane.offsetWidth;

        // ให้ modal ลอยขึ้นมาและค่อยๆปรากฏ

        requestAnimationFrame(() => {
          overlayPane.style.transition =
            'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease-out, min-height 0.3s ease-out';
          requestAnimationFrame(() => {
            overlayPane.style.transform = 'translateY(0)';
            overlayPane.style.opacity = '1';
          });
        });
      }
      return modalRef;
    });
  }
  hide() {
    this.activeModal?.[this.activeModal.length - 1].hide();
  }
  closeAllModal() {
    [...(this.activeModal as any)].forEach((modal) => modal?.hide());
  }
  showDefault() {
    this.show(ModalLibsComponent);
  }
}
