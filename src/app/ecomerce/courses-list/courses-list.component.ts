import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../Shared/Models/course.interface';
import { Paginaton } from '../../Shared/Models/paginaton.interface';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CourseService } from '../../Shared/Services/course.service';
import { Teacher } from '../../../app/Shared/Models/teacher.interface';
import { Technology } from '../../../app/Shared/Models/tecnology.interface';
import { TechnologyDetails } from '../../../app/Shared/Models/technology-details.interface';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  Courses!: Array<Course>;
  activePage: number = 1;
  totalRows: number = 0;
  pageSize: number = 12;
  searchName: string = '';
  faArrowRight = faArrowRight as IconProp;
  faArrowLeft = faArrowLeft as IconProp;
  Teachers:Teacher[] = [];
  Technology:Technology[] = [];
  TechnologyDetails:TechnologyDetails[] = [];
  idteacherSelected:number[] = [];
  idTechnologySelected:number[] = [];
  idTechnologyDetailsSelected:number[] = [];

  maxSize = 99999;
  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activePage = 1;
    this.courseService.getTeachersData(this.activePage,this.maxSize).subscribe({
      next: (result) => this.Teachers = result.data
    });

    this.courseService.getTechnology().subscribe({
      next: (result) => this.Technology = result
    });


    this.pageChanged(this.activePage);
  }
  filterbyName(value: string) {
    this.activePage = 1;
    this.searchName = value;
    this.pageChanged(this.activePage);
  }

  filter(e:number) {
    this.activePage = 1;
    const indexitem = this.idteacherSelected.findIndex(x=> x===e);
    if ( indexitem !== -1 ) {

      this.idteacherSelected.splice(indexitem,1);
    } else {
      this.idteacherSelected.push(e);
    }



    this.courseService.getCourses(this.activePage,this.pageSize,this.searchName,[],this.idteacherSelected)
    .subscribe({
       next: (result) => {
        this.Courses = result.data;
        this.totalRows = result.count;
        this.TechnologyDetails = [];
        this.Technology = [] ;
        this.idTechnologySelected = [];
        this.idTechnologyDetailsSelected = [];

        this.Courses.forEach(x=> {
         const el = this.Technology.findIndex(f=> f.id === x.technologyId);
         if (el === -1) {
          this.Technology.push({
            id:x.technologyId,
            description:x.technologyName as string
          });
        }
        if (this.idTechnologySelected.length > 0) {
        const el2 = this.TechnologyDetails.findIndex(f=> f.technologyId === x.technologyId);
          if (el2 === -1) {
            this.TechnologyDetails.push({
               id:x.technologyDetailsId,
               technologyId:x.technologyId,
               description:x.technologyDetailsName as string
            });
          }
        }
      });
    }});
  }

  filterbyTechnology(e:number)
  {
    this.activePage = 1;
    const indexitem = this.idTechnologySelected.findIndex(x=> x===e);
    if ( indexitem !== -1 ) {
      this.idTechnologySelected.splice(indexitem,1);
    } else {
      this.idTechnologySelected.push(e);
    }

    this.courseService.getCourses(this.activePage,this.pageSize,this.searchName,[],this.idteacherSelected,this.idTechnologySelected)
    .subscribe({
      next: (result) =>
      {
        this.Courses = [...result.data];
        this.totalRows = result.count;
        this.TechnologyDetails = [];
        this.idTechnologyDetailsSelected = [];
        this.Courses.forEach(x=> {
          if (this.idTechnologySelected.length > 0) {
          const el = this.TechnologyDetails.findIndex(f=> f.id === x.technologyDetailsId);
          if (el === -1) {
            this.TechnologyDetails.push({
               id:x.technologyDetailsId,
               technologyId:x.technologyId,
               description:x.technologyDetailsName as string
            });
          }
        }
        })
     }
    })
  }

  filterByTechnologyDet(e:number) {
    this.activePage = 1
    const indexitem = this.idTechnologyDetailsSelected.findIndex( x=> x===e);
    if (indexitem !== -1) {
      this.idTechnologyDetailsSelected.splice(indexitem,1);
    } else {
      this.idTechnologyDetailsSelected.push(e);
    }

    this.courseService.getCourses(this.activePage,this.pageSize,this.searchName,[],this.idteacherSelected,this.idTechnologySelected, this.idTechnologyDetailsSelected)
    .subscribe ({
      next: (result) => {
        this.Courses = [...result.data];
        this.totalRows = result.count;
      }
    });
  }

  pageChanged(e: any) {
    this.activePage = !e.page ? 1 : e.page;
    this.pageSize = !e.itemsPerPage ? this.pageSize : e.itemsPerPage;
    this.courseService
    this.courseService.getCourses(this.activePage,this.pageSize,this.searchName,[],this.idteacherSelected,this.idTechnologySelected, this.idTechnologyDetailsSelected)
      .subscribe((result: Paginaton<Course>) => {
        this.Courses = result.data;
        this.totalRows = result.count;
      });
  }
  getCourseSelected(e: number) {
    this.router.navigateByUrl('ecommerce/coursedetail/' + e);
  }
}
