import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent implements OnInit {
  User = {};
  email = "";
  limit = "";
  wallet = "";
  edit = false;
  lastname = "";
  username = "";
  password = "";
  firstname = "";
  nationalID = "";
  viewedit = true;
  supplier = false;
  dateOfBirth = "";
  mobileNumber = "";
  loggedinuser: any;

  constructor(private router: Router, private activerouter: ActivatedRoute, private UserSer: UserService) {
  }
  ngOnInit(): void {
    this.activerouter.paramMap.subscribe((res: any) => {
      // console.log(res)
      this.getUser(res.params.id);
    })

  }
  saveInfo(id) {
    this.edit = !this.edit;
    // console.log(this.edit);
    if (this.edit != true) {
      this.activerouter.paramMap.subscribe((res: any) => {
        // console.log(res)
        this.UserSer.updateInfo(res.params.id, this.firstname, this.lastname, this.password, this.mobileNumber, this.dateOfBirth, this.email).subscribe(
          (res: any) => {
            // console.log(res);
            this.User = res;
            this.router.navigateByUrl('') // In implementation navigation goes to users page

          }
        )

      })
    }
  }
  getUser(id) {
    this.loggedinuser = JSON.parse(localStorage.getItem("currentuser")).user;
    if (this.loggedinuser == null) {
      this.supplier = true;
      this.loggedinuser = JSON.parse(localStorage.getItem("currentuser")).supplier
    }

    // console.log(this.loggedinuser)
    if (this.loggedinuser._id == id) {
      this.viewedit = true;
    }
    else {
      this.viewedit = false;
    }
    this.UserSer.getUser(id).subscribe(
      (res: any) => {
        this.User = res;
        // console.log(res);
        // console.log("USER", this.User)
      }
    )

  }

}
