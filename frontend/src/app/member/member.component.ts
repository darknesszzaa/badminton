import { Component, OnInit, Inject } from '@angular/core';
import { MemberService } from '../app.service';
import { AddMemberComponent } from '../add-member/add-member.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  memberList = [];
  constructor(private memberService: MemberService, public dialog: MatDialog) { }
  public ngOnInit() {
    this.memberService.getMembers().subscribe((data) => {
      this.memberList = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      height: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  public join(input) {
    this.memberService.join(input).subscribe((data) => {
    });
  }

}
