import { Injectable } from '@angular/core';
import baseUrl from './config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CounsellorDetailService {

  constructor(private http:HttpClient) { }

  insertCounsellorDetail(data:any){
    return this.http.put(`${baseUrl}/student/update`,data);
  }

  getCounsellorRec(){
    return this.http.get(`${baseUrl}/student/get`);
  }

}
