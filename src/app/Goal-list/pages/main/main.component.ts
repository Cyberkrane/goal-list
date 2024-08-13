import { Component, OnInit } from '@angular/core';
import { Goal } from '../../interfaces/goal';
import { GoalListService } from '../../services/goal-list.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  private _goalList: Goal[] = [];

  public title: string = "Infocus";

  constructor(private goalListService: GoalListService) { }

  public get goalList(): Goal[] {
    return this._goalList;
  }
  public set goalList(value: Goal[]) {
    this._goalList = value;
  }


  ngOnInit(): void {
    this.showAllGoals();
  }

  public showAllGoals() {
    this.goalListService.getGoals().subscribe(
      (data) => {
        this.goalList = Object.values(data);
        console.log('GoalList: ', this.goalList);
      }
    );
  }
  public onNewGoal(goal: Goal): void {
    this.goalListService.addNewGoal(goal);
  }

  public onGoalChecked(goal: Goal): void {
    this.goalListService.updateGoal(goal);
  }

  public onDeleteById(id: string): void {
    this.goalListService.deleteGoal(id);
    this.showAllGoals();
  }

  public cheActualiza($event: boolean) {
    this.showAllGoals();
    if ($event) {
      this.showAllGoals();
    }
  }

  filterGoalsPending() {
    this.goalListService.getGoals().subscribe(
      (data) => {
        this.goalList = this.goalList.filter((goal) => !goal.completed);
      }
    )
  }
  filterGoalsCompleted() {
    this.goalListService.getGoals().subscribe(
      (data) => {
        this.goalList = this.goalList.filter((goal) => goal.completed);
        return this.goalList;
      }
    )
  }
  
  filterGoalsAll() {
    this.showAllGoals();
  }

}
