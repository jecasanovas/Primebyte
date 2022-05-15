import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/Shared/Services/data.service';
import { TechnologyDetails } from '../../Shared/Models/technology-details.interface';
import { Technology } from '../../Shared/Models/tecnology.interface';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css'],
})
export class TechnologyComponent implements OnInit {
  obsTechnology$: Observable<Technology[]> = this.dataService.getTechnology();
  @ViewChild('inputtechnology', { static: false }) inputtechnology!: ElementRef;
  @ViewChild('inputTechDetail', { static: false })
  inputTechDetail!: ElementRef;

  technology!: Technology[];
  technologyDetailsAll!: TechnologyDetails[];
  technologyDetailsFiltered!: TechnologyDetails[];

  technologySelected: Technology = { id: 0, description: '' };
  technologyDetailSelected!: TechnologyDetails;

  constructor(
    private dataService: DataService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.technologySelected = {
      id: 0,
      description: '',
    };
    this.technologyDetailSelected = {
      id: 0,
      description: '',
      technologyId: 0,
    };
    this.dataService.getTechnology().subscribe({
      next: (result) => {
        this.technology = result;
      },
    });

    this.dataService.getTechnologyDetail().subscribe({
      next: (result) => {
        this.technologyDetailsAll = result;
      },
    });
  }

  deleteItem(id: number) {
    this.dataService.deleteTechnology(id).subscribe({
      complete: () => {
        this.toast.success('Deleted!');
        const idx = this.technology.findIndex((x) => x.id === id);
        this.technology.splice(idx, 1);
      },
      error: () => this.toast.error("You can't delete this item"),
    });
  }

  deleteItemDetail(id: number) {
    this.dataService.deleteTechnologyDetails(id).subscribe({
      complete: () => {
        this.toast.success('Deleted!');
        const idx = this.technologyDetailsFiltered.findIndex(
          (x) => x.id === id
        );
        this.technologyDetailsFiltered.splice(idx, 1);
      },
      error: () => this.toast.error("You can't delete this item"),
    });
  }

  changeTechnology(id: number, description: string) {
    this.technologyDetailsFiltered = [...this.technologyDetailsAll];

    this.technologyDetailsFiltered = this.technologyDetailsAll.filter(
      (x) => x.technologyId === id
    );
    this.technologySelected = {
      id: id,
      description: description,
    };
  }
  changeTechnologyDetail(id: number, description: string) {
    this.technologyDetailSelected = {
      id: id,
      description: description,
      technologyId: this.technologySelected.id,
    };
  }

  addTechnology() {
    this.inputtechnology.nativeElement.focus();
    this.technologySelected = {
      id: 0,
      description: '',
    };
    this.technologyDetailSelected = {
      id: 0,
      description: '',
      technologyId: 0,
    };
    this.technologyDetailsFiltered = [];
  }
  addTechnologyDetail() {
    this.inputTechDetail.nativeElement.focus();
    this.technologyDetailSelected = {
      id: 0,
      description: '',
      technologyId: 0,
    };
  }

  saveTechnology() {
    this.technologySelected.description =
      this.inputtechnology?.nativeElement.value;
    if (!this.technologySelected.description) {
      this.toast.error('Missing name info');
      return;
    }
    this.technologySelected.description =
      this.inputtechnology?.nativeElement.value;
    this.dataService.saveTechnology(this.technologySelected).subscribe({
      next: (result: any) => {
        this.technologySelected = <Technology>(
          this.technology.find((x) => x.id === this.technologySelected.id)
        );

        if (!this.technologySelected) {
          this.technologySelected = {
            id: result,
            description: this.inputtechnology.nativeElement.value,
          };
          this.technology.push(this.technologySelected);
        } else {
          this.technologySelected.description =
            this.inputtechnology.nativeElement.value;
        }

        this.toast.success('Technology saved');
      },
      error: (error: any) => {
        this.toast.error(error);
      },
    });
  }

  saveTechnologyDetail() {
    this.technologyDetailSelected.description =
      this.inputTechDetail?.nativeElement.value;
    this.technologySelected.description =
      this.inputtechnology?.nativeElement.value;
    if (
      !this.technologyDetailSelected.description ||
      !this.technologySelected.description
    ) {
      this.toast.error('Missing name info');
      return;
    }

    this.dataService
      .saveTechnologyDetail(
        this.technologySelected,
        this.technologyDetailSelected
      )
      .subscribe({
        next: (result: any) => {
          const technologyId = this.technologyDetailSelected.technologyId;

          this.technologySelected = <Technology>(
            this.technology.find((x) => x.id === technologyId)
          );

          if (!this.technologySelected) {
            this.technologySelected = {
              id: result,
              description: this.inputtechnology.nativeElement.value,
            };
            this.technology.push(this.technologySelected);
          }

          this.technologyDetailSelected = <TechnologyDetails>(
            this.technologyDetailsFiltered.find(
              (x) => x.id === this.technologyDetailSelected.id
            )
          );
          if (!this.technologyDetailSelected) {
            this.technologyDetailSelected = {
              id: result,
              technologyId: technologyId,
              description: this.inputTechDetail.nativeElement.value,
            };
            this.technologyDetailsFiltered.push(this.technologyDetailSelected);
          } else {
            this.technologyDetailSelected.description =
              this.inputTechDetail.nativeElement.value;
          }
        },
        error: (error: any) => {
          this.toast.error(error);
        },
      });
  }
}
