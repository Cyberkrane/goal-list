import { Component, OnInit } from '@angular/core';
import { Goal } from '../../interfaces/goal';
import { GoalListService } from '../../services/goal-list.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private goalListService: GoalListService) { }

  ngOnInit(): void {
    this.loadGoalsFromLocalStorage();
  }

  get goalList() {
    return [...this.goalListService.goalList];
  }

  onNewGoal(goal: Goal): void {
    this.goalListService.addNewGoal(goal);
    this.saveGoalsToLocalStorage();
  }

  onDeleteGoal(id: string): void {
    this.goalListService.deleteGoal(id);
    this.saveGoalsToLocalStorage();
  }

  saveGoalsToLocalStorage(): void {
    localStorage.setItem('goalList', JSON.stringify(this.goalList));
  }

  loadGoalsFromLocalStorage(): void {
    const storedGoals = localStorage.getItem('goalList');
    if (storedGoals) {
      this.goalListService.goalList = JSON.parse(storedGoals);
    }
  }


}
