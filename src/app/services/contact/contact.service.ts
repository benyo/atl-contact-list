import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, BehaviorSubject } from 'rxjs';
import { map, flatMap, filter, toArray } from 'rxjs/operators';
import { IContact } from 'src/app/contact.interface';

import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private _listContacts = new BehaviorSubject<IContact[]>([ ]);

  get listContacts(): Observable<IContact[]> {
    return this._listContacts.asObservable();
  }

  constructor(private http: HttpClient) { }

  init(): Observable<IContact[]> {
    const localStorageContacts = this.getStorage();
    if (localStorageContacts && localStorageContacts.length > 0) {
      this._listContacts.next(localStorageContacts);
      return of(localStorageContacts);
    }
    const observable = this.http.get<IContact[]>("/assets/contact_list.json").pipe(map(contacts => contacts.sort((a, b) => b.id - a.id)));
    observable.subscribe(contacts => this._listContacts.next(contacts));
    return observable;
  }

  filterContacts(filterTerm: string): Observable<IContact[]> {
    if (filterTerm === '' || filterTerm === null) {
      return this.listContacts;
    }
    return of(this._listContacts.getValue())
      .pipe(flatMap(f => f))
      .pipe(filter(contact => contact.name.indexOf(filterTerm) !== -1))
      .pipe(toArray());
  }

  add(contact: IContact) {
    const currentContacts = this._listContacts.getValue();
    const contacts = [{...contact, id: currentContacts.length + 1}, ...currentContacts];
    this._listContacts.next(contacts);
    this.setStorage(contacts);
  }
  
  edit(contact: IContact) {
    const currentContacts = this._listContacts.getValue();
    const editedContacts = [...currentContacts.map(c => c.id === contact.id ? contact : c)];
    this._listContacts.next(editedContacts);
    this.setStorage(editedContacts);
  }

  delete(contact: IContact) {
    const currentContacts = this._listContacts.getValue();
    const filterdContacts = currentContacts.filter(c => c.id !== contact.id);
    this._listContacts.next(filterdContacts);
    this.setStorage(filterdContacts);
  }

  private setStorage(contacts: IContact[]) {
    if (this.isSopportLocalStorage) {
      localStorage.setItem("contacts", JSON.stringify(contacts))
    }
  }
  private getStorage(): IContact[] {
    if (this.isSopportLocalStorage) {
      return JSON.parse(localStorage.getItem("contacts") || "[]");
    }
    return [];
  }

  private get isSopportLocalStorage(): boolean {
    return (typeof localStorage !== 'undefined');
  }
}


@Injectable({
  providedIn: 'root'
})
export class ContactResolver implements Resolve<IContact[]> {
  constructor(private contactService: ContactService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IContact[] | Observable<IContact[]> | Promise<IContact[]> {
    return this.contactService.init();
  }
}