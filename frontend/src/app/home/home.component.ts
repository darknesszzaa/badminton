import { Component, OnInit } from '@angular/core';
import { MemberService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  memberList = [];
  team = { teamA: { score: 0, teamMember: [], totalStrategy: 0 }, teamB: { score: 0, teamMember: [], totalStrategy: 0 }, updateDate: new Date() }
  totalJoin = 0;
  constructor(private memberService: MemberService) { }

  public ngOnInit() {
    this.memberService.getMembers().subscribe((data) => {
      this.memberList = data;
    });

    this.memberService.getTeam().subscribe((data) => {
      this.team = data;
    });

    this.memberService.getTotalPlayerJoin().subscribe((data) => {
      this.totalJoin = data.total;
    });
  }

  public getGenerateTeam() {
    this.memberService.getGenerateTeam().subscribe((data) => {
      this.team = data;
    });
  }


}
