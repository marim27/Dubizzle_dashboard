import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iadmin } from 'src/app/Models/iadmin';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-add-edit-admins',
  templateUrl: './add-edit-admins.component.html',
  styleUrls: ['./add-edit-admins.component.scss'],
})
export class AddEditAdminsComponent implements OnInit {
  isEdit: boolean = false;
  admin: Iadmin = {} as Iadmin;
  adminsList: Iadmin[] = [];
  adminForm: FormGroup;
  adminID: string = '';

  constructor(
    public AdminAPI: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder
  ) {
    this.adminForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      adminName: ['', [Validators.required, Validators.minLength(2)]],
      password: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z1-9]{6,}')],
      ],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
    });
  }

  // to make condtions that showen in html
  get name() {
    return this.adminForm.get('name');
  }
  get adminName() {
    return this.adminForm.get('adminName');
  }
  get password() {
    return this.adminForm.get('password');
  }
  get email() {
    return this.adminForm.get('email');
  }
  get role() {
    return this.adminForm.get('role');
  }

  ngOnInit(): void {
    this.AdminAPI.getAllAdmins().subscribe((data) => {
      this.adminsList = data;
    });

    this.adminID = this.activatedRoute.snapshot.paramMap.get('id')!; // ! cus it may be undefiend
    console.log(this.adminID);

    this.await ();
  }

  await() {
    if (this.adminID) {
      this.isEdit = true;
      this.AdminAPI.getAdminByIdy(this.adminID).subscribe((admin) => {
        this.admin = admin;
      });
    }
  }

  addAdmin() {
    let isFounded =
      this.adminsList.find(
        (admin) => admin.adminName == this.admin.adminName
      ) || this.adminsList.find((admin) => admin.email == this.admin.email);

    if (isFounded) {
      alert('Duplicated Admin Name Or Email , You must change it ...');
    } else {
      this.AdminAPI.addAdmin(this.admin).subscribe({
        next: (data) => {
          console.log('Data:', data);
          this.router.navigate(['/admins']);
        },
        error: (err) => {
          console.log('Error:', err);
        },
      });
    }
  }
  
  updateAdmin() {
    this.AdminAPI.updateAdmin(this.adminID,this.admin).subscribe({
      next: (data) => {
        console.log('Data:', data);
        this.router.navigate(['/admins']);
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }
}
