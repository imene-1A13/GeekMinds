import { Component, OnInit } from '@angular/core';
import { DashboardServices } from 'src/app/Services/Dashboardservices.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit {
  ngOnInit(): void {
    this.getAllReclamations();
  }
  constructor(private service: DashboardServices) { }

  Listreclams: any;
  reclamation:any;

  getAllReclamations() {
    this.service.listreclamation().subscribe(res => this.Listreclams = res);
  }


  deletereclam(id: number)
  {
    this.service.deletereclamation(id).subscribe(data=>{console.log(data);
  this.getAllReclamations;
  })}
  alertConfirmation(id :number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        this.deletereclam(id);
  
        Swal.fire('Removed!', 'Reclamation was removed successfully.', 'success').then(() => {
          location.reload();
        });
  
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Reclamation still in our database.', 'error');
      }
    });
  }
}
