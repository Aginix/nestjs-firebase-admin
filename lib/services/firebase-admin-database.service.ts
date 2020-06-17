import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseDatabaseService implements admin.database.Database {
  constructor(public readonly app: admin.app.App) {}

  get database() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return this.app.database();
  }

  goOffline(): void {
    return this.database.goOffline();
  }
  goOnline(): void {
    return this.database.goOnline();
  }
  ref(path?: string | admin.database.Reference): admin.database.Reference {
    return this.database.ref(path);
  }
  refFromURL(url: string): admin.database.Reference {
    return this.database.refFromURL(url);
  }
  getRules(): Promise<string> {
    return this.database.getRules();
  }
  getRulesJSON(): Promise<object> {
    return this.database.getRulesJSON();
  }
  setRules(source: string | object | Buffer): Promise<void> {
    return this.database.setRules(source);
  }
}
