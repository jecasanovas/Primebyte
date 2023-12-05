import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Basket } from '../../Shared/Models/basket.interface';
import { ShopService } from '../../Shared/Services/shop.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  constructor(private shopService: ShopService, private router: Router) {}
  public obs$!: Observable<Basket[]>;
  public totalCourse: number = 0;
  public totalPaid: number = 0;
  ngOnInit(): void {
    this.obs$ = this.shopService.obsBasket$;
    this.shopService.basket.forEach((x) => {
      this.totalPaid += x.unit * x.price;
      this.totalCourse += x.unit;
    });
  }

  changeValue(e: any, i: number) {
    this.shopService.basket[i].unit = +e.value;
    this.totalPaid = 0;
    this.totalCourse = 0;
    //Calculate total Items
    this.shopService.basket.forEach((x) => {
      this.totalPaid += x.unit * x.price;
      this.totalCourse += x.unit;
    });
  }

  checkout() {
    this.router.navigateByUrl('ecommerce/checkout?id=1089');
  }
}
