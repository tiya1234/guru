import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './config';

@Injectable({
  providedIn: 'root'
})
export class DocumentDetailService {

  constructor(private http:HttpClient) { }


  insertFeeDetail(data:any){
    return this.http.post(`${baseUrl}/document/`,data);
  }

  updateDocumentDetail(data:any){
    return this.http.put(`${baseUrl}/document/`,data);
  }
}
