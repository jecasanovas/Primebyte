import { Component, OnInit, ViewChild } from '@angular/core';
import { UserinfoService } from '../../Shared/Services/userinfo.service';
import { CheckoutTab3Component } from '../checkout-tab3/checkout-tab3.component';

@Component({
  selector: 'app-checkout-tab',
  templateUrl: './checkout-tab.component.html',
  styleUrls: ['./checkout-tab.component.css'],
})
export class CheckoutTabComponent {
  @ViewChild('tab3', { static: true }) checkout!: CheckoutTab3Component;

  constructor(private userInfo: UserinfoService) {}

  selectTab(e: number): void {
    this.checkout.address.editAddress(this.userInfo.idAddress);
    this.checkout.payments.editPayment(this.userInfo.idpayment);
  }
}
