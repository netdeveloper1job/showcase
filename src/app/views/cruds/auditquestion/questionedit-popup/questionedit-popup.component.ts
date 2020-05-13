import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-questionedit-popup',
  templateUrl: './questionedit-popup.component.html',
  styleUrls: ['./questionedit-popup.component.scss']
})
export class QuestioneditPopupComponent implements OnInit {
  public itemForm: FormGroup;
  selected='';
  constructor(
	@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QuestioneditPopupComponent>,
    private fb: FormBuilder
	) { }

  ngOnInit() {
	  this.buildItemForm(this.data.payload)
  }
  
  buildItemForm(item) {
	  console.log(this.data.levels);
	this.selected=item.questionlevelID;
    this.itemForm = this.fb.group({
      Level: [item.questionlevelID || '', Validators.required],
      Question: [item.Question || '', Validators.required],
	  Descriptiveanswer: [item.Descriptiveanswer || ''],
	  Answer1: [item.Answer1 || ''],
	  Answer2: [item.Answer2 || ''],
	  Answer3: [item.Answer3 || ''],
	  Answer4: [item.Answer4 || ''],
	  Answer5: [item.Answer5 || ''],
	  FileUpload1: [item.FileUpload1 || ''],
	  FileUpload2: [item.FileUpload2 || ''],
	  FileUpload3: [item.FileUpload3 || ''],
	  FileUpload4: [item.FileUpload4 || '']
    });
  }
  
   submit() {
    this.dialogRef.close(this.itemForm.value)
    // console.log(this.itemForm.value);
  }

}
