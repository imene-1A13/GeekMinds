import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demande } from 'src/app/Models/Demande';
import { User } from 'src/app/Models/User';
import { DashboardServices } from 'src/app/Services/Dashboardservices.service';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit{
  Listusers: any;
  user: User = {} as User;
  imene!: FormGroup; 

  downloadLink: string | null = null;

  activeTable = 'users-table'; // Initialize with the default table name
listdemands:any;
constructor(private service :UserService,private serviced:DashboardServices,private httpClient: HttpClient, private fb: FormBuilder){}



  ngOnInit(): void {
    this. getAllUsers();
    this.getalldemands();

    this.imene = this.fb.group({
      username: [this.user.username, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
  
   
  });
  

  }
  fetchDownloadLink(id: number) {
    this.serviced.Downloadcv(id).subscribe(
      (response) => {
        console.log('Received HTML response:', response);
        // You can render the HTML content in your component or use it as needed.
      },
      (error) => {
        console.error('Error fetching download link:', error);
      }
    );
  }
  
getalldemands()
{this.serviced.getalldemands().subscribe(res => this.listdemands = res);}

getAllUsers() {
  this.service.getallusers().subscribe(res => this.Listusers = res);

}
blockUser(id: number) {
  this.service.blockUser(id).subscribe((result) => {
    if (result) {
      const user = this.Listusers.find((u: { idUser: number; }) => u.idUser === id);
      if (user) {
        user.blocked = true;
      }
    }
  });
}
downloadCV(id: number) {

  this.serviced.Downloadcv(id).subscribe((data: Blob) => {
    const user = this.Listusers.find((u: { idUser: number; }) => u.idUser === id);

    const blob = new Blob([data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'cv.pdf'; // You can specify any desired filename
    link.click();
    window.URL.revokeObjectURL(link.href);

  });
}

 addadmin()
 {  const UserData = this.imene.value; 
  
  this.serviced.addadmin(UserData).subscribe(
  (response) => {
    console.log('User registered successfully:', response);
    


  },
  (error) => {
    console.error('Error adding user:', error);
  }
);}
unblockUser(id: number) {
  this.service.unblockUser(id).subscribe((result) => {
    if (result) {
      // Update the user's blocked status in the Listusers array
      const user = this.Listusers.find((u: { idUser: number; }) => u.idUser === id);
      if (user) {
        user.blocked = false;
      }
    }
  });
}


toggleUserStatus(user: User) {

  if (user.blocked) {
    user.blocked = !user.blocked;
    this.unblockUser(user.idUser);
  } else {
    user.blocked = !user.blocked;
    this.blockUser(user.idUser);
  }
}
toggleTable(table: string) {
  this.activeTable = table;
}


Deny(id: number) {
  this.serviced.Deny(id).subscribe((result) => {
    if (result) {
      const demand = this.listdemands.find((d: { iddemande: number; }) => d.iddemande === id);
      if (demand) {
        demand.demandstatus = false;
      }
    }
  });
}

Accept(id: number) {
  this.serviced.Accept(id).subscribe((result) => {
    if (result) {
      const demand = this.listdemands.find((d: { iddemande: number; }) => d.iddemande === id);
      if (demand) {
        demand.demandstatus = true;
      }
    }
  });
}

toggleDemandrStatus(demand:Demande)
{
  if (demand.demandstatus) {
    demand.demandstatus= !demand.demandstatus;
    this.Deny(demand.iddemande);
  } else {
    demand.demandstatus= !demand.demandstatus;
    this.Accept(demand.iddemande);
  }
}

Deletedemand(id:number)
{
this.serviced.deletedemand(id).subscribe(data=>{console.log(data);
  this.getalldemands;
})}
alertdemand(id :number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This process is irreversible.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, go ahead.',
    cancelButtonText: 'No, let me think',
  }).then((result) => {
    if (result.value) {
      this.Deletedemand(id);

      Swal.fire('Removed!', 'Demand was removed successfully.', 'success').then(() => {
        location.reload();
      });

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Demand still in our database.', 'error');
    }
  });
}

}
