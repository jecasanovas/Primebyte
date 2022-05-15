import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket } from 'src/app/Shared/Models/basket.interface';


@Injectable({
  providedIn: 'root',
})
export class ShopService {
  public basket: Basket[] = [];
  public visible = true;
  private subjBasket$ = new BehaviorSubject<Basket[]>(this.basket);
  public obsBasket$ = this.subjBasket$.asObservable();

  constructor() {}

  addItem(basket: Basket): void {
    const index = this.basket.findIndex((x) => x.idCourse === basket.idCourse);

    if (index >= 0) {
      this.basket[index].unit = basket.unit;
    } else {
      this.basket.push(basket);
    }
    this.subjBasket$.next([...this.basket]);
  }
}
