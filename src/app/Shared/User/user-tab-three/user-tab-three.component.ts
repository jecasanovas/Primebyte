import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserinfoService } from '../../../Shared/Services/userinfo.service';
import { PaymentInfo } from '../../../Shared/Models/payment-info.interface';
import { UserTableThreeComponent } from '../user-table-three/user-table-three.component';

@Component({
  selector: 'app-user-tab-three',
  templateUrl: './user-tab-three.component.html',
  styleUrls: ['./user-tab-three.component.css'],
})
export class UserTabThreeComponent implements AfterViewInit {
  /*************Html Elements reference *****************/
  @ViewChild('table', { static: false }) table!: UserTableThreeComponent;

  /************* fields  ***************/
  private cssfloatTeacher = false;

  /******************* Data ****************************************************/

  public idSelected = 0;
  public imgShow: any;
  public orderColumns = ['', ''];
  public paymentInfo: PaymentInfo[] = [];

  public emptyFile = '../assets/no-image-icon.png';

  @Input()
  public showTable: boolean = true;

  @Input()
  showfield: boolean = true;

  constructor(
    private formbuilder: UntypedFormBuilder,
    private userService: UserinfoService,
    private toast: ToastrService
  ) {}
  ngAfterViewInit(): void {
    this.userService.obsPaymentInfo$.subscribe((result) => {
      this.paymentInfo = result?.data;
    });
  }

  public formPayments = this.formbuilder.group({
    name: ['', Validators.required],
    cardholdername: ['', Validators.required],
    cardnumber: ['', Validators.required],
    month: ['', Validators.required],
    year: ['', Validators.required],
    ccvcard: ['', Validators.required],
  });
  add() {
    this.resetForm();
  }
  resetForm() {
    this.idSelected = 0;
    this.formPayments.reset();
    this.formPayments.markAsPristine();
    this.formPayments.markAsUntouched();
  }

  editPayment(e: number) {
    this.resetForm();
    const id = +e;
    this.idSelected = id;
    this.userService.idpayment = this.idSelected;
    this.formPayments.markAllAsTouched();
    const payment = this.paymentInfo.find((x) => x.id === id);
    if (payment) {
      this.formPayments.get('name')?.setValue(payment.name);
      this.formPayments.get('cardholdername')?.setValue(payment.cardHolderName);
      this.formPayments.get('cardnumber')?.setValue(payment.cardNumber);
      this.formPayments.get('month')?.setValue(payment.monthExp);
      this.formPayments.get('year')?.setValue(payment.yearExp);
      this.formPayments.get('ccvcard')?.setValue(payment.ccv);
    }
  }

  deletePayment(e: any) {
    this.userService.deleteAddress(e).subscribe({
      complete: () => {
        this.toast.success('Deleted!');
        this.resetForm();
        this.table.changePage(this.table.activePage);
      },
    });
  }
  onSubmit() {
    this.formPayments.markAllAsTouched();
    if (!this.formPayments.valid) {
      return;
    }

    const paymentinfo: PaymentInfo = {
      id: this.idSelected,
      userInfoId: this.userService.idUser,
      cardHolderName: this.formPayments.get('cardholdername')?.value,
      cardNumber: this.formPayments.get('cardnumber')?.value,
      monthExp: this.formPayments.get('month')?.value,
      yearExp: this.formPayments.get('year')?.value,
      name: this.formPayments.get('name')?.value,
      ccv: this.formPayments.get('ccvcard')?.value,
    };
    this.userService.saveInfoPayments(paymentinfo).subscribe({
      complete: () => {
        this.resetForm();
        this.table.changePage(this.table.activePage);
        this.toast.success('saved!');
      },
    });
  }
}
