import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TechnologyDetails } from '../../Shared/Models/technology-details.model';
import { Technology } from '../../Shared/Models/tecnology.model';
import { DataService } from '../../Shared/Services/data.service';
import {
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css'],
})
export class TechnologyComponent implements OnInit {
  obsTechnology$!: Observable<Technology[]> ;
  @ViewChild('inputtechnology', { static: false }) inputtechnology!: ElementRef;
  @ViewChild('inputTechDetail', { static: false })
  inputTechDetail!: ElementRef;


  technologyDetailsAll!: TechnologyDetails[];
  technologyDetailsFiltered!: TechnologyDetails[];

  technologySelected: Technology = { id: 0, description: '' };
  technologyDetailSelected!: TechnologyDetails;
  faIconTrash = faTrash as IconProp;

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
    this.obsTechnology$ = this.dataService.getTechnology();

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
        const idx = this.dataService.Techology.findIndex((x) => x.id === id);
        this.dataService.Techology.splice(idx, 1);
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
          this.dataService.Techology.find((x) => x.id === this.technologySelected.id)
        );

        if (!this.technologySelected) {
          this.technologySelected = {
            id: result,
            description: this.inputtechnology.nativeElement.value,
          };
          this.dataService.Techology.push(this.technologySelected);
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
            this.dataService.Techology.find((x) => x.id === technologyId)
          );

          if (!this.technologySelected) {
            this.technologySelected = {
              id: result,
              description: this.inputtechnology.nativeElement.value,
            };
            this.dataService.Techology.push(this.technologySelected);
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
