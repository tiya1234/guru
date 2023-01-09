import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../admissiontable/admissiontable.component';
import { AdmissionService } from '../serivces/admission.service';
import { CounsellorService } from '../serivces/counsellor.service';

declare const $: any;
@Component({
  selector: 'app-admission-detail',
  templateUrl: './admission-detail.component.html',
  styleUrls: ['./admission-detail.component.scss']
})
export class AdmissionDetailComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];

  dataSource!: MatTableDataSource<UserData>;
  counsellorData: any = [];
  searched: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  formJSON: any = {};
  counsellorRecId: any;
  totalRecords: any;
  page: any = 1;
  admissionData: any = [];
  copyAdmissionData: any;
  search: any;
  count: any;
  srNo: any;
  showDropDown: any = false;

  tableHeaderData = [

    {
      lable: "dateOfRegistration",
      ischeck: true
    },
    {
      lable: "rollNo",
      ischeck: true
    },

    {
      lable: "candidateName",
      ischeck: true
    },
    {
      lable: "counsellorName",
      ischeck: true
    },
    {
      lable: "fatherName",
      ischeck: false
    },
    {
      lable: "motherName",
      ischeck: false
    },
    {
      lable: "dateOfBirth",
      ischeck: false
    },
    {
      lable: "contact",
      ischeck: false
    },
    {
      lable: "alternativeContact",
      ischeck: false
    },
    {
      lable: "whatsAppNo",
      ischeck: false
    },
    {
      lable: "aadhar",
      ischeck: false
    },
    {
      lable: "emailId",
      ischeck: false
    },
    {
      lable: " feePaid",
      ischeck: false
    },
    {
      lable: "stateModel",
      ischeck: false
    },

    {
      lable: "district",
      ischeck: false
    },

    {
      lable: "batch",
      ischeck: false
    },

    {
      lable: "uniRollNo",
      ischeck: false
    },


  ];
  c: any = 0;
  filterTableBodyJSON: any = [];
  filterTableHeaderDataJSON: any = [];
  constructor(private serivce: CounsellorService, private admissionService: AdmissionService) {
    // Create 100 users

  }
  filterRecdata = async () => {
    await this.filterTableHeaderData();
    this.showDropDown = false;
    //await this.filterTableBodyData(); 
  }
  getTableDataBinding(rec: any, key: any) {
    console.log(key);
    return rec[key.trim()];
  }
  ngOnInit() {
    this.serivce.getCounsellorRec().subscribe(
      (data: any) => {
        this.counsellorData = data;
      }
    );
    this.tableHeaderData.sort();
    this.admissionService.getAdmissionDetail().subscribe(
      (data: any) => {
        this.admissionData = data
        //this.filterTableBodyData();
        this.copyAdmissionData = [...this.admissionData];
        this.filterTableHeaderData();
        this.count = this.admissionData.length
      }
    )
  }


  // filter by sr. no

  filterBySrNo() {

    this.admissionData = this.admissionData.filter((rec: any) => {
      //alert(this.srNo)
      return rec.candidateName.toLocaleLowerCase().match(this.srNo.toLocaleLowerCase());
    });
  }

  // filter by sr. no end





  filterTableHeaderData() {
    this.filterTableHeaderDataJSON = this.tableHeaderData.filter((item) => {
      return item.ischeck;
    })
  }
  filterTableBodyData() {
    this.filterTableBodyJSON = [];
    for (var j = 0; j < this.admissionData.length; j++) {
      var obj: any = {};
      for (var i = 0; i < this.filterTableHeaderDataJSON.length; i++) {
        obj[this.filterTableHeaderDataJSON[i].lable] = this.admissionData[j][this.filterTableHeaderDataJSON[i].lable];
      }
      this.filterTableBodyJSON.push(obj);
    }
    console.log(this.filterTableBodyJSON);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  selectedOperator: any
  filterTableData() {
    // console.log(this.filterTableHeaderData);
    //this.filterTableHeaderDataJSON = [];

    for (var i = 0; i < this.filterTableHeaderDataJSON.length; i++) {
      if (this.filterTableHeaderDataJSON[i].selectedValue && this.filterTableHeaderDataJSON[i].selectedOperator) {
        if (this.filterTableHeaderDataJSON[i].selectedOperator === '==') {
          this.admissionData = this.admissionData.filter((item: any) => {
            if(item[this.filterTableHeaderDataJSON[i].lable]) {
              return item[this.filterTableHeaderDataJSON[i].lable] == (this.filterTableHeaderDataJSON[i].selectedValue);
            }
            return
          });
        }
        if (this.filterTableHeaderDataJSON[i].selectedOperator === '>') {
          this.admissionData = this.admissionData.filter((item: any) => {
            if(item[this.filterTableHeaderDataJSON[i].lable]) {
              return item[this.filterTableHeaderDataJSON[i].lable] > (this.filterTableHeaderDataJSON[i].selectedValue);
            }
            return
          });
        }
        if (this.filterTableHeaderDataJSON[i].selectedOperator === '<') {
          this.admissionData = this.admissionData.filter((item: any) => {
           if(item[this.filterTableHeaderDataJSON[i].lable]) {
            return item[this.filterTableHeaderDataJSON[i].lable] < (this.filterTableHeaderDataJSON[i].selectedValue);
           }
           return
          });
        }
        if (this.filterTableHeaderDataJSON[i].selectedOperator === '<=') {
          this.admissionData = this.admissionData.filter((item: any) => {
            if(item[this.filterTableHeaderDataJSON[i].lable]) {
            return item[this.filterTableHeaderDataJSON[i].lable] <= (this.filterTableHeaderDataJSON[i].selectedValue);
            }
            return
          });
        }
        if (this.filterTableHeaderDataJSON[i].selectedOperator === '>=') {
          this.admissionData = this.admissionData.filter((item: any) => {
            if(item[this.filterTableHeaderDataJSON[i].lable]) {
            return item[this.filterTableHeaderDataJSON[i].lable] >= (this.filterTableHeaderDataJSON[i].selectedValue);
            }
            return
          });
        }
         console.log(this.admissionData)
      }
      }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selectedCouncellorId = ''
  setCouncellorId(event: any) {
    this.selectedCouncellorId = event.target.value;

    this.admissionData = this.copyAdmissionData.filter((item: any) => {
      return item.counsellorId == this.selectedCouncellorId;
    })
  }
  submitData() {
    console.log("line no:51 " + JSON.stringify(this.formJSON));

    this.admissionService.insertAdmissionDetail(this.formJSON).subscribe(
      (data: any) => {
        this.formJSON = {};
        this.admissionService.getAdmissionDetail().subscribe(
          (data: any) => {
            this.admissionData = data;
            this.copyAdmissionData = [...this.admissionData];
            this.count = this.admissionData.length
          }
        )
        // this.admissionData.push(data);
        //$("#exampleModal").modal("hide");
      }
    )
  }
  getId(id: any) {
    // alert(id);
    this.counsellorRecId = id;
  }
  deleteRec() {
    this.admissionService.deleteRecById(this.counsellorRecId).subscribe(
      (data) => {
        let selectedCourseRecIndex = this.admissionData.findIndex((item: any) => item.id === parseInt(this.counsellorRecId));
        if (selectedCourseRecIndex !== -1) {
          this.admissionData.splice(selectedCourseRecIndex, 1);
        }
        $("#delete_department").modal("hide");
      }

    )
  }
  editCourse(item: any) {
    this.formJSON = { ...item };
    this.formJSON.isEdit = true;
  }
  updateRec() {
    let tempObj = {
      id: this.formJSON.id,
      counsellorName: this.formJSON.counsellorName,
      email: this.formJSON.email,
      address: this.formJSON.address,
      mobileNo: this.formJSON.mobileNo
    }
    this.serivce.updateRec(tempObj).subscribe(
      (data: any) => {
        let selectedCourseRecIndex = this.admissionData.findIndex((item: any) => item.id === parseInt(this.formJSON.id));
        if (selectedCourseRecIndex !== -1) {
          this.admissionData[selectedCourseRecIndex] = data;
        }

        $("#exampleModal").modal("hide");
      }
    )
  }
  Search() {
    if (this.search == "") {
      this.admissionData = [...this.copyAdmissionData];
    } else {
      this.admissionData = this.admissionData.filter((item: any) => {
        if (item.contact.toLocaleLowerCase().match(this.search.toLocaleLowerCase())) {
          return item.contact.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        }
        else if (item.candidateName.toLocaleLowerCase().match(this.search.toLocaleLowerCase())) {
          return item.candidateName.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        }
        else {
          return item.counsellor?.counsellorName.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        }

      })
    }
  }
  aadharLenght: any = [];
  options() {
    //alert("working")
    this.admissionData.reverse();
  }
}




