import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ILocation } from 'src/app/Models/ilocation';
import { IUser } from 'src/app/Models/iuser';
import { LocationService } from 'src/app/Services/Location/location.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent {
  allUsers: IUser[] = [];
  filterUsers: IUser[] = [];
  allLocation:ILocation[]=[];

  constructor(public userService: UserService,
    public locationService: LocationService,
    public router: Router){ }

  set ListSearchFilter(value: string) {
    this.filterUsers = this.searchFilter(value);
  }

  //set select filter by product status
  set ListFilterLocation(data: string) {
    this.filterUsers = this.filterLocations(data)
  }

  ngOnInit(): void {
    let location
    // get all users
    this.userService.getAllUsers().subscribe({
      next:(data)=>{
        // get all locations
        this.locationService.getAllLocations().subscribe({
          next:(data2)=>{
            console.log(data);
            // console.log(data2);
            this.allUsers = data.data.users;

            this.allLocation = data2;
            this.filterUsers= this.allUsers.map(user =>{
              location = this.allLocation.find(l => l._id===user.locationID)
              user.locationID = location ? location.title : '';
              return user;
            });
          }
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

  searchFilter(filterValue: string): IUser[] {
    filterValue = filterValue.toLowerCase();
    return this.allUsers.filter((user: IUser) =>
      user.username.toLowerCase().includes(filterValue)
    );
  }

  showInput: boolean = false;
  showHideInputSearch() {
    this.showInput = !this.showInput;
  }

  filterLocations(value:any):IUser[]{
    if(value != "all"){
      return this.allUsers.filter(l =>l.locationID === value);
    }
    return this.allUsers;
  }

  deleteUser(id:any){
    let _confirm = confirm("Are you sure to delete this user ^_^")
    if (_confirm) {
      this.userService.deleteUser(id).subscribe({
        next: (data) => {
          console.log("Data:", data);
          this.filterUsers = this.filterUsers.filter(u => u._id != id)
        },
        error: (err) => {
          console.log('Error:', err)
        }
      })
    }
  }

  updateStatus(userID: string,newStatus:string){
    let updatedUser
    this.userService.getUserByID(userID).subscribe({
      next:(data)=>{
        console.log(data);
        console.log(newStatus);
        updatedUser =data.data.user;
        console.log(updatedUser);
        this.userService.editUserStatus(userID, newStatus).subscribe({
          next:(data)=>{
            console.log(data);
          }
        })
      }
    })
  }

}
