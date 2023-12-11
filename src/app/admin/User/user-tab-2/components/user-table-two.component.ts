import {
  Component,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  faArrowUpAZ,
  faArrowDownAZ,
  faTrash,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { debounceTime, fromEvent, Observable, Subscription } from 'rxjs';

import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { UserinfoService } from '../../../../Shared/Services/userinfo.service';


@Component({
  selector: 'app-user-table-two',
  templateUrl: './user-table-two.component.html',
  styleUrls: ['./user-table-two.component.css'],
})
export class UserTableTwoComponent implements OnDestroy, AfterViewInit {
  public addressData$ = this.userService.obstAddresses$;

  @ViewChild('cpsearch', { static: false }) cpsearch!: ElementRef;
  @ViewChild('street', { static: false }) street!: ElementRef;
  @ViewChild('page', { static: false })
  public table!: PaginationComponent;

  @Output()
  editAddress$ = new EventEmitter<number>();

  @Output()
  deleteAddress$ = new EventEmitter<number>();

  idSelected = 0;
  activePage = 1;
  pageSize = 3;
  suscription: Subscription[] = [];

  //Order table
  orderColumns = new Array<string>(2);
  faIconorder0 = faArrowDownAZ as IconProp;
  faIconorder1 = faArrowDownAZ as IconProp;
  faIconTrash = faTrash as IconProp;
  faArrowRight = faArrowRight as IconProp;
  faArrowLeft = faArrowLeft as IconProp;
  obsserverDebounce: Observable<any>[] = [];

  constructor(public userService: UserinfoService) {}

  ngOnDestroy(): void {
    this.suscription.forEach((x) => {
      x.unsubscribe;
    });
  }

  ngAfterViewInit(): void {
    const obs1$ = fromEvent(this.cpsearch.nativeElement, 'keyup').pipe(
      debounceTime(750)
    );

    const obs2$ = fromEvent(this.street.nativeElement, 'keyup').pipe(
      debounceTime(750)
    );

    this.obsserverDebounce.push(obs1$);
    this.obsserverDebounce.push(obs2$);

    this.obsserverDebounce.forEach((x) =>
      this.suscription.push(
        x.subscribe({
          next: () => {
            this.refreshInfo();
          },
        })
      )
    );
  }

  changePage(e: any) {
    this.activePage = typeof e == 'number' ? e : !e.page ? 1 : e.page;
    this.pageSize = !e.itemsPerPage ? this.pageSize : e.itemsPerPage;

    this.addressData$ = this.userService.getAddress(
      this.userService.idUser,
      this.activePage,
      this.pageSize,
      this.cpsearch?.nativeElement.value,
      this.street?.nativeElement.value,
      this.orderColumns
    );
  }

  changeOrder(order: string) {
    const ordernum = parseInt(order);
    if (ordernum === 0) {
      this.orderColumns[1] = '';
      this.faIconorder1 = faArrowDownAZ as IconProp;

      if (this.faIconorder0 === faArrowDownAZ) {
        this.faIconorder0 = faArrowUpAZ as IconProp;
        this.orderColumns[0] = '0D';
      } else {
        this.faIconorder0 = faArrowDownAZ as IconProp;
        this.orderColumns[0] = '0A';
      }
    }
    if (ordernum === 1) {
      this.orderColumns[2] = '';
      this.faIconorder0 = faArrowDownAZ as IconProp;

      if (this.faIconorder1 === faArrowDownAZ) {
        this.faIconorder1 = faArrowUpAZ as IconProp;
        this.orderColumns[1] = '1D';
      } else {
        this.faIconorder1 = faArrowDownAZ as IconProp;
        this.orderColumns[1] = '1A';
      }
    }
    this.refreshInfo();
  }

  changePaginator(page: number) {
    this.table.selectPage(page);
  }

  editAddress(e: number) {
    this.idSelected = e;
    this.editAddress$.emit(e);
  }

  deleteAddress(e: number) {
    this.idSelected = e;
    this.deleteAddress$.emit(e);
  }
  public refreshInfo(): void {
    this.idSelected = 0;
    if (this.activePage !== 1) {
      this.activePage = 1;
      this.table.selectPage(this.activePage);
    } else {
      this.changePage(this.activePage);
    }
  }
}
