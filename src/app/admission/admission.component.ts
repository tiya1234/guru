
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdmissionService } from '../serivces/admission.service';
import { CounsellorService } from '../serivces/counsellor.service';
import { DocumentDetailService } from '../serivces/document-detail.service';
import { FeeDetailService } from '../serivces/fee-detail.service';
declare const $ : any;
@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})


export class AdmissionComponent {
  
  formJSON:any = {};
  admissionData:any;
  counsellorData:any;
  districtData:any;
  stateData:any;
  
  studentId:any;
  formatdate = 'dd/MM/yyyy';
  myDate = (new Date());
  installmentValue:any=1;
  showAdharFront:any=false;
  showAdharBack:any=false;
  contactvalidationmassage:any=""
  feeFormJSON:any = [
    {
      installment:true,
      amount:'',
      depositBankName:'',
      installmentDate: '',
      optionalSnapshot:'',
      paymentSnapshot:'',
      refrenceNumber:'',
  
    }
  ];

  constructor(private service:AdmissionService,private counsellorSerive:CounsellorService,
    private feeDetail:FeeDetailService,private documentDetail:DocumentDetailService,
    private datepipe: DatePipe
   ){}
   

  ngOnInit() {
    
   
    this.formJSON.dateOfRegistration=this.myDate;
   
    this.service.getAdmissionDetail().subscribe(
      (data:any)=>{
        this.admissionData=data
      }
    );
    this.counsellorSerive.getCounsellorRec().subscribe(
      (data)=>{
        this.counsellorData=data;
      }
    );
    this.counsellorSerive.getState().subscribe(
      (data:any)=>{
        this.stateData=data;
      }
    );
    // this.counsellorSerive.getDistrict().subscribe(
    //   (data:any)=>{
    //     this.districtData=data;
    //   }
    // )
    this.studentId=localStorage.getItem("studentId");

    this.feeFormJSON = [
      {
        installment:true,
        amount:'',
        depositBankName:'',
        installmentDate: this.datepipe.transform(new Date, 'yyyy-MM-dd'),
        optionalSnapshot:'',
        paymentSnapshot:'',
        refrenceNumber:'',
    
      }
    ];
   
    }
    getDistrictByStateId (stateRec:any) {
      this.counsellorSerive.getDistrictId(stateRec.stateId).subscribe(
        (data:any)=>{
          this.districtData=data;
        }
      )
    }
     iscontacterror = false;
    validateContactNumber(){
      let value = this.formJSON.contact.toString();
      if(value.length != 0 && value.length<10){
         this.iscontacterror=true
      }
      else{
        this.iscontacterror = false
      }
      if(value.length != 0){
        this.counsellorSerive.validateAadharNumber(value).subscribe(
          (data:any)=>{
            // this.districtData=data;
            this.aadharvalidationmassage = "";
          },
          (error:any)=>{
            console.log(error?.error?.text)
            this.aadharvalidationmassage = error?.error?.text;
          }
        )
      }

      
      this.counsellorSerive.validateContactNumber(value).subscribe(
        (data:any)=>{
          console.log(data)
          this.contactvalidationmassage = "";
        },
        (error:any)=>{
          console.log(error?.error?.text);
          this.contactvalidationmassage = error?.error?.text;
          
        }
      )
      //server call giving and value should be there in the parametere
    }
    
    isaadharerror = false;
    aadharvalidationmassage:any;
    validateAadharNmber(){
      let value = this.formJSON.aadhar.toString();
      if(value.length != 0 && value.length<14){
        this.isaadharerror = true
      }
      else{
        this.isaadharerror = false
      }
      if(value.length != 0){
        this.counsellorSerive.validateAadharNumber(value).subscribe(
          (data:any)=>{
            // this.districtData=data;
            this.aadharvalidationmassage = "";
          },
          (error:any)=>{
            console.log(error?.error?.text)
            this.aadharvalidationmassage = error?.error?.text;
          }
        )
      }
     
    }

    submitData()
  {
   console.log("line no:51 "+JSON.stringify(this.formJSON));
   
     this.service.insertCounsellorDetail(this.formJSON).subscribe(
      (data:any)=>{
        console.log("line no:47 "+JSON.stringify);
        this.studentId=data.id
        localStorage.setItem("studentId" ,data.id)
        this.formJSON={};
        $("#exampleModal").modal("hide");
        Swal.fire(
          'Success!',
          'Admission add successfully!',
          'success'
        )
        // this.toastr.success('Hello world!', 'Toastr fun!');
      }
    )
  }
  getLogoUrl(event: any) {

    const logoUrl = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(logoUrl);
    // tslint:disable-next-line:no-shadowed-variable
    reader.onload = (event: any) => {
      this.formJSON.paymentSnapshot = reader.result;  
      this.formJSON.paymentSnapshot = event.target.result;

      this.formJSON.optionalSnapshot=reader.result;
      this.formJSON.optionalSnapshot = event.target.result;

      this.formJSON.adhaarBack=reader.result;
      this.formJSON.adhaarBack = event.target.result;
      this.formJSON.adhaarFront=reader.result;
      
      this.formJSON.studentPhoto=reader.result;
      this.formJSON.anotherPhoto=reader.result;
      this.formJSON.tenthCertificate=reader.result;
      this.formJSON.studentPhoto=reader.result;
      this.formJSON.signature=reader.result;
      
    };
    // tslint:disable-next-line:only-arrow-functions
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  submitFeesDetail(){
    var obj={
      "feedetail":  this.feeFormJSON,
      "studentId": this.studentId
    }
    console.log("line no:56 "+JSON.stringify(obj));
    this.feeDetail.insertFeeDetail(obj).subscribe(
      (data)=>{
        console.log("line no:88 "+JSON.stringify(data));
        this.feeFormJSON=[] ;
        this.append();
        Swal.fire(
          'Success!',
          'Fees add successfully!',
          'success'
        )
      }
    )
  }

  append(){
  
      let temp = {
        installment:true,
        amount:'',
        depositBankName:'',
        installmentDate: '',
        optionalSnapshot:'',
        paymentSnapshot:'',
        refrenceNumber:'',
  
      }
      this.feeFormJSON.push(temp);
  }

  removeQuestion(event:any,index:any) {
    event.stopPropagation();
   this.feeFormJSON.splice(index,1);
  }

  submitDocumentData(){
    var obj={
      "adhaarBack":this.formJSON.adhaarBack,
      "adhaarFront": this.formJSON.adhaarBack,
      "anotherPhoto": this.formJSON.anotherPhoto,
      "studentId": this.studentId,
      "studentPhoto":this.formJSON.studentPhoto,
      "tenthCertificate": this.formJSON.tenthCertificate,
      "signature":this.formJSON.signature
    }
  this.documentDetail.insertFeeDetail(obj).subscribe(
  (data:any)=>{
    this.formJSON={};
    Swal.fire(
      'Success!',
      'Documents add successfully!',
      'success'
    )
  }
)
  }
  
  getValue(event:any){
      // alert(event);
      this.formJSON.installment=event; 
     }

     contact(){
      
     }

     aadharLenght:any=[];
     aadhar(){
      // // alert("working")
      // this.aadharLenght.push(this.formJSON.aadhar)
      // alert(this.aadharLenght)
      // if(this.aadharLenght.length>14||this.aadharLenght.length<14){
      //   alert("Not Wokring")
      // }
     }


     
}


