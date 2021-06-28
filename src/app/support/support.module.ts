import { NgModule } from '@angular/core';
import { SupportComponent } from './support/support.component';
import { SharedModule } from '../@shared/shared.module';
import { SupportRoutingModule } from './support-routing.module';

@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    SharedModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
