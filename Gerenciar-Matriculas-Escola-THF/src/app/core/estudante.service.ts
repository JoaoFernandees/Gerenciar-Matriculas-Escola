import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Estudante } from '../model/estudante';
import { Observable } from 'rxjs';
import { PageResponseEntity } from '../model/pageResponseEntity';

export const ESTUDANTES_URI = `${environment.apiUri}/api/estudantes`;
@Injectable({
  providedIn: 'root'
})
export class EstudanteService {
  constructor(private http: HttpClient) { }

  findAll(page: number, size: number): Observable<PageResponseEntity<Estudante>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResponseEntity<Estudante>>(`${ESTUDANTES_URI}`, { params: params });
  }

  findById(id: string): Observable<Estudante> {
    return this.http.get<Estudante>(`${environment.apiUri}${ESTUDANTES_URI}/${id}`);
  }

  findByNameContaining(name: string, page: number, size: number): Observable<PageResponseEntity<Estudante>> {
    const params = new HttpParams().set('name', name).set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResponseEntity<Estudante>>(`${ESTUDANTES_URI}`, { params: params });
  }

  create(estudante: Estudante): Observable<Estudante> {
    return this.http.post<Estudante>(`${ESTUDANTES_URI}`, estudante);
  }

  update(estudante: Estudante): Observable<Estudante> {
    return this.http.put<Estudante>(`${ESTUDANTES_URI}`, estudante);
  }

  delete(enrollment: string): Observable<void> {
    return this.http.delete<void>(`${ESTUDANTES_URI}/${enrollment}`);
  }
}
