import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public get<T>(persistenceKey: string): T {
    const item = localStorage.getItem(persistenceKey);
    if (!item) {
      return null;
    }
    return JSON.parse(item);
  }

  public set(persistenceKey: string, value: any): void {
    localStorage.setItem(persistenceKey, JSON.stringify(value));
  }

  public clear(): void {
    localStorage.clear();
  }

}
