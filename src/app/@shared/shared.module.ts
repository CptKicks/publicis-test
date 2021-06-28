import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import {
  SankeyChart
} from 'echarts/charts';
import {
  TooltipComponent,
} from 'echarts/components';
import {
  CanvasRenderer,
} from 'echarts/renderers';
import { CheckboxComponent } from './components/forms/checkbox/checkbox.component';
import { NumberSuffixPipe } from './pipes/number-sufix.pipe';
import { ReactiveFormsModule } from '@angular/forms';

echarts.use(
  [TooltipComponent, SankeyChart, CanvasRenderer]
);

@NgModule({
  declarations: [
    CheckboxComponent,
    NumberSuffixPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({ echarts }),
  ],
  exports: [
    CommonModule,
    NgxEchartsModule,
    CheckboxComponent,
    NumberSuffixPipe,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
