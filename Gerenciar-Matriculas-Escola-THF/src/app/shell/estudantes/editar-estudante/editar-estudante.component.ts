import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThfModalAction, ThfModalComponent, ThfRadioGroupOption } from '@totvs/thf-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EstudanteService } from 'src/app/core/estudante.service';
import { Estudante } from 'src/app/model/estudante';

@Component({
  selector: 'app-editar-estudante',
  templateUrl: './editar-estudante.component.html',
  styleUrls: ['./editar-estudante.component.css']
})
export class EditarEstudanteComponent implements OnInit, OnDestroy {

  @ViewChild(ThfModalComponent)
  private thfModal: ThfModalComponent;

  @Output() estudanteCreated = new EventEmitter<Estudante>();

  estudanteForm = this.fb.group({
    enrollment: [''],
    name: ['', Validators.required],
    email: ['', Validators.required],
    cpf: ['', Validators.required],
    estudanteType: ['', Validators.required],
  });

  readonly estudanteTypeOptions: Array<ThfRadioGroupOption> = [
    { label: 'ENADE', value: 1 },
    { label: 'VESTIBULAR', value: 2 },
    { label: 'PATINHO', value: 3}
  ];
  private destroy: Subject<void> = new Subject();

  close: ThfModalAction = {
    action: () => {
      this.cancel();
    },
    label: 'Cancelar'
  };

  confirm: ThfModalAction = {
    action: () => {
      this.save();
    },
    label: 'Salvar'
  };

  constructor(private estudanteService: EstudanteService, private fb: FormBuilder) { }

  ngOnInit() {
    this.checkFormValid();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  openForCreate(): void {
    this.thfModal.open();
  }

  openForEdit(estudante: Estudante): void {
    this.setEstudanteForm(estudante);
    this.thfModal.open();
  }

  save(): void {
    const estudante = this.estudanteForm.value as Estudante;
    // necessário para trabalhar com o thf-select, que não permite o valor 0 por default.
    estudante.estudanteType = estudante.estudanteType - 1;
    if (estudante.enrollment) {
      this.estudanteService.update(estudante)
        .pipe(takeUntil(this.destroy))
        .subscribe(estudanteCreated => {
          this.closeModal();
          this.estudanteCreated.emit(estudanteCreated);
        });
    } else {
      this.estudanteService.create(estudante)
        .pipe(takeUntil(this.destroy))
        .subscribe(estudanteCreated => {
          this.closeModal();
          this.estudanteCreated.emit(estudanteCreated);
        });
    }
  }

  cancel(): void {
    this.closeModal();
  }

  private closeModal() {
    this.thfModal.close();
    this.resetForm();
  }

  private checkFormValid(): void {
    this.estudanteForm.statusChanges.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.confirm.disabled = this.estudanteForm.pristine || this.estudanteForm.invalid;
    });
  }

  private resetForm(): void {
    this.estudanteForm.reset();
    this.estudanteForm.controls['studentType'].markAsPristine();
  }

  private setEstudanteForm(estudante: Estudante) {
    this.estudanteForm.patchValue({
      enrollment: estudante.enrollment,
      name: estudante.name,
      cpf: estudante.cpf,
      email: estudante.email,
      estudanteType: estudante.estudanteType.toString() === 'ENADE' ? 1 : 2
    });
  }
}
