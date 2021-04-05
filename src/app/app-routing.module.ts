import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { VideoComponent } from './video/video.component';
import { InfoComponent } from './info/info.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/start', 
    pathMatch: 'full' 
  },
  {
    path: 'start',
    component: StartComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  { 
    path: 'results',
    component: ResultsComponent,
  },
  { 
    path: 'video',
    component: VideoComponent,
  },
  { 
    path: 'info',
    component: InfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
