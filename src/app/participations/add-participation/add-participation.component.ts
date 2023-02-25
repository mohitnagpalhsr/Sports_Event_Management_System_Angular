import { Component, OnInit } from '@angular/core';
import { Participation } from 'src/app/Models/Participation';
import { ParticipationsService } from 'src/app/participations.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Sport } from 'src/Models/Sport';
import { SportsService } from 'src/app/sports.service';
import { EventsService } from 'src/app/events.service';
import { PlayersService } from 'src/app/players.service';
import { Player } from 'src/Models/Player';

@Component({
  selector: 'app-add-participation',
  templateUrl: './add-participation.component.html',
  styleUrls: ['./add-participation.component.css']
})
export class AddParticipationComponent implements OnInit{
  id:string;
  sportsname:Sport[];
  message:string;
  elist1:any;
  elist2:any;
  elist3:any;
  sporterror:boolean;
  nodata:boolean;

  ngOnInit(): void {
    this.sportservice.getsports().subscribe({
      next:data=>{
        this.sportsname=data;
      },
      error: (err: HttpErrorResponse) => this.sporterror = true
  })
  }

  constructor(private participationservice:ParticipationsService, private sportservice:SportsService, private eventservice:EventsService, private playerservice:PlayersService){

  }
  p:Participation={participationId:null,playerId:null,playerName:"",eventId:null,eventName:"",sportsId:null,sportsName:"",status:"",comments:""};

  s:number;
  value1(event:any){
    var e=event.target[event.target.selectedIndex].text;
    this.p.sportsName=e;
    this.sportservice.getSportByName(this.p.sportsName).subscribe({
      next:data=>{
        this.p.sportsId=data.sportsId;    //finding sports id
      },
      error: (err: HttpErrorResponse) => this.nodata = true
    })

    console.log(this.p.sportsName);
    
    this.playerservice.getPlayersBySportName(this.p.sportsName).subscribe({
      next:data=>{
        this.elist3=data;     //finding players with same sports name
      },
      error: (err: HttpErrorResponse) => this.nodata = true
    })
    

    if(this.p.sportsName){
      this.eventservice.eventsHavingSport(this.p.sportsName).subscribe({
        next:data=>{
          this.elist1=data;   //finding events with same sports name
        },
        error: (err: HttpErrorResponse) => this.nodata = true
      })
    }

    // this.s=this.p.sportsId;
    // console.log(this.p.sportsId);
    
  }
  

  val3(event:any){
    var f=event.target[event.target.selectedIndex].text;
    this.p.eventName=f;
    console.log(this.p.eventName);
    this.eventservice.getEventByName(this.p.eventName).subscribe({
      next:data=>{
        this.p.eventId=data.eventId;
      },
      error: (err: HttpErrorResponse) => this.nodata = true
    })
  }

  val2(event:any){
    //console.log(this.p.sportsId);
    var g=event.target[event.target.selectedIndex].text;
    this.p.playerName=g;
    this.playerservice.getPlayerByName(this.p.playerName).subscribe({
      next:data=>{
        this.p.playerId=data.playerId;
      },
      error: (err: HttpErrorResponse) => this.nodata = true
    })
    
  }

  saveparticipation(data:any):void
  {
   this.participationservice.addparticipation(data).subscribe(
     data=>{
       this.message="Participation Added Successfully";
    }
   ) 
    console.log(data);
    console.log(this.p);
  }
}
