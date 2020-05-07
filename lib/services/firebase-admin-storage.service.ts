import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class FirebaseStorageService implements admin.storage.Storage {
  constructor(public readonly app: admin.app.App) {}

  get storage() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return this.app.storage();
  }

  bucket(name?: string): Bucket {
    return this.storage.bucket(name);
  }
}
