import { Global, Module, DynamicModule } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseAdminModuleAsyncOptions, FirebaseAdminModuleOptions } from './firebase-admin.interface';
import { FIREBASE_ADMIN_MODULE_OPTIONS } from './firebase-admin.constant';
import { FirebaseAuthenticationService } from './firebase-admin-authentication.service';

const PROVIDERS = [FirebaseAuthenticationService];
const EXPORTS = [...PROVIDERS];

@Global()
@Module({})
export class FirebaseAdminCoreModule {
  static forRoot(options: FirebaseAdminModuleOptions): DynamicModule {
    const firebaseAdminModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useValue: options,
    };

    const app = admin.apps.length === 0 ? admin.initializeApp(options) : admin.apps[0];

    const firebaseAuthencationProvider = {
      provide: FirebaseAuthenticationService,
      useFactory: () => new FirebaseAuthenticationService(app),
    };

    return {
      module: FirebaseAdminCoreModule,
      providers: [firebaseAdminModuleOptions, firebaseAuthencationProvider],
      exports: [...EXPORTS],
    };
  }

  static forRootAsync(options: FirebaseAdminModuleAsyncOptions): DynamicModule {
    const firebaseAdminModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const firebaseAuthencationProvider = {
      provide: FirebaseAuthenticationService,
      useFactory: (options: FirebaseAdminModuleOptions) => {
        const app = admin.apps.length === 0 ? admin.initializeApp(options) : admin.apps[0];
        return new FirebaseAuthenticationService(app);
      },
      inject: [FIREBASE_ADMIN_MODULE_OPTIONS],
    };

    return {
      module: FirebaseAdminCoreModule,
      imports: options.imports,
      providers: [firebaseAdminModuleOptions, firebaseAuthencationProvider],
      exports: [...EXPORTS],
    };
  }
}
