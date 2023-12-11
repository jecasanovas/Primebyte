import {
  Component,
} from '@angular/core';
import { UserinfoService } from '../../Shared/Services/userinfo.service';

@Component({
  selector: 'app-checkout-tab2',
  templateUrl: './checkout-tab2.component.html',
  styleUrls: ['./checkout-tab2.component.css'],
})
export class CheckoutTab2Component  {
  constructor(private userService: UserinfoService) {}


}
