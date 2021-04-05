import {
  Component,
  OnInit, EventEmitter
} from '@angular/core';
import {
  AppService
} from '../app.service';
import {
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import {
  HttpClient
} from '@angular/common/http';
import {
  FormBuilder
} from '@angular/forms';
import { Options } from 'ng5-slider';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  checkoutForm;
  order: string;
  age: string;
  gender: string;
  constructor(
    private route: ActivatedRoute,
    public app: AppService,
    private http: HttpClient,
    private formBuilder: FormBuilder, ) {
    this.checkoutForm = this.formBuilder.group({
      q1: '',
      q2: '',
      q3: '',
      q4: '',
    });
  }

  faVolumeUp = faVolumeUp;

  public value = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ];
  
  optionsAge: Options = {
    animate: false,
    floor: 15,
    ceil: 99,
    step: 1,
    showTicks: false,
    getPointerColor: (value: number): string => {
        return '#C5E1A5';
    },
    getSelectionBarColor: (minValue: number, maxValue: number): string => {
      return '#C5E1A5';
    },
  };
  options: Options = {
    animate: false,
    floor: 0,
    ceil: 10,
    step: 1,
    hideLimitLabels: true,
    showTicks: true,
    showTicksValues: false,
    hidePointerLabels: true,
    getPointerColor: (value: number): string => {
        return '#C5E1A5';
    },
    getSelectionBarColor: (minValue: number, maxValue: number): string => {
      return '#C5E1A5';
    },
    stepsArray: [
      {value: 1, legend: 'Unwichtig'},
      {value: 2},
      {value: 3},
      {value: 4},
      {value: 5, legend: 'Wichtig'},
    ]
  };
  
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { order: "popular" }

        this.order = params.order;
        this.age = params.age;
        this.gender = params.gender;
        console.log(this.order); // popular
      }
    );
  }

  playAudio1() {
    let audio = new Audio();
    audio.src = this.app.audioSrc1;
    audio.load();
    audio.play();
  }

  playAudio2() {
    let audio = new Audio();
    audio.src = this.app.audioSrc2;
    audio.load();
    audio.play();
  }

  playAudio3() {
    let audio = new Audio();
    audio.src = this.app.audioSrc3;
    audio.load();
    audio.play();
  }

  playAudio4() {
    let audio = new Audio();
    audio.src = this.app.audioSrc4;
    audio.load();
    audio.play();
  }

  onSubmit(data) {
    this.http.post(this.app.apiUrl + 'stats', {stats: this.order,
      age: this.age, gender: this.gender, answers: data}).toPromise()
           .then((res) => {
            console.warn('Data submitted')
           })
           .catch((err) => {});
    this.app.navigate('results');
  }
}
