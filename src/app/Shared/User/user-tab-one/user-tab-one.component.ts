import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Data, Router } from '@angular/router';
import { UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../Services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Countries } from '../../../Shared/Models/countries.interface';
import { UserInfo } from '../../../Shared/Models/user-info.interface';
import { UserTableOneComponent } from '../user-table-one/user-table-one.component';
import { SelectInputComponent } from 'src/app/Framework/select-input/select-input.component';
import { TextNgInputComponent } from 'src/app/Framework/text-input/text-input.component';
import { UserinfoService } from 'src/app/Shared/Services/userinfo.service';

@Component({
  selector: 'app-user-tab-one',
  templateUrl: './user-tab-one.component.html',
  styleUrls: ['./user-tab-one.component.css'],
})
export class UserTabOneComponent implements OnInit, AfterViewInit {
  /*************Html Elements reference *****************/
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  @ViewChild('image', { static: false }) image!: ElementRef;
  @ViewChild('table', { static: false }) table!: UserTableOneComponent;
  /************* fields  ***************/
  @ViewChild('countryRef', { static: false }) countryRef!: SelectInputComponent;

  @ViewChild('roleRef', { static: false }) roleRef!: SelectInputComponent;

  @ViewChild('email', { static: false }) email!: TextNgInputComponent;

  @Input()
  public showTable: boolean = true;

  @Input()
  showfield: boolean = true;

  private cssfloatTeacher = false;
  countriesUser: Countries[] = [];
  /******************* Data ****************************************************/

  public idSelected = 0;
  public imgShow: any;
  public orderColumns = ['', ''];
  public idteacherfilter = 0;
  public users: UserInfo[] = [];

  public emptyFile = '../assets/no-image-icon.png';
  public Roles: any[] = [
    {
      id: 'Admin',
      description: 'Admin User',
    },
    {
      id: 'Visitor',
      description: 'Visitor User',
    },
    {
      id: 'Standard',
      description: 'Standard User',
    },
    {
      id: 'Avanced',
      description: 'Avanced User',
    },
  ];
  constructor(
    private formbuilder: UntypedFormBuilder,
    private userService: UserinfoService,
    private route: Router,
    private toast: ToastrService,
    private dataservice: DataService
  ) {}
  ngAfterViewInit(): void {
    this.userService.obstUsers$.subscribe(
      (result) => (this.users = result?.data)
    );
  }

  public formUser = this.formbuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    role: ['', Validators.required],
    password: ['', Validators.required],
    country: ['', Validators.required],
    description: ['', Validators.required],
    telephone: [''],
  });

  addUser() {
    this.resetformUser();
    this.table.idSelected = 0;
    this.email.input.nativeElement.focus();
  }
  changeRole(role: any) {
    this.formUser.get('role')?.setValue(role.id);
  }
  ngOnInit(): void {
    this.dataservice.getCountries().subscribe({
      next: (countries) => {
        this.countriesUser = countries;
      },
    });
  }

  resetformUser() {
    this.formUser.reset();
    this.idSelected = 0;
    this.imgShow = null;
    // this.fileUpload.nativeElement.value = '';
    this.formUser.markAsPristine();
    this.formUser.markAsUntouched();
    this.image.nativeElement.focus();
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

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      complete: () => {
        this.toast.warning('Course deleted');
        this.resetformUser();
      },
      error: () => this.toast.error('Can not be deleted'),
    });
  }

  editUser(e: any) {
    this.resetformUser();
    const id = +e;
    this.idSelected = id;
    this.formUser.markAllAsTouched();
    this.userService.idUser = e;
    const user = this.users.find((x) => x.id === id);
    if (user) {
      this.formUser.get('name')?.setValue(user.name);
      this.formUser.get('surname')?.setValue(user.surname);
      this.formUser.get('email')?.setValue(user.email);
      if (this.showfield) {
        this.formUser.get('telephone')?.setValue(user.telephone);

        this.formUser.get('country')?.setValue(user.countryId);
        this.formUser.get('password')?.setValue(user.password);
        this.formUser.get('description')?.setValue(user.description);
        const country = this.countryRef.input.itemsList.findItem(
          user.countryId
        );
        this.countryRef.input.select(country);

        const roler = this.roleRef.input.itemsList.findItem(user.role);
        this.roleRef.input.select(roler);
      }
      this.imgShow = user.photo;
    }
  }

  onSubmit() {
    this.formUser.markAllAsTouched();

    if (!this.formUser.valid) {
      return;
    }

    const fileUpload = this.fileUpload.nativeElement;

    const file = fileUpload?.files[0];

    let formDataFile = new FormData();
    if (file) {
      formDataFile.append('file', file);
    }

    const User: UserInfo = {
      id: this.idSelected,
      name: this.formUser.get('name')?.value,
      surname: this.formUser.get('surname')?.value,
      telephone: this.formUser.get('telephone')?.value,
      email: this.formUser.get('email')?.value,
      countryId: this.formUser.get('country')?.value,
      role: this.formUser.get('role')?.value,
      password: this.formUser.get('password')?.value,
      doubleFactor: false,
      description: this.formUser.get('description')?.value,
      userPhoto: file ? formDataFile : undefined,
    };
    this.userService.saveInfoUser(User).subscribe({
      next: (user) => {
        this.table.changePage(this.table.activePage);
        this.toast.success('saved!');
        this.userService.idUser = user.id;
      },
    });
  }
}
