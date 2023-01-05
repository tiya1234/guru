import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionDetailComponent } from './admission-detail/admission-detail.component';
import { AdmissionComponent } from './admission/admission.component';
import { AdmissiontableComponent } from './admissiontable/admissiontable.component';
import { CounsellordetailComponent } from './counsellordetail/counsellordetail.component';
import { AuthGuard } from './jwtservice/auth.guard';
import { LoginComponent } from './login/login.component';
import { CounsellorService } from './serivces/counsellor.service';

const routes: Routes = [
  {path:"home" , component:AdmissiontableComponent,canActivate:[AuthGuard]},
  {path:"counsellorDetail/:id",component:CounsellordetailComponent,canActivate:[AuthGuard]},
  {path:'counsellorName',component:AdmissiontableComponent,canActivate:[AuthGuard]},
  {path:'admission',component:AdmissionDetailComponent,canActivate:[AuthGuard]},
  {path:'adm',component:AdmissionComponent,canActivate:[AuthGuard]},
  {path:'',component:LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
