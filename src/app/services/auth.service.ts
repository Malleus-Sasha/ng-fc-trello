import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRegister } from '../types/register.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: make a separately registered user. users & authUser;
  isAuth$ = new BehaviorSubject<boolean>(false);
  activeUser!: UserRegister | null;

  constructor() {
    this.checkIsAuth();
   }

  public getUsers(): UserRegister[] {
    return !!window.localStorage.getItem('users')
      ? JSON.parse(window.localStorage.getItem('users') || '')
      : [];
  }

  private checkIsAuth(): void {
    const activeUser: UserRegister | undefined | null = this.getUsers().length
      ? this.getUsers().find((user: UserRegister) => user.isAuth) : null;
    this.activeUser = activeUser as UserRegister;

    this.isAuth$.next(!!activeUser);
  }

  public isAdmin(): boolean {
    return this.activeUser?.login === 'Admin';
  }
}
