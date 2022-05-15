import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, map } from 'rxjs';
import { UserinfoService } from 'src/app/Shared/Services/userinfo.service';
import { UserTabOneComponent } from 'src/app/Shared/User/user-tab-one/user-tab-one.component';
import { UserTabTwoComponent } from 'src/app/Shared/User/user-tab-two/user-tab-two.component';


@Component({
  selector: 'app-checkout-tab1',
  templateUrl: './checkout-tab1.component.html',
  styleUrls: ['./checkout-tab1.component.css'],
})
export class CheckoutTab1Component implements AfterViewInit {
  idUser = 0;
  constructor(
    private userService: UserinfoService,
    private route: ActivatedRoute
  ) {}
  @ViewChild('tab1', { static: false }) tabusers!: UserTabOneComponent;
  @ViewChild('tab2', { static: false }) tabaddress!: UserTabTwoComponent;
  ngAfterViewInit(): void {
    this.route.queryParamMap
      .pipe(
        map((x) => x.get('id')),
        exhaustMap((res) =>
          this.userService.getUsers(1, 1, '', '', [], +(res ?? '0'))
        )
      )
      .subscribe((result) => {
        this.idUser = result.data[0].id;
        this.tabusers.editUser(this.idUser);
        this.userService.idUser = this.idUser;
        this.tabaddress.table.changePage(1);
      });
  }
}
