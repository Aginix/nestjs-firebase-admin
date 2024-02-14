import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class FirebaseStorageService {
  constructor(public readonly app: admin.app.App) {}

  get storage() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return admin.storage(this.app);
  }

  bucket(name?: string): Bucket {
    return this.storage.bucket(name);
  }
}
