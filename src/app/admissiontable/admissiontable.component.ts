import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CounsellorService } from '../serivces/counsellor.service';



export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
declare const $ : any;
@Component({
  selector: 'app-admissiontable',
  templateUrl: './admissiontable.component.html',
  styleUrls: ['./admissiontable.component.scss']
})
export class AdmissiontableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;
  counsellorData:any=[];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  formJSON:any = {};
  counsellorRecId:any;
  totalRecords:any;
  page:any = 1;
  count:any;
  constructor(private serivce:CounsellorService) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  ngOnInit() {
    this.serivce.getCounsellorRec().subscribe(
      (data:any)=>{
        this.counsellorData=data;
        this.count = this.counsellorData.length
      }
    )
    }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  submitData()
  {
   
     this.serivce.insertCounsellor(this.formJSON).subscribe(
      (data:any)=>{
        this.counsellorData.push(data);
        $("#exampleModal").modal("hide");
        this.formJSON={};
        this.count = this.counsellorData.length
      }
    )
  }
  getId(id:any){
    // alert(id);
    this.counsellorRecId=id;
    }
    deleteRec(){
        this.serivce.deleteRecById(this.counsellorRecId).subscribe(
          (data)=>{
            let selectedCourseRecIndex =  this.counsellorData.findIndex( (item:any) => item.id === parseInt(this.counsellorRecId));
            if (selectedCourseRecIndex !== -1) {
              this.counsellorData.splice(selectedCourseRecIndex, 1);
              this.count = this.counsellorData.length
            }
            $("#delete_department").modal("hide");
          }
         
        )
    }
    editCourse(item:any){
      this.formJSON = {...item};
      this.formJSON.isEdit = true;
  }
    updateRec(){
      let tempObj = {
        id:this.formJSON.id,
        counsellorName:this.formJSON.counsellorName,
        email:this.formJSON.email,
        address:this.formJSON.address,
        mobileNo:this.formJSON.mobileNo
      }
      this.serivce.updateRec(tempObj).subscribe(
        (data:any)=>{
          let selectedCourseRecIndex =  this.counsellorData.findIndex( (item:any) => item.id === parseInt(this.formJSON.id));
          if (selectedCourseRecIndex !== -1) {
            this.counsellorData[selectedCourseRecIndex] = data;
          }
      
          $("#exampleModal").modal("hide");
        }
      )
    }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };

  
}