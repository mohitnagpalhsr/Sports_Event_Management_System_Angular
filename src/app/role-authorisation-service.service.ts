import { Injectable } from '@angular/core';
import { Role } from './Models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthorisationServiceService {
  public isAuthorised(roles: Role[]): boolean {
    const currentUser = JSON.parse(localStorage.getItem('role'));
    if (!currentUser) return false;
    // return roles.indexOf(currentUser.role) >= 0)
  }
}
