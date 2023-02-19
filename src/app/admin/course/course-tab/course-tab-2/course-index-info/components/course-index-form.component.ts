import { Component, DoCheck, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Form, UntypedFormBuilder, Validators } from '@angular/forms';
import * as saveAs from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { CourseDetail } from 'src/app/Shared/Models/course-detail.interface';
import { CourseService } from 'src/app/Shared/Services/course.service';
import { DataService } from 'src/app/Shared/Services/data.service';
import { CourseIndexTableComponent } from './course-index-table.component';


@Component({
  selector: 'app-course-index-form',
  templateUrl: './course-index-form.component.html',
  styleUrls: ['./course-index-form.component.css'],
  })
export class CourseIndexFormComponent  {
  @ViewChild('tmplVarCourseIndex', {static:false})
  tmplVarCourseIndex!:CourseIndexTableComponent;

  @ViewChild('courseIdxlesson', { static: false })
  lessonidfield!: ElementRef;

  @Input()
  actionValue!:String;

  @Input()
  courseValue!:number;

  idCourse = 0;
  idLessonId = 0;
  indexselected = 0;
  totalRowsIndex = 0;
  form!: Form;

  public Form = this.fb.group({
    lessonID: ['', Validators.pattern(/^[0-9]\d*$/)],
    indexDescription: [''],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private dataService: DataService,
    private courseService: CourseService,
    private toast: ToastrService
  ) {}


  deleteCourseIndex(e:any) {

  }

  refreshInfo () {
    this.tmplVarCourseIndex.refreshInfo();
  }

  downloadFile() {
    this.dataService.downloadFile(this.idCourse).subscribe({
      next: (blob: Blob) => saveAs(blob, 'CourseIndex.xls'),
    });
  }

  uploadCourseIndex(e: any) {
    const fileUpload = e;
    const formDataFile = new FormData();
    formDataFile.append('file', fileUpload.files[0]);
    this.dataService
      .saveInfoCourseDetailMassive(this.idCourse, formDataFile)
      .subscribe({
        complete: () => {

          this.toast.success('Index loaded');
        },
      });
  }
  addCourse() {
    this.Form.reset();
    this.idLessonId = 0;
    this.lessonidfield.nativeElement.focus();
  }

  saveIndex() {
    let idx = -1;
    if (this.idLessonId) {
      idx = this.courseService.courseIndexInfo.findIndex(
        (X) => X.lessonId === this.idLessonId
      );
    }

    const courseDetail: CourseDetail = {
      courseId: this.idCourse,
      description: this.Form.get('indexDescription')?.value,
      lessonId: this.Form.get('lessonID')?.value,
      id: idx >= 0 ? this.courseService.courseIndexInfo[idx].id : 0,
    };

    this.dataService.saveInfoCourseDetail(courseDetail).subscribe({
      complete: () => {
        this.toast.success('Course saved');
      },
    });
  }

  editCourseIndex(e: any): void {
    this.idLessonId = e;

    const idx = this.courseService.courseIndexInfo.findIndex(
      (X) => X.lessonId === +e
    );

    if (idx >= 0) {
      this.Form.get('lessonID')?.setValue(+e);
      this.Form.get('indexDescription')?.setValue(
        this.courseService.courseIndexInfo[idx].description
      );
      this.idCourse = +this.courseService.courseIndexInfo[idx].courseId;
    }
  }
}
