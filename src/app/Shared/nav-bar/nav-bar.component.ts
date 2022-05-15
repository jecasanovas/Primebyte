import { outputAst } from '@angular/compiler';
import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { map, Observable, reduce, scan } from 'rxjs';
import { ShopService } from '../Services/shop.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input()
  searchVisible = false;


  @Output()
  filterbyName$ = new EventEmitter();


  constructor(public shopService: ShopService) {
  }

  public obs$ = this.shopService.obsBasket$;
  public totalItems: number = 0;
  public show:boolean = false;
  public collapse:boolean = false;

  ngOnInit() {
    this.obs$
      .pipe(
        map((x) => {
          this.totalItems = 0;
          x.forEach((x) => (this.totalItems += x.unit));
          return this.totalItems;
        })
      )
      .subscribe();
  }
  filterByNameSearch(value: string) {
      this.filterbyName$.emit(value);
  }
}
