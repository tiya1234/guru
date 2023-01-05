import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './config';

@Injectable({
  providedIn: 'root'
})
export class FeeDetailService {

  constructor(private http:HttpClient) { }

  insertFeeDetail(data:any){
    return this.http.post(`${baseUrl}/feedetail/`,data);
  }
  feesDetail(id:any){
    return this.http.get(`${baseUrl}/feedetail/by/?feeid=`+id)
  }
  updateFeesDetail(data:any){
    return this.http.put(`${baseUrl}/feedetail/`,data);
  }
}
