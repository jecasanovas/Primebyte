import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/app/Shared/Services/data.service';
import { ToastrService } from 'ngx-toastr';

import { UserTableOneComponent } from '../../user-tab-1/components/user-table-one.component';
import { Addresses } from '../../../../Shared/Models/addresses.interface';
import { TypeOfAddress } from '../../../../Shared/Models/typeof-address.interface';
import { SelectInputComponent } from '../../../../Framework/select-input/select-input.component';
import { TextNgInputComponent } from '../../../../Framework/text-input/text-input.component';
import { UserTableTwoComponent } from './user-table-two.component';
import { Countries } from '../../../../Shared/Models/countries.interface';
import { UserinfoService } from '../../../../Shared/Services/userinfo.service';

@Component({
  selector: 'app-user-tab-two',
  templateUrl: './user-tab-two.component.html',
  styleUrls: ['./user-tab-two.component.css'],
})
export class UserTabTwoComponent implements AfterViewInit, OnInit {
  /*************Html Elements reference *****************/
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  @ViewChild('image', { static: false })
  image!: ElementRef;
  @ViewChild('table', { static: false })
  public table!: UserTableTwoComponent;

  @ViewChild('countryref', { static: false }) countryref!: SelectInputComponent;

  @ViewChild('typeofAddressref', { static: false })
  typeofAddressref!: SelectInputComponent;
  @ViewChild('typeofdocumentref', { static: false })
  typeofdocumentref!: SelectInputComponent;

  @ViewChild('descrption', { static: false })
  description!: TextNgInputComponent;
  /************* fields  ***************/
  private isloaded = false;
  countriesUser:Countries[] = [];
  /******************* Data ****************************************************/

  public idSelected = 0;
  public imgShow: any;
  public orderColumns = ['', ''];
  public addresses: Addresses[] = [];

  public emptyFile = '../assets/no-image-icon.png';

  @Input()
  public showTable: boolean = true;

  @Input()
  showfield: boolean = true;

  public typeofDirection: TypeOfAddress[] = [
    {
      id: '1',
      description: 'Local',
    },
    {
      id: '2',
      description: 'Billing',
    },
    {
      id: '3',
      description: 'Both',
    },
  ];

  public typeofDocument: any[] = [
    {
      id: '1',
      description: 'NIF',
    },
    {
      id: '2',
      description: 'NIE',
    },
    {
      id: '3',
      description: 'Passport',
    },
  ];
  constructor(
    private dataService: DataService,
    private formbuilder: UntypedFormBuilder,
    private userService: UserinfoService,
    private route: Router,
    private toast: ToastrService
  ) {}
  ngAfterViewInit(): void {
    this.userService.obstAddresses$.subscribe((result) => {
      this.addresses = result?.data;
    });
  }

  public formAddresses = this.formbuilder.group({
    direction: ['', Validators.required],
    typeofdirection: ['', Validators.required],
    cp: ['', Validators.required],
    description: [''],
    telephone: ['', Validators.required],
    country: ['', Validators.required],
    typeofdocument: [''],
    document: [''],
  });

  ngOnInit(): void {
    this.dataService.getCountries().subscribe({
      next: (countries) => {
        this.countriesUser = countries;
      },
    });
  }

  add() {
    this.description.input.nativeElement.focus();
    this.resetFormAddress();
  }
  resetFormAddress() {
    if (!this.isloaded) return;
    this.idSelected = 0;
    this.countryref.input.handleClearClick();
    this.typeofAddressref.input.handleClearClick();
    this.typeofdocumentref.input.handleClearClick();
    this.formAddresses.reset();
    this.formAddresses.markAsPristine();
    this.formAddresses.markAsUntouched();
  }
  checkFile(event: any) {
    const fileUpload = this.fileUpload.nativeElement;
    if (fileUpload.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.imgShow = (<FileReader>event.target).result;
      };
    }
    this.imgShow = null;
  }

  onReset() {
    this.route.navigateByUrl('/courses');
  }

  editAddress(e: number) {
    this.resetFormAddress();
    const id = +e;
    this.idSelected = id;
    this.formAddresses.markAllAsTouched();
    this.userService.idAddress = this.idSelected;
    const address = this.addresses.find((x) => x.id === id);
    if (address) {
      this.formAddresses.get('cp')?.setValue(address.cp);
      this.formAddresses.get('description')?.setValue(address.description);
      this.formAddresses.get('direction')?.setValue(address.direction);
      this.formAddresses.get('telephone')?.setValue(address.telephone);

      this.formAddresses.get('document')?.setValue(address.document);
      const country = this.countryref.input.itemsList.findItem(
        address.countryId
      );
      this.countryref.input.select(country);

      const typeadress = this.typeofAddressref.input.itemsList.findItem(
        address.typeOfDirection
      );
      this.typeofAddressref.input.select(typeadress);

      const typeofdocument = this.typeofdocumentref.input.itemsList.findItem(
        address.typeOfDocument
      );
      this.typeofdocumentref.input.select(typeofdocument);
    }
  }

  deleteAddress(e: any) {
    this.userService.deleteAddress(e).subscribe({
      complete: () => {
        this.toast.success('Deleted!');
        this.resetFormAddress();
        this.table.changePage(this.table.activePage);
      },
    });
  }
  onSubmit() {
    this.formAddresses.markAllAsTouched();

    if (!this.formAddresses.valid) {
      return;
    }

    const address: Addresses = {
      id: this.idSelected,
      userInfoId: this.userService.idUser,
      countryId: this.formAddresses.get('country')?.value,
      description: this.formAddresses.get('description')?.value,
      cp: this.formAddresses.get('cp')?.value,
      direction: this.formAddresses.get('direction')?.value,
      typeOfDirection: this.formAddresses.get('typeofdirection')?.value,
      telephone: this.formAddresses.get('telephone')?.value,
      typeOfDocument: this.formAddresses.get('typeofdocument')?.value,
      document: this.formAddresses.get('document')?.value,
    };
    this.userService.saveInfoAddresses(address).subscribe({
      next: (user) => {
        this.resetFormAddress();
        this.table.changePage(this.table.activePage);
        this.toast.success('saved!');
      },
    });
  }
}
