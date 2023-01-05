import { Injectable } from '@angular/core';
import baseUrl from './config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdmissionService {  

  constructor(private http:HttpClient) { }

  insertAdmissionDetail(data:any){
    return this.http.post(`${baseUrl}/student/post/admission`,data);
  }
  insertAdmission(data:any){
    return this.http.put(`${baseUrl}/student/post`,data);
  }
  getAdmissionDetail(){
    return this.http.get(`${baseUrl}/student/getall`);
  }
  deleteRecById(id:any){
    return this.http.delete(`${baseUrl}/student/delete/`+id);
  }
  updateRec(data:any){
    return this.http.put(`${baseUrl}/student/update`,data);
  }

  getById(id:any){
    return this.http.get(`${baseUrl}/student/getbyid?id=`+id);
  }
  insertCounsellorDetail(data:any){
    return this.http.put(`${baseUrl}/student/update`,data);
  }

  generateExcel(){
    return this.http.get(`http://localhost:90/excel/export-to-excel`);
    
  }
}
