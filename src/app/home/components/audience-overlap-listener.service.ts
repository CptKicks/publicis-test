import { Injectable } from '@angular/core';
import { AudienceGraphService } from './audience-graph/audience-graph.service';

@Injectable({
  providedIn: 'root'
})
export class AudienceOverlapListenerService {
  constructor(private audienceGraphService: AudienceGraphService) {}

  triggerChange(selections: any) {
    const selected: string[] = [];
    const notSelected: string[] = [];
    Object.keys(selections).forEach((key) => {
      selections[key] ? selected.push(key) : notSelected.push(key);
    });
    // if only one selected; move to notSelected (we can't show any overlapping in this case)
    if (selected.length === 1 ) {
      notSelected.push(...selected);
      selected.pop();
    }

    this.audienceGraphService.refresh(selected, notSelected);
  }
}
