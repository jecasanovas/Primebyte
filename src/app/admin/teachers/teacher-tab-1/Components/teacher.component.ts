import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../../Shared/Services/data.service';
import { ToastrService } from 'ngx-toastr';
import { SelectInputComponent } from '../../../../Framework/select-input/select-input.component';
import { Observable } from 'rxjs';
import { TextNgInputComponent } from '../../../../Framework/text-input/text-input.component';
import { Countries } from '../../../../Shared/Models/countries.model';
import { Teacher } from '../../../../Shared/Models/teacher.model';
import {
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  @ViewChild('select', { static: false }) select!: SelectInputComponent;
  @ViewChild('teacher', { static: false }) teacher!: TextNgInputComponent;
  faIconTrash = faTrash as IconProp;
  Countries: Countries[] = [];
  activePage = 1;
  pageSize = 6;
  totalRows: number = 0;
  Teachers!: Teacher[];
  imageShow!: any;
  idSelected: number = 0;

  finish: boolean = false;
  emptyFile = '../assets/no-image-icon.png';
  urlphoto: string = '';
  downloadURL!: Observable<string>;

  constructor(
    private dataService: DataService,
    private formBuilder: UntypedFormBuilder,
    private toast: ToastrService
  ) {}

  public Form = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    country: ['', Validators.required],
    site: ['', Validators.required],
    social: ['', Validators.required]

  });

  getCountries() {
    this.dataService
      .getCountries()
      .subscribe(result => (this.Countries = result));
  }

  ngOnInit(): void {
    this.activePage = 1;
    this.changePage(this.activePage);
    this.getCountries();
  }



  checkFile($event: any) {
    const fileUpload = this.fileUpload.nativeElement;

    if (fileUpload.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]);
      reader.onload = (event) => {
        this.imageShow = (<FileReader>event.target).result;
      };
    }
    this.imageShow = null;
  }

  resetForm() {
    this.imageShow = this.emptyFile;
    this.fileUpload.nativeElement.value = '';
    this.idSelected = 0;
    this.Form.reset();

  }

  createNew() {
    this.resetForm();
    this.teacher.input.nativeElement.focus();
    this.Form.markAsUntouched();
  }
  editTeacher(id: number) {
    this.resetForm();
    this.idSelected = id;
    const teacher: Teacher[] = this.Teachers.filter((x) => x.id === +id);

    if (!teacher) return;

    this.dataService.Teacher = teacher[0];

    this.Form.get('name')?.setValue(teacher[0].name);
    this.Form.get('surname')?.setValue(teacher[0].surname);

    const optionselect = this.select.input.itemsList.findItem(
      teacher[0].countryId
    );
    this.select.input.select(optionselect);
    this.Form.get('site')?.setValue(teacher[0].urlSite);
    this.Form.get('social')?.setValue(teacher[0].urlSocial);
    this.imageShow = teacher[0].photo;
  }
  deleteTeacher(id: number) {
    const obsteacher$: Observable<any> = this.dataService.deleteTeacher(id);
    obsteacher$.subscribe({
      error:() => {
         this.toast.error('Teacher is in use'); 
      },
      complete: () =>  {
        this.toast.error("Teacher deleted");
        this.resetForm();
        this.changePage(this.activePage);
      }
    });
  }

  changePage(e: any) {
    this.Teachers = [];
    this.activePage = !e.page ? this.activePage : e.page;
    this.dataService
      .getTeachersData(this.activePage, this.pageSize)
      .subscribe((result) => {
        this.Teachers = result.data;
        this.totalRows = result.count;
      });
  }

  onSubmit() {
    this.Form.markAllAsTouched();
    let formDataFile!: FormData;
    const fileUpload = this.fileUpload.nativeElement;
    const file = fileUpload.files[0];
    if (fileUpload.files.length > 0) {
      formDataFile = new FormData();
      formDataFile.append('file', file);
    }
    const teacher: Teacher = {
      id: this.idSelected,
      name: this.Form.get('name')!.value,
      surname: this.Form.get('surname')!.value,
      countryId: this.Form.get('country')?.value,
      urlSite: this.Form.get('site')?.value,
      urlSocial: this.Form.get('social')?.value,
      photo:this.imageShow,
      description: '',
      formData: formDataFile,
    };

    if (!this.Form.valid) return

    this.dataService.saveInfoTeacher(teacher).subscribe({
      next: (response: Teacher) => {
        debugger;
        this.imageShow = response.photo;
        this.idSelected = response.id;
      },
      error: () => this.toast.error('Error Saving'),
      complete:() => {
        debugger;
        this.toast.success('Teacher Saved');
        this.changePage(this.activePage);
      }
    });
  }
}
