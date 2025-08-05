import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() show: boolean = false;
  @Input() title: string = '';
  @Output() onClose = new EventEmitter<void>();

  closeModal(): void {
    this.onClose.emit();
  }
}
