import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray  } from '@angular/forms';
import { DataLayerGuard } from '../../../../shared/services/datalayer.guard';

@Component({
  selector: 'app-auditquestionform-popup',
  templateUrl: './auditquestionform-popup.component.html',
  styleUrls: ['./auditquestionform-popup.component.scss']
})
export class AuditquestionformPopupComponent implements OnInit {
  public itemForm: FormGroup;
  selected='';
  questiondata:any;
  items:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AuditquestionformPopupComponent>,
    private fb: FormBuilder,
	private dataservice : DataLayerGuard
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Reporttype: [item.reportID || '', Validators.required],
	  Level: [item.questionLevel || '', Validators.required],
	  Status: [item.Status || true],
	  Question: [item.Question || '', [Validators.required]],
	  Descriptiveanswer: [item.Descriptiveanswer || ''],
	  Answer1: [item.Answer1 || 'Yes'],
	  Answer2: [item.Answer2 || 'No'],
	  Answer3: [item.Answer3 || ''],
	  Answer4: [item.Answer4 || ''],
	  Answer5: [item.Answer5 || ''],
	  FileUpload1: [item.FileUpload1 || ''],
	  FileUpload2: [item.FileUpload2 || ''],
	  FileUpload3: [item.FileUpload3 || ''],
	  FileUpload4: [item.FileUpload4 || '']
	  // formArraybronze: this.fb.array([]),
	  // formArraysilver: this.fb.array([]),
	  // formArraygold: this.fb.array([]),
	  // formArrayplatinum: this.fb.array([]),
	  // formArray: this.fb.array([])
    });
	
	/* this.dataservice.getquestionbylevel(this.id)
	  .subscribe(data => {
			this.questiondata = JSON.parse(data);
			// console.log(this.questiondata.status);
			if(this.questiondata.status == 1){
				// console.log(this.questiondata.data);
				// this.items = this.questiondata.data;
				if(this.questiondata.data[0].Level=='Bronze Level'){
					const arrayControlbronze = <FormArray>this.itemForm.controls['formArraybronze'];
					this.questiondata.data.forEach(item => {
						let newGroup = this.fb.group({
						  Question: [item.Question || '', [Validators.required]],
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
						arrayControlbronze.push(newGroup);
					});
				}
				if(this.questiondata.data[0].Level=='Silver Level'){
					const arrayControlsilver = <FormArray>this.itemForm.controls['formArraysilver'];
					this.questiondata.data.forEach(item => {
						let newGroup = this.fb.group({
						  Question: [item.Question || '', [Validators.required]],
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
						arrayControlsilver.push(newGroup);
					});
				}
				if(this.questiondata.data[0].Level=='Gold Level'){
					const arrayControlgold = <FormArray>this.itemForm.controls['formArraygold'];
					this.questiondata.data.forEach(item => {
						let newGroup = this.fb.group({
						  Question: [item.Question || '', [Validators.required]],
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
						arrayControlgold.push(newGroup);
					});
				}
				if(this.questiondata.data[0].Level=='Platinum Level'){
					const arrayControlplatinum = <FormArray>this.itemForm.controls['formArrayplatinum'];
					this.questiondata.data.forEach(item => {
						let newGroup = this.fb.group({
						  Question: [item.Question || '', [Validators.required]],
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
						arrayControlplatinum.push(newGroup);
					});
				}
				if(this.questiondata.data[0].Level==null){
					const arrayControl = <FormArray>this.itemForm.controls['formArray'];
					this.questiondata.data.forEach(item => {
						let newGroup = this.fb.group({
						  Question: [item.Question || '', [Validators.required]],
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
						arrayControl.push(newGroup);
					});
				}
			}else{
				this.addItembronze();
				this.addItemsilver();
				this.addItemgold();
				this.addItemplatinum();
				this.addItem();
			}
	}); */
	
	
  }

  addItembronze(): void {
	// this.items = this.itemForm.get('items') as FormArray;
	// this.items.push(this.createItem(''));
	const arrayControl = <FormArray>this.itemForm.controls['formArraybronze'];
        let newGroup = this.fb.group({

            Question: ['', Validators.required],
			  Descriptiveanswer: [''],
			  Answer1: ['Yes'],
			  Answer2: ['No'],
			  Answer3: ['May be'],
			  Answer4: [''],
			  Answer5: [''],
			  FileUpload1: [''],
			  FileUpload2: [''],
			  FileUpload3: [''],
			  FileUpload4: ['']

        });
        arrayControl.push(newGroup);
  }

  addItemsilver(): void {
	// this.items = this.itemForm.get('items') as FormArray;
	// this.items.push(this.createItem(''));
	const arrayControl = <FormArray>this.itemForm.controls['formArraysilver'];
        let newGroup = this.fb.group({

            Question: ['', Validators.required],
			  Descriptiveanswer: [''],
			  Answer1: ['Yes'],
			  Answer2: ['No'],
			  Answer3: ['May be'],
			  Answer4: [''],
			  Answer5: [''],
			  FileUpload1: [''],
			  FileUpload2: [''],
			  FileUpload3: [''],
			  FileUpload4: ['']

        });
        arrayControl.push(newGroup);
  }

  addItemgold(): void {
	// this.items = this.itemForm.get('items') as FormArray;
	// this.items.push(this.createItem(''));
	const arrayControl = <FormArray>this.itemForm.controls['formArraygold'];
        let newGroup = this.fb.group({

            Question: ['', Validators.required],
			  Descriptiveanswer: [''],
			  Answer1: ['Yes'],
			  Answer2: ['No'],
			  Answer3: ['May be'],
			  Answer4: [''],
			  Answer5: [''],
			  FileUpload1: [''],
			  FileUpload2: [''],
			  FileUpload3: [''],
			  FileUpload4: ['']

        });
        arrayControl.push(newGroup);
  }

  addItemplatinum(): void {
	// this.items = this.itemForm.get('items') as FormArray;
	// this.items.push(this.createItem(''));
	const arrayControl = <FormArray>this.itemForm.controls['formArrayplatinum'];
        let newGroup = this.fb.group({

            Question: ['', Validators.required],
			  Descriptiveanswer: [''],
			  Answer1: ['Yes'],
			  Answer2: ['No'],
			  Answer3: ['May be'],
			  Answer4: [''],
			  Answer5: [''],
			  FileUpload1: [''],
			  FileUpload2: [''],
			  FileUpload3: [''],
			  FileUpload4: ['']

        });
        arrayControl.push(newGroup);
  }

  addItem(): void {
	// this.items = this.itemForm.get('items') as FormArray;
	// this.items.push(this.createItem(''));
	const arrayControl = <FormArray>this.itemForm.controls['formArray'];
        let newGroup = this.fb.group({

            Question: ['', Validators.required],
			  Descriptiveanswer: [''],
			  Answer1: ['Yes'],
			  Answer2: ['No'],
			  Answer3: ['May be'],
			  Answer4: [''],
			  Answer5: [''],
			  FileUpload1: [''],
			  FileUpload2: [''],
			  FileUpload3: [''],
			  FileUpload4: ['']

        });
        arrayControl.push(newGroup);
  }
  
  // changereport(e){
	  // if(e.value == 'Service Report'){
		  // this.itemForm.removeControl('Level');
		  // this.itemForm.addControl('Level', new FormControl(''));
	  // }else{
		  // this.itemForm.removeControl('Level');
		  // this.itemForm.addControl('Level', new FormControl('', Validators.required));
		  // this.dataservice.checkreport(e.value, this.id)
		  // .subscribe(data => {
				// this.questiondata = JSON.parse(data);
				// console.log(this.questiondata.status);
				// if(this.questiondata.status == 1){
					// this.itemForm.patchValue({
					  // Reporttype: ''
					// });
					// alert("This Level with report "+this.selected+" already exists. Please try with different Level or Report type");
				// }
		  // });
	  // }
  // }
  
  // changelevel(e){
	  // this.dataservice.checklevel(e.value, this.selected, this.id)
	  // .subscribe(data => {
			// this.questiondata = JSON.parse(data);
			// console.log(this.questiondata.status);
			// if(this.questiondata.status == 1){
				// this.itemForm.patchValue({
				  // Level: ''
				// });
				// alert("This Report type already exists. Please try with different Report type");
			// }
	  // });
  // }

  submit() {
    this.dialogRef.close(this.itemForm.value)
    // console.log(this.itemForm.value);
  }
}
