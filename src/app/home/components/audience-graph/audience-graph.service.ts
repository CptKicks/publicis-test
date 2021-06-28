import { Injectable } from '@angular/core';
import { AudienceDataset } from '../../models/audience-dataset.model';
import * as data from './data.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { k_combinations } from '../../../@shared/helpers/combinations';
import { AudienceOverlapLink } from '../../models/audience-overlap-link.model';
import { ChartDataState } from '../../models/chart-data-state.model';

@Injectable({
  providedIn: 'root'
})
export class AudienceGraphService {
  data: AudienceDataset;
  totalAudience: number = 0;
  private chartDataState: ChartDataState = { nodes: [], links: [], selected: [] };
  private dispatch = new BehaviorSubject<ChartDataState>(this.chartDataState);
  chartData$: Observable<ChartDataState> = this.dispatch.asObservable();

  constructor() {
    this.data = data;
    this.data.audiences.map( (item) => this.totalAudience += this.data.audienceData[item].value);
    this.setNodesFromData();
  }

  refresh(selected: string[], notSelected: string[]) {
    // empty all links
    this.chartDataState.links = [];

    this.handleNotSelected(notSelected);
    this.handleSelected(selected);
    this.chartDataState.selected = selected;

    this.dispatch.next({ ...this.chartDataState });
  }

  handleNotSelected(array: string[]) {
    array.map((name) => {
      this.chartDataState.links.push(...this.getTotalLinksByAudienceName(name));
    });
  }

  handleSelected(array: string[]) {
    // Total-1st Node Links
    array.map((name) => {
      this.chartDataState.links.push(
        {
          source: "Total",
          target: name,
          value: this.data.audienceData[name].value
        }
      );
    });

    // Get combinations and then find all overlapping links within data
    const combinations = k_combinations(array, 2);
    const overlappingLinks: AudienceOverlapLink[] = [];
    combinations.map((combination: any) => {
      overlappingLinks.push(...this.getAudienceOverlapLinksByPair(combination));
    });
    this.chartDataState.links.push(...overlappingLinks)

    // Calculate the sum of the overlapping links
    const overlappingTotals: { [x:string]: number }  = {};
    overlappingLinks.map( (link) => {
      if(!overlappingTotals.hasOwnProperty(link.source)) {
        overlappingTotals[link.source] = link.value;
      } else {
        overlappingTotals[link.source] += link.value;
      }
    });

    // Create links from depth 1 to depth 2 with the remainder value (total value of audience - total of overlapped link)
    Object.keys(overlappingTotals).map((name) => {
      this.chartDataState.links.push({
        source: name,
        target: `${name} 2`,
        value: this.data.audienceData[name].value - overlappingTotals[name],
      })
    });
  }

  getTotalLinksByAudienceName(name: string) {
    const item = this.data.audienceData[name];

    return [
      {
        source: "Total",
        target: name,
        value: item.value,
      },
      {
        source: name,
        target: `${name} 2`,
        value: item.value
      }
    ];
  }

  getAudienceOverlapLinksByPair(combination: [string, string]) {
      return this.data.overlapLinks.filter((overlap) =>
      overlap.source === combination[0] && overlap.target === `${combination[1]} 2` || overlap.source === combination[1] && overlap.target === `${combination[0]} 2`
    );
  }

  setNodesFromData() {
    // First Total Node
    this.chartDataState.nodes.push(
      {
        name: 'Total',
        depth: 0,
        label: { show: false },
      }
    );

    this.data.audiences.map( (name) => {
      const audienceData = this.data.audienceData[name];
      this.chartDataState.nodes.push(
        ...[
          {
            name: name,
            depth: 1,
            itemStyle: {
              color: audienceData.color
            }
          },
          {
            name: `${name} 2`,
            depth: 2,
            itemStyle: {
              color: audienceData.color
            }
          }
        ]
      );
    });
  }
}
