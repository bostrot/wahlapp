import { Component, OnInit } from '@angular/core';
import {
  AppService
} from '../app.service';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(
    public app: AppService,
    ) { }

  ngOnInit(): void {
  }
}
