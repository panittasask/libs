import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
    <div class="tooltip-container">
      {{ text }}
    </div>
  `,
  styles: [
    `
      .tooltip-container {
        background-color: #333;
        color: #fff;
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 12px;
        pointer-events: none;
        max-width: 200px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

        /* 3. เพิ่ม CSS Animation ตรงนี้แทน */
        opacity: 0; /* เริ่มต้นให้จางหาย */
        transform: scale(0.8); /* เริ่มต้นให้เล็กนิดนึง */
        /* สั่งให้เล่นทันทีที่ Component ถูกสร้าง (Overlay แปะลงจอ) */
        animation: tooltip-enter 150ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
      }

      /* 4. สร้าง Keyframes สำหรับขาเข้า */
      @keyframes tooltip-enter {
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // 5. ลบ property 'animations: [...]' ทิ้งไปเลยครับ
})
export class TooltipComponent {
  @Input() text: string = '';
}
