import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-createcompanyadmin',
  templateUrl: './createcompanyadmin.component.html',
  styleUrls: ['./createcompanyadmin.component.scss']
})
export class CreatecompanyadminComponent implements OnInit {

  firstname="";
  lastname="";
  username="";
  email="";
  password="";
  mobileNumber="";
  dateOfBirth="";
  nationalID="";
  employeeLevel="";
  companies = []
  company = ""
  image="";
  err: string = null;
    constructor( private UserServ: UserService,private router:Router, private companyServ : CompanyService) { }
  
    ngOnInit(): void {
    this.companyServ.getCompanies().subscribe((res:any)=>{
      // console.log(res);
      this.companies = res;
    });
    }

  createUser(){
    this.UserServ.createCompanyAdmin(this.firstname,this.lastname,this.username,this.email,this.password,this.mobileNumber,this.dateOfBirth,this.nationalID,"CompanyAdmin",this.image,this.company).subscribe(
      (res: any) => {
      // console.log(res)
      this.router.navigateByUrl('')
      }, err => {
        this.err = err?.error?.err || "Something went wrong";
      }
    )
  
  }
}
