import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-mysubcomponent',
  templateUrl: './mysubcomponent.component.html',
  styleUrls: ['./mysubcomponent.component.scss']
})
export class MysubcomponentComponent implements OnInit {
@Input() myForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
