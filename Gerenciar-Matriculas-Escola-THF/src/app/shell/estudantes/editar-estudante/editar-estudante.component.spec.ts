import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstudanteComponent } from './editar-estudante.component';

describe('EditarEstudanteComponent', () => {
  let component: EditarEstudanteComponent;
  let fixture: ComponentFixture<EditarEstudanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEstudanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
