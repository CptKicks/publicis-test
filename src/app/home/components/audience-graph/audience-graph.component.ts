import { Component, OnDestroy } from '@angular/core';
import { ECharts, EChartsOption } from 'echarts';
import { AudienceGraphService } from './audience-graph.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audience-graph',
  templateUrl: './audience-graph.component.html',
  styleUrls: ['./audience-graph.component.scss']
})
export class AudienceGraphComponent implements OnDestroy {
  chartOptions: EChartsOption;
  baseChartOptions: EChartsOption;
  seriesOptions: EChartsOption;
  chartsInstance: ECharts;
  chartDataSubscription: Subscription;

  constructor(private audienceGraphService: AudienceGraphService) {
    this.baseChartOptions = {
      height: 600,
      width: '140%',
      backgroundColor: '#26282F',
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
    };

    this.seriesOptions = {
      type: 'sankey',
      selectedMode: true,
      draggable: false,
      layoutIterations: 2,
      nodeWidth: 10,
      nodeGap: 15,
      nodeAlign: 'justify',
      top: 'middle',
      bottom: '0',
      left: '-40%',
      emphasis: {
        focus: 'none',
      },
      blur: {
        show: false,
        lineStyle: {
          backgroundColor: '#000'
        }
      },
      lineStyle: {
        color: 'source',
        curveness: 0,
        opacity: 0.35,
      },
      label: {
        color: '#FFF',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        fontSize: 16,
        padding: [0, 0, 0, 30]
      },
      levels: [
        {
          depth: 0,
          lineStyle: {
            color: "#2E353F",
            opacity: 1,
          },
          itemStyle: {
            color: "#2E353F"
          },
          emphasis: {
            lineStyle: {
              color: '#2E353F',
              opacity: 1,
            }
          },
        },
        {
          depth: 2,
          label: { show: false },
        }
      ],
      nodes: [],
      links: []
    };

    this.chartDataSubscription = this.audienceGraphService.chartData$.subscribe(
      (data: any) => {
        this.chartOptions = {
          ...this.baseChartOptions,
          series: {
            ...this.seriesOptions,
            ...data
          }
        }

        this.chartsInstance?.setOption(this.chartOptions, true);
      });
  }

  onChartInit($event: ECharts): void {
    this.chartsInstance = $event;
  }

  ngOnDestroy() {
    this.chartDataSubscription.unsubscribe();
  }
}
