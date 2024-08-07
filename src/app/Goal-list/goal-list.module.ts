import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalListRoutingModule } from './goal-list-routing.module';
import { MainComponent } from './pages/main/main.component';
import { AddGoalComponent } from './components/add-goal/add-goal.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    AddGoalComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    GoalListRoutingModule,
    FormsModule 
  ],
  exports: [
    MainComponent
  ]
})
export class GoalListModule { }
