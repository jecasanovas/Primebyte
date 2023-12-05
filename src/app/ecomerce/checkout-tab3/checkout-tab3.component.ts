import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../../Shared/Models/basket.interface';
import { ShopService } from '../../Shared/Services/shop.service';
import { UserinfoService } from '../../Shared/Services/userinfo.service';
import { UserTabThreeComponent } from '../../Shared/User/user-tab-three/user-tab-three.component';
import { UserTabTwoComponent } from '../../Shared/User/user-tab-two/user-tab-two.component';

@Component({
  selector: 'app-checkout-tab3',
  templateUrl: './checkout-tab3.component.html',
  styleUrls: ['./checkout-tab3.component.css'],
})
export class CheckoutTab3Component implements OnInit {
  constructor(
    private shopService: ShopService,
    private userService: UserinfoService
  ) {}
  @ViewChild('tab2', { static: true }) public address!: UserTabTwoComponent;
  @ViewChild('tab3', { static: true }) public payments!: UserTabThreeComponent;

  public obs$!: Observable<Basket[]>;
  public totalCourse: number = 0;
  public totalPaid: number = 0;
  public email: string = '';
  public showTable: boolean = false;

  ngOnInit(): void {
    this.userService
      .getUsers(1, 1, '', '', [], this.userService.idUser)
      .subscribe({
        next: (result) => {
          this.email = result.data[0].email;
        },
      });

    this.obs$ = this.shopService.obsBasket$;
    this.shopService.basket.forEach((x) => {
      this.totalPaid += x.unit * x.price;
      this.totalCourse += x.unit;
    });
  }
}
