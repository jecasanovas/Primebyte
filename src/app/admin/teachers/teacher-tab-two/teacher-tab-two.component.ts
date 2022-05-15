import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/Shared/Services/data.service';
import { Teacher } from '../../../Shared/Models/teacher.interface';

@Component({
  selector: 'app-teacher-tab-two',
  templateUrl: './teacher-tab-two.component.html',
  styleUrls: ['./teacher-tab-two.component.css'],
})
export class TeacherTabTwoComponent {
  constructor(
    private dataservice: DataService,
    private toast: ToastrService
  ) {}

  @Input()
  description!: string;

  teacher!: Teacher;

  changeTextArea(e: any) {
    this.description = e.target.value;
  }

  saveinfo() {
    this.teacher = this.dataservice.Teacher;
    this.teacher.description = this.description ?? '';
    this.dataservice.saveInfoTeacher(this.teacher).subscribe({
      complete: () => {
        this.toast.success('Saved!');
      },
    });
  }
}
