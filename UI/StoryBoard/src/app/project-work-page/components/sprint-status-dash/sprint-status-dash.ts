import { Component, Input, OnInit, OnDestroy, Inject,  } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AxiosEndpoint } from '../../../utils/query-services';
import { StoryDto } from '../../../dtos/story-dto/story-dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format, parseISO } from 'date-fns';
Chart.register(...registerables);

@Component({
  selector: 'app-sprint-status-dash',
  templateUrl: './sprint-status-dash.html',
  styleUrls: ['./sprint-status-dash.scss']
})
export class SprintStatusDashComponent implements OnDestroy {

  dates: string[] = [];
  tempoRestante = [];
  tempoIdeal = [];
  tempoReal = [];
  myChart: any;

  @Input() Entity!: StoryDto

  queryCommandStatus!: Promise<any>;

  constructor(
    public dialogRef: MatDialogRef<SprintStatusDashComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnDestroy() {
    if (this.myChart) {
      this.myChart.destroy();
    }
  }

  ngAfterViewInit() {
    this.createChart();
  }

  async ngOnInit() {
    this.getStatus();
  }

  async getStatus() {
    this.queryCommandStatus = AxiosEndpoint.dash.getSprintStatusAsync(this.data)
    try {
      const result = await this.queryCommandStatus;
      this.dates = this.formatarDatas(result.days);
      this.tempoRestante = result.reviewTimeTasks;
      this.tempoIdeal = result.idealTimeTasks;
      this.tempoReal = result.realTimeTasks;
      this.createChart();
    } catch (error) {
      console.error('Erro ao obter tarefas:', error);
    }
  }

  formatarDatas(listaDeDatas: string[]): string[] {
    const datasFormatadas: string[] = [];
  
    for (const dataOriginal of listaDeDatas) {
      const dataObjeto: Date = parseISO(dataOriginal);
      const dataFormatada: string = format(dataObjeto, 'dd-MM-yyyy');
      datasFormatadas.push(dataFormatada);
    }
  
    return datasFormatadas;
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    
    if (this.myChart) {
      this.myChart.destroy();
    }
    
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'Ideal Time',
            data: this.tempoIdeal,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            yAxisID: 'y',
          },
          {
            label: 'Review Time',
            data: this.tempoRestante,
            backgroundColor: 'rgba(0, 99, 132, 0.2)',
            borderColor: 'rgba(0, 99, 132, 1)',
            yAxisID: 'y',
          },
          {
            label: 'Real Time',
            data: this.tempoReal,
            backgroundColor: 'rgba(123, 123, 123)',
            borderColor: 'rgba(123, 123, 123, 1)',
            yAxisID: 'y',
          }
        ]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            position: 'left'
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
}