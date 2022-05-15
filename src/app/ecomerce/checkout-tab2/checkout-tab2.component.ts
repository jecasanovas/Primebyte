import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserinfoService } from 'src/app/Shared/Services/userinfo.service';
import { UserTabThreeComponent } from 'src/app/Shared/User/user-tab-three/user-tab-three.component';

@Component({
  selector: 'app-checkout-tab2',
  templateUrl: './checkout-tab2.component.html',
  styleUrls: ['./checkout-tab2.component.css'],
})
export class CheckoutTab2Component implements AfterViewInit {
  @ViewChild('tab1', { static: true }) tabpayments!: UserTabThreeComponent;
  constructor(private userService: UserinfoService) {}

  ngAfterViewInit(): void {
    this.tabpayments.table.refreshInfo();
  }
}
