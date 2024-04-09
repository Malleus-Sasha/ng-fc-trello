import { Component } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Task } from '../../../../types/task.type';
import { TrelloList } from '../../../../types/trello-list';
import { AuthService } from '../../../../services/auth.service';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-trello-list',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, JsonPipe],
  templateUrl: './trello-list.component.html',
  styleUrl: './trello-list.component.scss'
})
export class TrelloListComponent {
  public reload$ = new BehaviorSubject<null>(null);

  public tasks: Task[] = [];
  public model$: Observable<TrelloList>;

  constructor(
    private authService: AuthService,
  ) {
    this.model$ = this.reload$.pipe(
      switchMap(() => this.initModel())
    );
  }


  public initModel(): Observable<TrelloList> {
    const tasksLocalStorage: string = window.localStorage.getItem('tasks') || '[]';
    const tasks: Task[] = JSON.parse(tasksLocalStorage);
    const login: string | undefined = this.authService.activeUser?.login;
    const model: TrelloList = {
      assignedForMe: [],
      assignedFromMe: []
    }
    tasks.forEach((task: Task) => {
      if (task.worker === login) {
        model.assignedForMe.push(task);
      } else if (task.creator === login) {
        model.assignedFromMe.push(task);
      }
    })
    return of(model);

  }
}
