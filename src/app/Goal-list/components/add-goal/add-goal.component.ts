import { Component, EventEmitter, Output } from '@angular/core';
import { Goal } from '../../interfaces/goal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalComponent {

  @Output()
  public onNewGoal: EventEmitter<Goal> = new EventEmitter<Goal>();
  @Output()
  public cheActualiza: EventEmitter<boolean> = new EventEmitter<boolean>();

  public goal: Goal = {
    id: "",
    description: "",
    completed: false,
    priority: "low"
  };

  stateList = true;

  constructor(private toastr: ToastrService) {}

  addGoal(): void {
    if (this.goal.description.trim().length === 0) {
      this.alertError();
      return;
    }
    this.onNewGoal.emit(this.goal);
    this.showSuccess();
    this.resetGoal();
    this.cheActualiza.emit(this.stateList);
  } 

  resetGoal() {
    this.goal = {
      id: "",
      description: "",
      completed: false,
      priority: "low"
    };
  }


  alertError() {
    this.toastr.error("No puede agregar una tarea vacia");
  }

  showSuccess() {
    this.toastr.success("Tarea agregada");
  }
}
