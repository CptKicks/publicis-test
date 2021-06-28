import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../@shared/shared.module';
import { AudienceGraphComponent } from './components/audience-graph/audience-graph.component';

@NgModule({
  declarations: [
    HomeComponent,
    AudienceGraphComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
