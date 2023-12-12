import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../../Shared/Models/basket.model';
import { ShopService } from '../../Shared/Services/shop.service';
import { UserinfoService } from '../../Shared/Services/userinfo.service';


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
