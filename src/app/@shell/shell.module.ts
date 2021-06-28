import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../@shared/shared.module';
import { NavigationComponent } from './navigation/navigation.component';
import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [
    NavigationComponent,
    ShellComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: [
    ShellComponent,
  ]
})
export class ShellModule { }
