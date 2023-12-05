import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { DataService } from '../../../Shared/Services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  modalRef?: BsModalRef;
  message?: string;
  @ViewChild('tabset') tabset!: TabsetComponent;

  constructor(
    private modalService: BsModalService,
    private dataService: DataService
  ) {}

  description: string = '';

  changeTab(e: number): void {
    if (e > 0) {
      this.description = this.dataService.Teacher?.description ?? '';
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
  }
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  change(tab: number) {}
}
