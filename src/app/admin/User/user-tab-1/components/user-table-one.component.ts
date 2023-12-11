import {
  Component,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  AfterViewInit,
  Input,
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

import {
  debounceTime,
  fromEvent,
  Observable,
  Subject,
  Subscription,
  tap,
} from 'rxjs';

import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { UserinfoService } from '../../../../Shared/Services/userinfo.service';


@Component({
  selector: 'app-user-table-one',
  templateUrl: './user-table-one.component.html',
  styleUrls: ['./user-table-one.component.css'],
})
export class UserTableOneComponent implements OnInit, OnDestroy, AfterViewInit {
  public userData$ = this.userService.obstUsers$;

  @ViewChild('login', { static: false }) login!: ElementRef;
  @ViewChild('name', { static: false }) name!: ElementRef;
  @ViewChild('page', { static: false })
  paginator!: PaginationComponent;

  @Output()
  editUser$ = new EventEmitter<number>();

  @Output()
  deleteUser$ = new EventEmitter<number>();

  idSelected = 0;
  activePage = 1;
  pageSize = 7;
  idteacherfilter = 0;

  suscription: Subscription[] = [];
  orderColumns = new Array<string>(2);
  faIconorder0 = faArrowDownAZ as IconProp;
  faIconorder1 = faArrowDownAZ as IconProp;
  faIconTrash = faTrash as IconProp;
  faArrowRight = faArrowRight as IconProp;
  faArrowLeft = faArrowLeft as IconProp;
  obsserverDebounce: Observable<any>[] = [];

  constructor(public userService: UserinfoService) {}
  ngOnInit(): void {
    this.changePage(1);
  }
  ngOnDestroy(): void {
    this.suscription.forEach((x) => {
      x.unsubscribe;
    });
  }

  ngAfterViewInit(): void {
    const obs1$ = fromEvent(this.login.nativeElement, 'keyup').pipe(
      debounceTime(750)
    );

    const obs2$ = fromEvent(this.name.nativeElement, 'keyup').pipe(
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

    this.userData$ = this.userService.getUsers(
      this.activePage,
      this.pageSize,
      this.login?.nativeElement.value,
      this.name?.nativeElement.value,
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
      this.orderColumns[0] = '';
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

  editUser(e: any) {
    this.idSelected = e;
    this.userService.idUser = e;
    this.editUser$.emit(e);
  }

  deleteUser(e: any) {
    this.deleteUser$.emit(this.idSelected);
    this.refreshInfo();
  }

  refreshInfo(): void {
    if (this.activePage !== 1) {
      this.activePage = 1;
      this.paginator.selectPage(this.activePage);
    } else {
      this.changePage(this.activePage);
    }
  }
}
