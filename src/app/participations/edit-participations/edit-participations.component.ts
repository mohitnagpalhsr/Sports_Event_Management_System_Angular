import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Participation } from 'src/app/Models/Participation';
import { ParticipationsService } from 'src/app/participations.service';
import { Sport } from 'src/Models/Sport';
import { SportsService } from 'src/app/sports.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-participations',
  templateUrl: './edit-participations.component.html',
  styleUrls: ['./edit-participations.component.css']
})
export class EditParticipationsComponent {
  sportsname:Sport[];
  message:string;
  p:Participation;
  id:string;
  sporterror:boolean;

  applicationStatus = ['approved', 'pending', 'declined'];
  constructor(private participationservice:ParticipationsService,private route:Router,private router:ActivatedRoute, private sportservice:SportsService) 
  {
     this.id=this.router.snapshot.paramMap.get('id');
     
  }

  ngOnInit(): void {
    this.participationservice.getparticipation(this.id).subscribe(
      data=>{
        this.p=data;
      }
    )

    this.sportservice.getsports().subscribe({
      next:data=>{
        this.sportsname=data;
      },
      error: (err: HttpErrorResponse) => this.sporterror = true
  })
  }

  value1(event:any){
    console.log(event.target[event.target.selectedIndex].text);
  }

  Update(participation:Participation)
  {
    let id=participation.participationId;
    this.participationservice.editparticipation(id,participation).subscribe({
      next:data=>{
        this.message="Participation Updated Successfully";
      },
      error: (err: HttpErrorResponse) => this.message="Failed to add participation data"
  })
  }
}
