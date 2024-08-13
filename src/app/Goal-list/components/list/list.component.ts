import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Goal } from '../../interfaces/goal';
import { ToastrService } from 'ngx-toastr';
import { GoalListService } from '../../services/goal-list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Output()
  public onDeleteID: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onNewGoal: EventEmitter<Goal> = new EventEmitter<Goal>();

  @Input()
  public goalList: Goal[] = [];

  constructor(private toastr: ToastrService, private goalListService: GoalListService) { }

  onDeleteById(id: string): void {
    if (!id) return;
    this.onDeleteID.emit(id);
    this.eliminatedGoal();
    this.loadGoals();
  }

  loadGoals(): void {
    this.goalListService.getGoals().subscribe((data) => {
      this.goalList = data;
      return this.goalList;
    })
  }


  onGoalChecked(goal: Goal): void {
    this.goalListService.updateGoal(goal);
    this.showSuccess();
  }

  showSuccess() {
    this.toastr.success("Genial!!! has completado la tarea.");
  }

  eliminatedGoal(): void {
    this.toastr.info("la tarea fue eliminada");
  }

}
