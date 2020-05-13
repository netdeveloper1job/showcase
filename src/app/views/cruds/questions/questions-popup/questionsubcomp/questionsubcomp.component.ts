import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questionsubcomp',
  templateUrl: './questionsubcomp.component.html',
  styleUrls: ['./questionsubcomp.component.scss']
})
export class QuestionsubcompComponent implements OnInit {
@Input() myForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
