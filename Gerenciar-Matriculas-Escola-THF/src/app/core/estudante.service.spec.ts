import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestModuleMetadata } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SetUpTestBed } from 'src/test.common.spec';
import { EstudanteService, ESTUDANTES_URI } from './estudante.service';

describe('EstudanteService', () => {
  const moduleDef: TestModuleMetadata = {
    imports: [
      HttpClientTestingModule
    ],
    providers: [EstudanteService]
  };
  let estudanteService: EstudanteService;
  let http: HttpClient;
  SetUpTestBed(moduleDef);
  beforeAll((inject([EstudanteService, HttpClient], (_estudanteService: EstudanteService, _http: HttpClient) => {
    estudanteService = _estudanteService;
    http = _http;
  })));

  it('serviço deve ser criado', () => {
    expect(estudanteService).toBeTruthy();
  });

  it('deve chamar o serviço httpClient passando a url correta', async () => {
    spyOn(http, 'get').and.returnValue(of({}));
    expect(http.get).toHaveBeenCalledWith(`${environment.apiUri}${ESTUDANTES_URI}`);
  });
});
