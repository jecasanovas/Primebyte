import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CourseIndexFormComponent } from './components/course-index-form.component';
import { CourseIndexTableComponent } from './components/course-index-table.component';



@Component({
  selector: 'app-course-index',
  template: `<app-course-index-form #tmplVarIndexForm ></app-course-index-form>

  `

})
export class CourseIndexComponent {
  @ViewChild('tmplVarIndexForm')
  tmplVarIndexForm!:CourseIndexFormComponent;




  changePage() {
    this.tmplVarIndexForm.refreshInfo();
  }


}
