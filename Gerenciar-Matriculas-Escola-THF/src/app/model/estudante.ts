import { Pessoa } from './pessoa';

export interface Estudante extends Pessoa {

  enrollment?: string;
  estudanteType: EstudanteType;
}

export enum EstudanteType {
  ENADE,
  VESTIBULAR,
  PATINHO
}