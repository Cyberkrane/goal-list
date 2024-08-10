import { Injectable } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';
import { Goal } from '../interfaces/goal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalListService {

  private apiUrl: string = 'http://localhost:5000/goals';

  constructor(private http: HttpClient) { }

  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.apiUrl);
  }

  addNewGoal(goal: Goal): void {
    const newGoal: Goal = { ...goal, id: uuidV4() };
    this.http.post<Goal>(this.apiUrl, newGoal).subscribe();
  }

  updateGoal(goal: Goal): void {
    this.http.put<Goal>(`${this.apiUrl}/${goal.id}`, goal).subscribe();
  }

  deleteGoal(id: string): void {
    this.http.delete<Goal>(`${this.apiUrl}/${id}`).subscribe();
  }

}
