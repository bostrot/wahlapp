"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResultsComponent = void 0;
var core_1 = require("@angular/core");
var Chart = require("chart.js");
var ResultsComponent = /** @class */ (function () {
    function ResultsComponent(app, http) {
        this.app = app;
        this.http = http;
    }
    ResultsComponent.prototype.ngOnInit = function () { };
    ResultsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
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
                        ]
                    }],
                labels: ['Anzahl der Stimmen']
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
        this.http.get(this.app.apiUrl + 'stats').subscribe(function (data) {
            var entries = data.entries;
            data = data.stats;
            var data0 = data;
            // TODO: Age
            // createChart('chart12', data.s12['0'], data.s12['25'], data.s12['50'], data.s12['75'], data.s12['100']);
            // Returns element with highest value
            var max = function (object) {
                var highest = '0';
                var highestNum = 0;
                Object.keys(object).forEach(function (element, key, _array) {
                    if (object[element] > highestNum) {
                        highestNum = object[element];
                        highest = element;
                    }
                });
                return highest;
            };
            _this.results = '';
            var resultsDiv = document.getElementById('results');
            var newArray = [];
            var entryCount = 0;
            for (var i = 0; i < 10; i++) {
                newArray[i] = [data[i], _this.app.about[i]];
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
            console.log(data);
            for (var i = 0; i < 10; i++) {
                var upperDiv = document.createElement('div');
                var percentage = data[i][0] / data[0][0] * 100;
                console.log(percentage);
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
                progressBar.style.width = percentage.toFixed() + '%';
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
                    var width = chart['chart'].width, height = chart['chart'].height, ctx = chart['chart'].ctx;
                    ctx.restore();
                    var fontSize = (height / 114).toFixed(2);
                    ctx.font = fontSize + "em 'Ubuntu', sans-serif";
                    ctx.fillStyle = "#01579B";
                    ctx.textBaseline = "middle";
                    // Draw text percentage inside every chart
                    switch (chart['id']) {
                        case 0:
                            var text = entries, textX = Math.round((width - ctx.measureText(text).width) / 2), textY = height / 2 + 4;
                            ctx.fillText(text, textX, textY);
                            ctx.save();
                            break;
                    }
                }
            });
        });
    };
    ResultsComponent = __decorate([
        core_1.Component({
            selector: 'app-results',
            templateUrl: './results.component.html',
            styleUrls: ['./results.component.css']
        })
    ], ResultsComponent);
    return ResultsComponent;
}());
exports.ResultsComponent = ResultsComponent;
