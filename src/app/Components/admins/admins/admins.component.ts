import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iadmin } from 'src/app/Models/iadmin';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  adminList: Iadmin[] = [];

  constructor(
    public AdminAPI: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.AdminAPI.getAllAdmins().subscribe((data) => {
      this.adminList = data;
      console.log(data);
    });
  }

  // delete admin
  deleteAdmin(id: string) {
    const confirmed = confirm('Are you sure you want to delete this SubCategory?');

    this.AdminAPI.deleteAdmin(id).subscribe({
      next: (data) => {
        console.log('Data:', data);
        this.adminList = this.adminList.filter((item) => item._id != id);
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }
}
