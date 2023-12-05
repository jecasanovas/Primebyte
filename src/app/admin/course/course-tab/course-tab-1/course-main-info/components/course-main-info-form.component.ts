import { AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectInputComponent } from '../../../../../../Framework/select-input/select-input.component'
import { TextNgInputComponent } from '../../../../../../Framework/text-input/text-input.component';
import { Course } from '../../../../../../../app/Shared/Models/course.interface';
import { Teacher } from '../../../../../../../app/Shared/Models/teacher.interface';
import { TechnologyDetails } from '../../../../../../../app/Shared/Models/technology-details.interface';
import { Technology } from '../../../../../../../app/Shared/Models/tecnology.interface';
import { CourseService } from '../../../../../../Shared/Services/course.service';
import { DataService } from '../../../../../../../app/Shared/Services/data.service';

@Component({
  selector: 'app-course-main-info-form',
  templateUrl: './course-main-info-form.component.html',
  styleUrls: ['./course-main-info-form.component.css'],
})
export class CourseMainInfoFormComponent implements  OnInit {
  /*************Html Elements reference *****************/
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  @ViewChild('course', { static: false }) course!: TextNgInputComponent;

  @ViewChild('teacher', { static: false }) teacher!: SelectInputComponent;
  @ViewChild('technology', { static: false }) technology!: SelectInputComponent;
  @ViewChild('techdetails', { static: false })
  techdetails!: SelectInputComponent;
  @ViewChild('image', { static: false }) image!: ElementRef;

  /************* fields  ***************/
  @Input()
  actionValue!:String;

  @Input()
  courseValue!:number;


  /******************* Data ****************************************************/
  public TotalCourses = 0;
  public idSelected = 0;
  public imgShow: any;
  public CoursesInfo!: Course;
  public Teachers!: Teacher[];
  public Technology!: Technology[];
  public TechnologyDetail!: TechnologyDetails[];
  public TechnologyDetailAll!: TechnologyDetails[];
  public orderColumns = ['', ''];
  public idteacherfilter = 0;

  public emptyFile = '../assets/no-image-icon.png';

  public Form = this.formBuilder.group({
    Course: ['', Validators.required],
    Teacher: ['', Validators.required],
    Technology: ['',Validators.required],
    TechnologyDetail: ['', Validators.required],
    Url: ['', Validators.required],
  });

  constructor(
    private dataService: DataService,
    private formBuilder: UntypedFormBuilder,
    private courseService: CourseService,
    private route: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.courseService.getTeachersData().subscribe({
      next: (result) => (this.Teachers = result.data),
    });
    this.courseService.getTechnology().subscribe({
      next: (result) => (this.Technology = result),
    });
    this.courseService.getTechnologyDetail().subscribe({
      next: (result) => (this.TechnologyDetailAll = result),
    });

  }

  onClear() {
    this.techdetails.input.handleClearClick();
    this.TechnologyDetail = [];

  }
  resetForm() {
    this.idSelected = 0;
    this.courseService.IdCourse = 0;
    this.imgShow = null;
    if (this.teacher) {
      this.teacher.input.handleClearClick();
      this.teacher.cssfloatlabel = false;
    }
    if (this.technology) {
      this.technology.input.handleClearClick();
      this.technology.cssfloatlabel = false
      this.techdetails.cssfloatlabel = false;
      this.technology.cssfloatlabel = false;

    }
    if (this.fileUpload) this.fileUpload.nativeElement.value = '';

    this.Form.reset();


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
  changeTechnology(e: Technology) {

    if (e != undefined && e)
        this.onClear();
         this.TechnologyDetail = this.TechnologyDetailAll.filter(
      (x) => x.technologyId === e?.id
    );

  }
   onReset() {
    this.route.navigateByUrl('/courses');
  }

  deleteCourse(id: number) {
    this.dataService.deleteCourse(id).subscribe({
      complete: () => {
        this.toast.warning('Course deleted');
        this.resetForm();
      },
      error: () => this.toast.error('Can not be deleted'),
    });
  }

  editCourse(e: any) {
    const id = +e;
    this.resetForm();
    this.Form.markAllAsTouched();
    this.idSelected = id;
    this.fileUpload.nativeElement.value = '';
    const course = this.courseService.courseInfo.find((x) => x.id === id);
    if (!course) return;

    this.Form.get('id')?.setValue(course.id);
    this.Form.get('Course')?.setValue(course.name);
    const teacherSelect = this.teacher.input.itemsList.findItem(
      course.teacherId
    );

    this.teacher.input.select(teacherSelect);
    const technologySelect = this.technology.input.itemsList.findItem(
      course.technologyId
    );

    this.technology.input.select(technologySelect);

    this.TechnologyDetail = this.TechnologyDetailAll.filter((x) =>
        x.technologyId == course.technologyId

    );
    this.TechnologyDetail.forEach(x=> this.techdetails.input.itemsList.addItem(x));
    const technologyDetailsSelect = this.techdetails.input.itemsList.findItem (course.technologyDetailsId)
    this.techdetails.input.select(technologyDetailsSelect);
    this.Form.get('Url')?.setValue(course.url);
    this.imgShow = course.photo;
    this.courseService.IdCourse = e;

  }

  addCourse() {
    this.course.input.nativeElement.focus();
    this.resetForm();
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.Form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  onSubmit() {
    this.Form.markAllAsTouched();
    const fileUpload = this.fileUpload.nativeElement;
    if (!this.Form.valid && this.findInvalidControls().length > 0) {
      return;
    }
    const file = fileUpload.files[0];
    const formDataFile = new FormData();
    formDataFile.append('file', fileUpload);

    const course: Course = {
      id: this.idSelected,
      name: this.Form.get('Course')!.value,
      description: '',
      teacherId: this.Form.get('Teacher')!.value,
      url: this.Form.get('Url')!.value,
      technologyId: this.Form.get('Technology')!.value,
      technologyDetailsId: this.Form.get('TechnologyDetail')!.value,
      searchKeywords: '',
      photo: this.imgShow,
      formData: formDataFile,
      teacherName: this.teacher.input.element.innerText.replace('×', '').trim(),
    };

    this.courseService.saveInfoCourse(course).subscribe({
      next: (result) => {
        this.toast.success('Course saved');
      },
    });
  }
}
