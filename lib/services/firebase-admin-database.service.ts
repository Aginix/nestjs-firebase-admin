import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseApp } from '@firebase/app-types';

@Injectable()
export class FirebaseDatabaseService implements admin.database.Database {
  app: FirebaseApp;
  constructor(public readonly _app: admin.app.App) {}

  get database() {
    if (!this._app) {
      throw new Error('Firebase instance is undefined.');
    }
    return admin.database(this.app);
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
  useEmulator(host: string, port: number): void {
    this.database.useEmulator(host, port);
  }
}
