import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegister } from '../../../../types/register.type';
import { AuthService } from '../../../../services/auth.service';
import { Task } from '../../../../types/task.type';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TrelloListComponent } from '../trello-list/trello-list.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-trello',
  standalone: true,
  imports: [TrelloListComponent, ReactiveFormsModule, NgIf, NgFor, JsonPipe, MatFormField, MatLabel, MatSelect, MatOption, MatInput],
  templateUrl: './trello.component.html',
  styleUrl: './trello.component.scss'
})
export class TrelloComponent {
  public form!: FormGroup;
  public users: UserRegister[];

  public tasks: Task[] = [];

  @ViewChild('trelloListComponent') private trelloListComponent!: TrelloListComponent;

  constructor(
    private authService: AuthService,
  ) {
    this.initForm();
    this.users = this.authService.getUsers().filter((us:UserRegister)=>us.login !== 'Admin');
    this.tasks = !!window.localStorage.getItem('tasks')
      ? JSON.parse(window.localStorage.getItem('tasks') || '')
      : [];
  }

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  public submit(): void {
    const task: Task = {
      task: this.form.value.task,
      worker: this.form.value.worker || this.authService.activeUser?.login,
      creator: this.authService.activeUser?.login || ''
    }
    this.tasks.push(task);
    this.form.reset();
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.trelloListComponent.reload$.next(null);
  }

  private initForm(): void {
    this.form = new FormGroup<any>({
      task: new FormControl(null, [Validators.required]),
      worker: new FormControl(null)
    })
  }
}
