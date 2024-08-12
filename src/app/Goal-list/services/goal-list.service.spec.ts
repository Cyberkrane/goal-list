import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GoalListService } from './goal-list.service';
import { Goal } from '../interfaces/goal';
// import { v4 as uuidV4 } from 'uuid';

describe('GoalListService', () => {
  let service: GoalListService;
  let httpMock: HttpTestingController;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GoalListService],
    });

    service = TestBed.inject(GoalListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes después de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve goals from the API via GET', () => {
    const dummyGoals: Goal[] = [
      { id: '1',  description: 'Learn the basics of Angular.', completed: true, priority: 'high' },
      { id: '2', description: 'Write unit tests for the service.', completed: false, priority: 'low' }
    ];

    service.getGoals().subscribe(goals => {
      expect(goals.length).toBe(2);
      expect(goals).toEqual(dummyGoals);
    });

    const request = httpMock.expectOne(service['apiUrl']);
    expect(request.request.method).toBe('GET');
    request.flush(dummyGoals);
  });

  it('should add a new goal via POST', () => {
    const newGoal: Goal = { id: '1', description: 'Description of the new goal.', completed: false, priority: 'low' };

    service.addNewGoal(newGoal);

    const request = httpMock.expectOne(service['apiUrl']);
    expect(request.request.method).toBe('POST');
    expect(request.request.body.id).toBeDefined(); // Verifica que se haya generado un UUID
    expect(request.request.body.description).toBe(newGoal.description);
    expect(request.request.body.completed).toBe(newGoal.completed);
    expect(request.request.body.priority).toBe(newGoal.priority);

    request.flush(newGoal);
  });

  it('should delete a goal via DELETE', () => {
    const id = '1';

    service.deleteGoal(id);

    const request = httpMock.expectOne(`${service['apiUrl']}/${id}`);
    expect(request.request.method).toBe('DELETE');

    request.flush({});
  });
});
