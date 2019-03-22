import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ThfTableColumn, ThfTableAction, ThfPageFilter, ThfPageAction, ThfDialogService } from '@totvs/thf-ui';
import { PageResponseEntity } from 'src/app/model/pageResponseEntity';
import { finalize, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EditarEstudanteComponent } from '../editar-estudante/editar-estudante.component';
import { Estudante } from 'src/app/model/estudante';
import { EstudanteService } from 'src/app/core/estudante.service';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class EstudantesComponent implements OnInit {
  @ViewChild(EditarEstudanteComponent) estudanteEdit: EditarEstudanteComponent;
  readonly pageActions: Array<ThfPageAction> = [
    { label: 'Adicionar', action: this.openForCreate }
  ];

  readonly filterSettings: ThfPageFilter = {
    action: this.filterEstudanteByName.bind(this),
    ngModel: 'estudanteNameFilter',
    placeholder: 'Nome do estudante',

  };

  readonly tableColumns: Array<ThfTableColumn> = [
    { property: 'enrollment', label: 'Matrícula' },
    { property: 'name', label: 'Nome' },
    { property: 'cpf', label: 'CPF' },
    { property: 'email', label: 'Email' },
    { property: 'estudanteType', label: 'Tipo de estudante' }
  ];

  readonly tableActions: Array<ThfTableAction> = [
    {
      label: 'Alterar aluno',
      action: this.openForEdit.bind(this),
      icon: 'thf-icon thf-icon-edit',

    },
    {
      label: 'Excluir',
      action: this.deleteEstudante.bind(this),
      icon: 'thf-icon thf-icon-delete'
    }
  ];

  private page = 0;

  private size = 10;

  private destroy: Subject<void> = new Subject();

  isLoading = false;

  estudanteNameFilter = '';

  estudantePage: PageResponseEntity<Estudante> = { hasNext: false, items: [] };


  constructor(
    private estudanteService: EstudanteService,
    private activatedRoute: ActivatedRoute,
    private thfDialog: ThfDialogService) { }

  ngOnInit(): void {
    this.handleParams();
  }

  handleParams(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy))
      .subscribe(queryParams => {
        if (queryParams.name) {
          this.findEstudanteByName(queryParams.name);
        } else {
          this.loadEstudantes();
        }
      });
  }

  loadEstudantes(page = this.page, size = this.size): void {
    this.startLoading();
    this.estudanteService.findAll(page, size)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => { this.stopLoading(); }))
      .subscribe(estudantes => {
        this.estudantePage.hasNext = estudantes.hasNext;
        if (this.estudantePage.items.length > 0) {
          this.estudantePage.items = this.estudantePage.items.concat(estudantes.items);
        } else {
          this.estudantePage.items = estudantes.items;
        }
      });
  }

  filterEstudanteByName(filter = this.estudanteNameFilter): void {
    this.resetPage();
    this.startLoading();
    this.estudanteService.findByNameContaining(filter, this.page, this.size)
      .pipe(finalize(() => { this.stopLoading(); }))
      .subscribe(estudantes => {
        this.estudantePage = estudantes;
      });
  }

  findEstudanteByName(name: string) {
    console.log(name);
    this.estudanteNameFilter = name;
    this.filterEstudanteByName(this.estudanteNameFilter);
  }

  loadMore(): void {
    this.nextPage();
    this.loadEstudantes();
  }

  openForCreate(): void {
    this.estudanteEdit.openForCreate();
  }

  openForEdit(estudante: Estudante): void {
    this.estudanteEdit.openForEdit(estudante);
  }

  deleteEstudante(estudante: Estudante): void {
    this.thfDialog.confirm({
      title: 'Excluir',
      message: `Você deseja eliminar esse aluno?`,
      confirm: () => {
        this.estudanteService.delete(estudante.enrollment)
          .subscribe(() => {
            this.resetPage();
            this.findEstudanteByName(estudante.name);
          });
      },

    });

  }

  nextPage(): void {
    this.page += 1;
  }

  resetPage(): void {
    this.page = 0;
  }

  startLoading(): void {
    this.isLoading = true;
  }

  stopLoading(): void {
    this.isLoading = false;
  }

}
