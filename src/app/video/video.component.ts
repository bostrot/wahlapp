import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AppService } from '../app.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

interface Selector {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {
  
  genderValue = '';
  genders: Selector[] = [
    {value: 'gender-m', viewValue: this.app.genderQuestions[0]},
    {value: 'gender-w', viewValue: this.app.genderQuestions[1]},
    {value: 'gender-d', viewValue: this.app.genderQuestions[2]}
  ];

  ageValue = '';
  ages: Selector[] = [
    {value: 'age0', viewValue: this.app.ageQuestions[0]},
    {value: 'age1', viewValue: this.app.ageQuestions[1]},
    {value: 'age2', viewValue: this.app.ageQuestions[2]},
    {value: 'age3', viewValue: this.app.ageQuestions[3]},
    {value: 'age4', viewValue: this.app.ageQuestions[4]},
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.app.about, event.previousIndex, event.currentIndex);
    moveItemInArray(this.app.orderArray, event.previousIndex, event.currentIndex);
    console.log(this.app.orderArray)
  }

  faGripLines = faGripLines;
  checkoutForm;
  constructor(
    public app: AppService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    ) { 
      this.checkoutForm = this.formBuilder.group({
        arr: [],
      });
   }


  ngOnInit(): void {
  }

  onSubmit(data) {
    this.app.navigate('quiz', {order: JSON.stringify(this.app.orderArray),
      age: this.ageValue, gender: this.genderValue});
  }
}

@Pipe({name: 'html'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }
}
