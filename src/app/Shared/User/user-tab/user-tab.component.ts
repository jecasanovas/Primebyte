import { Component, ViewChild } from '@angular/core';
import { UserinfoService } from '../../../Shared/Services/userinfo.service';
import { UserTabThreeComponent } from '../user-tab-three/user-tab-three.component';
import { UserTabTwoComponent } from '../user-tab-two/user-tab-two.component';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css'],
})
export class UserTabComponent {
  constructor(private userService: UserinfoService) {}
  @ViewChild('addresstab', { static: false }) addresstab!: UserTabTwoComponent;
  @ViewChild('paymentinfotab', { static: false })
  paymentinfotab!: UserTabThreeComponent;
  selectTab(e: number) {
    const activePage = 1;
    if (e === 1) {
      this.addresstab.table.changePage(activePage);
    } else if (e === 2) {
      this.paymentinfotab.table.changePage(activePage);
    }
  }
}
