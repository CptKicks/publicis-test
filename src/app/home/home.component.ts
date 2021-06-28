import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AudienceDataset } from './models/audience-dataset.model';
import { FormControl, FormGroup } from '@angular/forms';
import { AudienceGraphService } from './components/audience-graph/audience-graph.service';
import { AudienceOverlapListenerService } from './components/audience-overlap-listener.service';
import { startWith } from 'rxjs/operators';
import { AudienceGraphComponent } from './components/audience-graph/audience-graph.component';
import { downloadBase64Url } from '../@shared/helpers/downloadBase64Url';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  data: AudienceDataset;
  totalAudience: number;
  audienceOverlapFormGroup: FormGroup;
  @ViewChild(AudienceGraphComponent) audienceGraphComponent: AudienceGraphComponent;
  audienceSubtitle: string = '';
  audienceOverlapSubscription: Subscription;
  expandOverlapSection = false;

  constructor(private audienceOverlapListener: AudienceOverlapListenerService, private audienceGraphService: AudienceGraphService) {
    this.data = this.audienceGraphService.data;
    this.totalAudience = this.audienceGraphService.totalAudience;

    this.audienceOverlapFormGroup = new FormGroup({});
    this.data.audiences.map(
      (name) => {
        this.audienceOverlapFormGroup.addControl(name, new FormControl(false));
      }
    );

    this.audienceOverlapSubscription = this.audienceOverlapFormGroup.valueChanges
      .pipe(startWith(this.audienceOverlapFormGroup.value)).subscribe(
      (formValues) => {
        const checkedValues = Object.keys(formValues).filter(key => formValues[key]);
        this.expandOverlapSection = checkedValues.length > 1;
        this.audienceOverlapListener.triggerChange(formValues);
        this.setAudienceOverlapTitle(checkedValues);
      }
    );
  }

  setAudienceOverlapTitle(checkedValues: string[]) {
    this.audienceSubtitle = checkedValues.length > 1 ?
      checkedValues
        .map((text) => `'${text}'`)
        .reduce((text, value, i, array) => text + (i < array.length - 1 ? ', ' : ' & ') + value)
      : '';
  }

  downloadChart() {
    const base64 = this.audienceGraphComponent.chartsInstance?.getDataURL({ type: 'png', pixelRatio: 1 });
    downloadBase64Url(base64, 'audienceOverlap');
  }

  ngOnDestroy() {
    this.audienceOverlapSubscription?.unsubscribe();
  }
}
