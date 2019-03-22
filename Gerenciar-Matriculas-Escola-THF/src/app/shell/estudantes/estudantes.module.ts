import { NgModule } from '@angular/core';
//import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EstudantesComponent } from './estudantes/estudantes.component';
import { EditarEstudanteComponent } from './editar-estudante/editar-estudante.component';
import { EstudantesRoutingModule } from './estudantes-routing.module';



@NgModule({
  declarations: [EstudantesComponent, EditarEstudanteComponent],
  imports: [
    //SharedModule,
    EstudantesRoutingModule,
    ReactiveFormsModule
  ],
  exports: [EditarEstudanteComponent]
})
export class EstudantesModule { }
