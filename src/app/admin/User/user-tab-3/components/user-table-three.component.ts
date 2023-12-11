import {
  Component,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
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
  selector: 'app-user-table-three',
  templateUrl: './user-table-three.component.html',
  styleUrls: ['./user-table-three.component.css'],
})
export class UserTableThreeComponent implements OnDestroy, AfterViewInit {
  public paymentInfoObs$ = this.userService.obsPaymentInfo$;

  @ViewChild('namecard', { static: false }) namecard!: ElementRef;
  @ViewChild('cardholder', { static: false }) cardholder!: ElementRef;

  @ViewChild('table', { static: false })
  public paginator!: PaginationComponent;

  @Output()
  editPayment$ = new EventEmitter<number>();

  @Output()
  deletePayment$ = new EventEmitter<number>();

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
    const obs1$ = fromEvent(this.namecard.nativeElement, 'keyup').pipe(
      debounceTime(750)
    );

    const obs2$ = fromEvent(this.cardholder.nativeElement, 'keyup').pipe(
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

    this.paymentInfoObs$ = this.userService.getPaymentInfo(
      this.userService.idUser,
      this.activePage,
      this.pageSize,
      '',
      '',
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
    this.paginator.selectPage(page);
  }

  editPayment(e: number) {
    this.idSelected = e;
    this.editPayment$.emit(e);
  }

  deletePayment(e: number) {
    this.idSelected = e;
    this.deletePayment$.emit(e);
  }
  refreshInfo(): void {
    this.idSelected = 0;
    if (this.activePage !== 1) {
      this.activePage = 1;
      this.paginator.selectPage(this.activePage);
    } else {
      this.changePage(this.activePage);
    }
  }
}
