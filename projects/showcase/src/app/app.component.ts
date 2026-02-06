import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { modal_config, ModalLibsComponent, ModalLibsService } from 'libs';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalLibsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'showcase';
  private readonly modalService = inject(ModalLibsService);

  ngOnInit() {
    this.showModal();
  }
  showModal() {
    const config: modal_config = {
      backdrop: 'nope',
      initialState: {
        config: {
          name: 'form admin',
          view: 'solo',
        },
      },
    };
    const modal = this.modalService.show<AlertModalComponent>(
      AlertModalComponent,
      config,
    );

    const password = '1234567';
  }
}
