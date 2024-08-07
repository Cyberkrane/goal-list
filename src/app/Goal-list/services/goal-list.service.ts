import { Injectable } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';
import { Goal } from '../interfaces/goal';

@Injectable({
  providedIn: 'root'
})
export class GoalListService {

  public goalList: Goal[] = [];

  addNewGoal(goal: Goal): void {
      const newGoal: Goal = { ...goal, id: uuidV4() };
      this.goalList.push(newGoal);
  }

  deleteGoal(id: string): void {
     this.goalList = this.goalList.filter(goal => goal.id !== id);
  }
}

