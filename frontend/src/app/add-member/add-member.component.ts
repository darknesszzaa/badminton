import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from '../app.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent {
  max = 10;
  name = '';
  strategy = 0;
  public url: any = '';
  constructor(
    public dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private memberService: MemberService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public addMember() {

    const data = { name: this.name, strategy: this.strategy, isJoin: false, img: this.url }

    this.memberService.addMember(data).subscribe((data) => {
      this.dialogRef.close();
    });


  }

  public onSelectFile(event) {
    let me = this;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (eventFile) {
        me.url = reader.result;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
