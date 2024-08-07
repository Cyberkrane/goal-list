import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Goal } from '../../interfaces/goal';
import { ToastrService } from 'ngx-toastr';

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
  public goalList: Goal[] = [
    {
      id: "0",
      description: "No hay tareas pendientes",
      completed: false,
      priority: "low"
    }
  ];

  constructor(private toastr: ToastrService) { }

  onDeleteById(id: string): void {
    if (!id) return;
    this.onDeleteID.emit(id);
    this.eliminatedTask();
  }

  onGoalChecked(goal: Goal): void {
    this.showSuccess();
  }

  showSuccess() {
    this.toastr.success("Genial!!! has completado la tarea.");
  }

  eliminatedTask(): void {
   this.toastr.info("la tarea fue eliminada");
  }

}
