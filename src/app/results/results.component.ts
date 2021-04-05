import {
  Component,
  OnInit,
  Injectable
} from '@angular/core';
import {
  AppService
} from '../app.service';
import * as Chart from 'chart.js'
import {
  HttpClient
} from '@angular/common/http'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})


export class ResultsComponent implements OnInit {
  constructor(
    public app: AppService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {}

  canvas: any;
  ctx: any;
  results: any;

  ngAfterViewInit() {

    // Generate top chart
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [
            this.app.chartData4
          ],
          backgroundColor: [
            'rgba(54, 162, 235, .7)'
          ],
        }],
        labels: ['Anzahl der Stimmen'],
      },
      options: {
        responsive: true,
        cutoutPercentage: 70,
        legend: {
          display: false
        }
      }
    });

    // Get stats / count from api endpoint
    this.http.get < any > (this.app.apiUrl + 'stats').subscribe(data => {
      const entries = data.entries;
      data = data.stats;
      const data0 = data;
      // TODO: Age
      // createChart('chart12', data.s12['0'], data.s12['25'], data.s12['50'], data.s12['75'], data.s12['100']);

      // Returns element with highest value
      const max = function(object) {
        let highest = '0';
        let highestNum = 0;
        Object.keys(object).forEach(function(element, key, _array) {
          if (object[element] > highestNum){
            highestNum = object[element];
            highest = element;
          }
        });
        return highest;
      }

      this.results = '';
      var resultsDiv = document.getElementById('results');

      var newArray = [];
      var entryCount = 0;
      for (var i = 0; i < 10; i++) {
        newArray[i] = [data[i], this.app.about[i]];
        entryCount += newArray[i][0];
      }
      // Sort first in 2D array
      function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
      }
      data = newArray;
      data.sort(sortFunction);
      // Highest points first
      data.reverse();
      console.log(data)

      for (var i = 0; i < 10; i++) {
        var upperDiv = document.createElement('div');
        const percentage = data[i][0] / data[0][0] * 100;
        console.log(percentage)
        var progressText = document.createElement('p');
        var num = i + 1;
        progressText.innerText = num + '. ' + data[i][1];
        var progressDiv = document.createElement('div');
        progressDiv.className = 'progress';
        progressDiv.style.margin = '2em';
        progressDiv.style.height = '2em';
        var progressBar = document.createElement('div');
        /* progressBar.innerText = data[i][highest] + ' Stimmen'/* von ' + (entries / 10) ; */
        progressBar.className = 'progress-bar';
        progressBar.style.width = percentage.toFixed()+'%';
        progressBar.style.backgroundColor = '#C5E1A5';
        progressBar.setAttribute['role'] = 'progressbar';
        progressDiv.appendChild(progressBar);
        upperDiv.appendChild(progressText);
        upperDiv.appendChild(progressDiv);
        resultsDiv.appendChild(upperDiv);
      }

      // Register for Chart plugin
      Chart.pluginService.register({
        beforeDraw: function (chart) {
          var width = chart['chart'].width,
            height = chart['chart'].height,
            ctx = chart['chart'].ctx;

          ctx.restore();
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em 'Ubuntu', sans-serif";
          ctx.fillStyle = "#01579B"
          ctx.textBaseline = "middle";
          // Draw text percentage inside every chart
          switch (chart['id']) {
            case 0:
              var text = '9'+entries,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2 + 4;
              ctx.fillText(text, textX, textY);
              ctx.save();
              break;
          }
        }
      });
    })
  }
}
