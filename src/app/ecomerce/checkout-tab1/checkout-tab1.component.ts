import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, map } from 'rxjs';



@Component({
  selector: 'app-checkout-tab1',
  templateUrl: './checkout-tab1.component.html',
  styleUrls: ['./checkout-tab1.component.css'],
})
export class CheckoutTab1Component  {
  idUser = 0;
  constructor(
    private route: ActivatedRoute
  ) {}


}
