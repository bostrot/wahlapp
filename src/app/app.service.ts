import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// Global injectable service
/*

wirklich parteilos
  daher umsetzung der besten Ideen - parteiunabhängig

Meine Themen nach der Wahl:

  Klimaschutz/Umweltschutz

  Schulpolitik
  Moderne, saubere Schulen
  Genügend Schulplätze

  Kostenlose Bahnen und Busse
  Autofreie Innenstadt

  Wiederaufbau Jugendeinrichtungen


*/
export class AppService {
  orderArray = [1,2,3,4,5,6,7,8,9,10,11];
  apiUrl = 'https://localhost:4006/api/';
  sendBtn = 'Send';
  continueBtn = 'Continue';
  startBtn = 'Start';
  agreeBtn = 'Next';
  infoHeader = 'Some Heading!';
  info1 = 'Program 1';
  info2 = 'Program 2';
  info3 = 'Program 3';
  info4 = 'Program 4';
  aboutHeader = 'What is important for you?';
  aboutSubheader = 'Sort the topics by importance.';
  genderQuestion = 'Gender';
  genderQuestions = [
    'Male',
    'Female',
    'Other'
  ];
  ageQuestion = 'Age';
  ageQuestions = [
      '14-17',
      '18-29',
      '30-49',
      '50-64',
      '65+',
  ]
  disclaimer = '(all data will be safed anonymously)';
  topicMostImportant = 'Important';
  topicLeastImportant = 'Less important';
  resultsHeader = 'Survey results of the topics';
  resultsFooter = 'Order according to the most chosen importance.';
  about = [
    'Climate / environmental protection ',
    'Modern, clean schools',
    'Enough school places',
    'More youth facilities',
    'Free trains and buses',
    'Car-free inner city',
    'Clean town center',
    'Cheap apartments for students',
    'Barrier-free environment',
    'Feeling of security',
    'Leisure activities, e.g. cinema, theater' ,
  ];
  origAbout = this.about;
  // ageQuestion = 'Wie alt bist du?';
  question1 = 'Which of these is your most important topic?';
  answer1 = '';
  question2 = 'What topic are you still missing?';
  answer2 = '';
  question3 = 'Are you going to vote?';
  answer3 = '';
  question4 = 'What can I personally do to get you to vote?';
  answer4 = '';
  chartData1 = 50;
  chartData2 = 30;
  chartData3 = 10;
  chartData4 = 10;
  videodesc = 'You can see a brief insight in the video above.'
  videotags = '#GoVote #VoteForYou';
  audioSrc1 = '../../assets/audio/Robert_Frage1.mp3'
  audioSrc2 = '../../assets/audio/Robert_Frage2.mp3'
  audioSrc3 = '../../assets/audio/Robert_Frage1.mp3'
  audioSrc4 = '../../assets/audio/Robert_Frage3.mp3'

  // navigation
  constructor(
    private _router: Router,
    ) { }

  navigate(target, params = {}) {
    this._router.navigate([target], { queryParams: params });
  }
  navigateToQuiz() {
    this._router.navigate(['quiz']);
  }
}
