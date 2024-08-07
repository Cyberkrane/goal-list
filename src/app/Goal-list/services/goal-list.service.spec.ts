import { TestBed } from '@angular/core/testing';

import { GoalListService } from './goal-list.service';

describe('GoalListService', () => {
  let service: GoalListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
