import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './config';

@Injectable({
  providedIn: 'root'
})
export class CounsellorService {

  constructor(private http:HttpClient) { }

  insertCounsellor(data:any){
    return this.http.post(`${baseUrl}/counsellor/add`,data);
  }

  getCounsellorRec(){
    return this.http.get(`${baseUrl}/counsellor/get`);
  }

  deleteRecById(id:any){
    return this.http.delete(`${baseUrl}/counsellor/delete/`+id);
  }
  updateRec(data:any){
    return this.http.put(`${baseUrl}/counsellor/update`,data);
  }

  getById(id:any){
    return this.http.get(`${baseUrl}/counsellor/get/`+id);
  }
  getState(){
    return this.http.get(`${baseUrl}/state/all`)
  }
  getDistrict(){
    return this.http.get(`${baseUrl}/district/all`);

  }
  getDistrictId(id: any){
    return this.http.get(`${baseUrl}/district/by?id=`+id);
  }

  validateAadharNumber(id: any){
    return this.http.get(`${baseUrl}/student/adhar?adhar=`+id);
  }

  validateContactNumber(id: any){
    return this.http.get(`${baseUrl}/student/contact?contact=`+id);
  }
}
