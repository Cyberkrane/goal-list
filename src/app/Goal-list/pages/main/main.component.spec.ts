import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MainComponent } from './main.component';
import { GoalListService } from '../../services/goal-list.service';
import { Goal } from '../../interfaces/goal';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let mockGoalListService: jasmine.SpyObj<GoalListService>;

  beforeEach(async () => {
    mockGoalListService = jasmine.createSpyObj('GoalListService', ['getGoals', 'addNewGoal', 'updateGoal', 'deleteGoal']);

    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [
        { provide: GoalListService, useValue: mockGoalListService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize goal list on ngOnInit', () => {
    const dummyGoals: Goal[] = [
      { id: '1', description: 'Learn the basics of Angular.', completed: true, priority: 'high' },
      { id: '2', description: 'Write unit tests for the service.', completed: false, priority: 'low' }
    ];

    mockGoalListService.getGoals.and.returnValue(of(dummyGoals));

    component.ngOnInit();

    expect(component.goalList).toEqual(dummyGoals);
    expect(mockGoalListService.getGoals).toHaveBeenCalled();
  });

  it('should add a new goal when onNewGoal is called', () => {
    const newGoal: Goal = { id: '3', description: 'Description of the new goal.', completed: false, priority: 'low' };

    component.onNewGoal(newGoal);

    expect(mockGoalListService.addNewGoal).toHaveBeenCalledWith(newGoal);
  });

  it('should update a goal when onGoalChecked is called', () => {
    const goal: Goal = { id: '1', description: 'Updated description.', completed: true, priority: 'high' };

    component.onGoalChecked(goal);

    expect(mockGoalListService.updateGoal).toHaveBeenCalledWith(goal);
  });

  it('should delete a goal by id and refresh goal list when onDeleteById is called', () => {
    const id = '1';

    const dummyGoals: Goal[] = [
      { id: '2', description: 'Write unit tests for the service.', completed: false, priority: 'low' }
    ];

    mockGoalListService.deleteGoal.and.callFake(() => {
      mockGoalListService.getGoals.and.returnValue(of(dummyGoals));
      component.showAllGoals();
    });

    component.onDeleteById(id);

    expect(mockGoalListService.deleteGoal).toHaveBeenCalledWith(id);
    expect(mockGoalListService.getGoals).toHaveBeenCalled();
    expect(component.goalList).toEqual(dummyGoals);
  });

  it('should refresh goal list when cheActualiza is called with true', () => {
    const dummyGoals: Goal[] = [
      { id: '1', description: 'Learn the basics of Angular.', completed: true, priority: 'high' }
    ];

    mockGoalListService.getGoals.and.returnValue(of(dummyGoals));

    component.cheActualiza(true);

    expect(mockGoalListService.getGoals).toHaveBeenCalledTimes(2);
    expect(component.goalList).toEqual(dummyGoals);
  });

  it('should refresh goal list when cheActualiza is called with false', () => {
    const dummyGoals: Goal[] = [
      { id: '1', description: 'Learn the basics of Angular.', completed: true, priority: 'high' }
    ];

    mockGoalListService.getGoals.and.returnValue(of(dummyGoals));

    component.cheActualiza(false);

    expect(mockGoalListService.getGoals).toHaveBeenCalledTimes(1);
    expect(component.goalList).toEqual(dummyGoals);
  });
});
