import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-viewcompanies',
  templateUrl: './viewcompanies.component.html',
  styleUrls: ['./viewcompanies.component.scss']
})
export class ViewcompaniesComponent implements OnInit {
companies :any=[]
companychosen :any
faSearch = faSearch;
companyusername = "";
  constructor(private router: Router,private activerouter: ActivatedRoute, private CompanySer: CompanyService) { }

  ngOnInit(): void {
this.getCompanies()
  }
  getCompanies(search=null){
    this.CompanySer.getCompanies(search).subscribe(
      (res:any) => {
        this.companies = res;
        // console.log(res);
        // console.log("USERS",this.companies)
      }
    )
  
  
  }

  search(){
    this.getCompanies(this.companyusername);
  }
  viewCompany(id:string){
    this.router.navigateByUrl('/viewcompany/'+id+"")
   
  }
}
