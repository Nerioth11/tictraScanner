import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticsPage } from './statistics';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    StatisticsPage,
  ],
  imports: [
    NgCircleProgressModule.forRoot({}),
    IonicPageModule.forChild(StatisticsPage),
  ],
})
export class StatisticsPageModule {}
