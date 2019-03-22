import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudantesComponent } from './estudantes/estudantes.component';

const routes: Routes = [
  { path: '', component: EstudantesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudantesRoutingModule { }
