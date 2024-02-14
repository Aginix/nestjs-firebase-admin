import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseFirestoreService implements FirebaseFirestore.Firestore {
  constructor(public readonly app: admin.app.App) {}

  get firestore() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return admin.firestore(this.app);
  }

  settings(settings: FirebaseFirestore.Settings): void {
    return this.firestore.settings(settings);
  }

  collection(collectionPath: string): FirebaseFirestore.CollectionReference {
    return this.firestore.collection(collectionPath);
  }

  doc(documentPath: string): FirebaseFirestore.DocumentReference {
    return this.firestore.doc(documentPath);
  }

  collectionGroup(collectionId: string): FirebaseFirestore.CollectionGroup {
    return this.firestore.collectionGroup(collectionId);
  }

  getAll(
    ...documentRefsOrReadOptions: (FirebaseFirestore.DocumentReference | FirebaseFirestore.ReadOptions)[]
  ): Promise<FirebaseFirestore.DocumentSnapshot[]> {
    return this.firestore.getAll(...documentRefsOrReadOptions);
  }

  terminate(): Promise<void> {
    return this.firestore.terminate();
  }

  listCollections(): Promise<FirebaseFirestore.CollectionReference[]> {
    return this.firestore.listCollections();
  }

  runTransaction<T>(
    updateFunction: (transaction: FirebaseFirestore.Transaction) => Promise<T>,
    transactionOptions?: { maxAttempts?: number },
  ): Promise<T> {
    return this.firestore.runTransaction(updateFunction, transactionOptions);
  }

  batch(): FirebaseFirestore.WriteBatch {
    return this.firestore.batch();
  }

  bulkWriter(options?: FirebaseFirestore.BulkWriterOptions): FirebaseFirestore.BulkWriter {
    return this.firestore.bulkWriter(options);
  }

  bundle(bundleId?: string): FirebaseFirestore.BundleBuilder {
    return this.firestore.bundle(bundleId);
  }

  recursiveDelete(
    ref: FirebaseFirestore.CollectionReference<unknown> | FirebaseFirestore.DocumentReference<unknown>,
    bulkWriter?: FirebaseFirestore.BulkWriter,
  ): Promise<void> {
    return this.firestore.recursiveDelete(ref, bulkWriter);
  }
}
