import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdmissionService } from '../serivces/admission.service';
import { CounsellorDetailService } from '../serivces/counsellor-detail.service';
import { CounsellorService } from '../serivces/counsellor.service';
import { DocumentDetailService } from '../serivces/document-detail.service';
import { FeeDetailService } from '../serivces/fee-detail.service';
declare const $ : any;
@Component({
  selector: 'app-counsellordetail',
  templateUrl: './counsellordetail.component.html',
  styleUrls: ['./counsellordetail.component.scss']
})
export class CounsellordetailComponent {
  lotsOfTabs = new Array(30).fill(0).map((_, index) => `Tab ${index}`);
id:any;
cousellorData:any;
formJSON:any={};
stateData:any;
admissionData:any;
districtData:any;
feesDetail:any={};
prsonlbutton:boolean =true;
peronaltabData:boolean = false;
contactButton:boolean=true;
contacttabData:boolean=false;
documentDetail:any={};
residentialData:boolean=true;
feesDetailid:any;
residentialTabData:boolean=false;
  constructor(private serivce:CounsellorService,private route:ActivatedRoute,
    private admissionService:AdmissionService, private detailService:CounsellorDetailService,
    private feeService:FeeDetailService,private documentService:DocumentDetailService) {}
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }  
    );

    // this.serivce.getById(this.id).subscribe(
    //   (data:any)=>{
    //     console.log("line no:22 "+JSON.stringify(data));
    //     this.cousellorData=data;
    //   }
    // );
    this.serivce.getState().subscribe(
      (data:any)=>{
        this.stateData=data;
      }
    );
    this.serivce.getDistrict().subscribe(
      (data:any)=>{
        this.districtData=data;
      }
    )
    this.admissionService.getById(this.id).subscribe(
      (data:any)=>{
        this.admissionData=data;

        if(
          data?.fatherName == "" || data?.fatherName == null || data?.fatherName == undefined||
          data?.whatsAppNo==""||data?.whatsAppNo==null||data?.whatsAppNo==undefined){

        }else{
          this.prsonlbutton=false;
           this.peronaltabData = true;
           this.contactButton=false;
           this.contacttabData=true;
           this.residentialData=false;
           this.residentialTabData=true;
        }

        
      }
    )
    }

    personalDetail(){
      var obj={ 
        "id":this.id,
        "candidateName":this.admissionData.candidateName,
        "counsellerName":this.admissionData.counsellorName,
        "batch":this.formJSON.batch,
        "dateOfRegistration":this.admissionData.dateOfRegistration,
        "emailId":this.admissionData.emailId,
        "fatherName":this.formJSON.fatherName,
        "motherName":this.formJSON.motherName,
        "dateOfBirth":this.formJSON.dateOfBirth,
        "contact":this.admissionData.contact,
        "aadhar":this.formJSON.aadhar,
        "alternativeContact":this.admissionData.alternativeContact,
        "whatsAppNo":this.admissionData.whatsAppNo,
        "stateID":this.formJSON.stateID,
        "districtID":this.formJSON.districtID,
        "rollNo":this.formJSON.rollNo,
        "uniRollNo":this.formJSON.uniRollNo,
        "counsellerId":this.admissionData.counsellor.id
      }
      this.detailService.insertCounsellorDetail(obj).subscribe(
        (data:any)=>{
          console.log("line no:41 "+JSON.stringify(data));
          this.prsonlbutton=false;
          this.peronaltabData = true;
          this.openmodal();
        }
      )
      $("#exampleModal").modal("hide");
    }
    showResidentail=false;
    residentialDetail(){
   
      var obj={ 
        "id":this.id,
        "candidateName":this.admissionData.candidateName,
        "batch":this.formJSON.batch,
        "dateOfRegistration":this.admissionData.dateOfRegistration,
        "emailId":this.admissionData.emailId,
        "fatherName":this.admissionData.fatherName,
        "motherName":this.admissionData.motherName,
        "dateOfBirth":this.admissionData.dateOfBirth,
        "contact":this.admissionData.contact,
        "aadhar":this.admissionData.aadhar,
        "alternativeContact":this.admissionData.alternativeContact,
        "whatsAppNo":this.admissionData.whatsAppNo,
        "stateID":this.formJSON.stateID,
        "districtID":this.formJSON.districtID,
        "rollNo":this.admissionData.rollNo,
        "uniRollNo":this.admissionData.uniRollNo,
        "counsellerId":this.admissionData.counsellor.id
      }
      this.detailService.insertCounsellorDetail(obj).subscribe(
        (data:any)=>{
          console.log("line no:41 "+JSON.stringify(data));
          this.residentialData=false;
          this.residentialTabData = true;
          this.openmodal();
        }
      )
      $("#residentialDetail").modal("hide");
    }
    showContact=false;
    contactDetail(){
      var obj={ 
        "id":this.id,
        "candidateName":this.admissionData.candidateName,
        "batch":this.formJSON.batch,
        "dateOfRegistration":this.admissionData.dateOfRegistration,
        "emailId":this.admissionData.emailId,
        "fatherName":this.formJSON.fatherName,
        "motherName":this.formJSON.motherName,
        "dateOfBirth":this.formJSON.dateOfBirth,
        "contact":this.admissionData.contact,
        "aadhar":this.formJSON.aadhar,
        "alternativeContact":this.formJSON.alternativeContact,
        "whatsAppNo":this.formJSON.whatsAppNo,
        "stateID":this.formJSON.stateID,
        "districtID":this.formJSON.districtID,
        "rollNo":this.formJSON.rollNo,
        "uniRollNo":this.formJSON.uniRollNo,
        "counsellerId":this.admissionData.counsellor.id
      }
      this.detailService.insertCounsellorDetail(obj).subscribe(
        (data:any)=>{
          console.log("line no:41 "+JSON.stringify(data));
          this.contactButton=false;
          this.contacttabData = true;
          this.openmodal();
        }
      )
      $("#contactInfo").modal("hide");
    }
    show=false;
    openmodal(){
      let totalamount:any;
      this.admissionService.getById(this.id).subscribe(
        (data)=>{
          this.admissionData=data;
            this.formJSON=this.admissionData;
            this.formJSON.stateID=this.admissionData.stateModel.stateId;
            this.formJSON.districtID=this.admissionData.district.districtId;
            this.formJSON.feesdetailModel=this.admissionData.feesdetailModel;
            this.documentDetail=this.admissionData.documentModelRequest;

            if(this.documentDetail==null){
              this.show=true;
            }
            
            console.log("line no:174 "+JSON.stringify(this.formJSON.feesdetailModel));
            
        }
      )
    }
    openFeesModal(){
      this.feesDetail.isEdit = true;
      
    }
    feesDetailId(id:any){
      this.feesDetailid=id;
   
      this.feeService.feesDetail(id).subscribe(
        (data:any)=>{
          console.log("line no:192 "+JSON.stringify(data));
          this.feesDetail=data;
          console.log("line no:194 "+JSON.stringify(this.feesDetail));
        }
      )
    }
  
    updateFeesDetail(){
      var obj=
          {
            "id": this.feesDetail.id,
            "amount": this.feesDetail.amount,
            "installmentDate": this.feesDetail.installmentDate,
            "depositBankName": this.feesDetail.depositBankName,
            "refrenceNumber": this.feesDetail.refrenceNumber,
            "paymentSnapshot": this.feesDetail.paymentSnapshot,
            "optionalSnapshot": this.feesDetail.optionalSnapshot,
            "studentId":this.id
          }
      console.log("line no:216 "+JSON.stringify(obj));
      
      this.feeService.updateFeesDetail(obj).subscribe(
        (data:any)=>{
          this.feesDetail=data;
          $("#feesDetail").modal("hide");
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
        "feedetail":  [this.feesDetail],
        "studentId": this.id
      }
      console.log("line no:56 "+JSON.stringify(obj));
      this.feeService.insertFeeDetail(obj).subscribe(
        (data)=>{
          console.log("line no:88 "+JSON.stringify(data));
          $("#feesDetail").modal("hide");
          this.openmodal();
        }
      )
    }

    submitDocumentData(){
      var obj={
        "adhaarBack":this.formJSON.adhaarBack,
        "adhaarFront": this.formJSON.adhaarBack,
        "anotherPhoto": this.formJSON.anotherPhoto,
        "studentId": this.id,
        "studentPhoto":this.formJSON.studentPhoto,
        "tenthCertificate": this.formJSON.tenthCertificate,
        "signature":this.formJSON.signature
      }
    this.documentService.updateDocumentDetail(obj).subscribe(
    (data:any)=>{
      this.formJSON={};
      $("#documentDetail").modal("hide");
      this.openmodal();
    }
  )
    }
}
