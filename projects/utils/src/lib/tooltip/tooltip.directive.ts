import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ComponentRef,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from './tooltip.component';

@Directive({
  standalone: true,
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') text: string = ''; // รับค่าข้อความ
  private overlayRef: OverlayRef | null = null;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
  ) {}

  @HostListener('mouseenter')
  show() {
    // ป้องกันการสร้างซ้ำ
    if (this.overlayRef) return;

    // 1. Config Position Strategy (พระเอกของงาน)
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef) // ยึดติดกับ Element ที่เรียกใช้
      .withPositions([
        // ลำดับความสำคัญ: บน -> ล่าง -> ขวา -> ซ้าย
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8, // เว้นระยะห่างนิดนึง
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8,
        },
        // เพิ่มซ้าย/ขวาตามต้องการ
      ]);

    // 2. Create Overlay
    this.overlayRef = this.overlay.create({ positionStrategy });

    // 3. Attach Component
    const tooltipPortal = new ComponentPortal(TooltipComponent);
    const tooltipRef: ComponentRef<TooltipComponent> =
      this.overlayRef.attach(tooltipPortal);

    // 4. Pass Data
    tooltipRef.instance.text = this.text;
  }

  @HostListener('mouseleave')
  hide() {
    if (this.overlayRef) {
      this.overlayRef.dispose(); // ทำลายทิ้งทันทีเมื่อเมาส์ออก
      this.overlayRef = null;
    }
  }

  ngOnDestroy() {
    // Cleanup เมื่อ Component หลักถูกทำลาย (กัน Memory Leak)
    this.hide();
  }
}
