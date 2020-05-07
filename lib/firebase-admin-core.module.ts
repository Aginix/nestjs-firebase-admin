import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseAdminModuleAsyncOptions, FirebaseAdminModuleOptions } from './firebase-admin.interface';
import { FIREBASE_ADMIN_MODULE_OPTIONS } from './firebase-admin.constant';
import {
  FirebaseAuthenticationService,
  FirebaseMessagingService,
  FirebaseRemoteConfigService,
  FirebaseDatabaseService,
  FirebaseFirestoreService,
  FirebaseStorageService,
} from './services';

const PROVIDERS = [
  FirebaseAuthenticationService,
  FirebaseMessagingService,
  FirebaseRemoteConfigService,
  FirebaseDatabaseService,
  FirebaseFirestoreService,
  FirebaseStorageService,
];
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

    const providers = this.createProviders(app);

    return {
      module: FirebaseAdminCoreModule,
      providers: [firebaseAdminModuleOptions, ...providers],
      exports: [...EXPORTS],
    };
  }

  private static createProviders(app: admin.app.App): Provider<any>[] {
    return PROVIDERS.map<Provider>((ProviderService) => ({
      provide: ProviderService,
      useFactory: () => new ProviderService(app),
    }));
  }

  static forRootAsync(options: FirebaseAdminModuleAsyncOptions): DynamicModule {
    const firebaseAdminModuleOptions = {
      provide: FIREBASE_ADMIN_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const providers = this.createAsyncProviders();

    return {
      module: FirebaseAdminCoreModule,
      imports: options.imports,
      providers: [firebaseAdminModuleOptions, ...providers],
      exports: [...EXPORTS],
    };
  }

  private static createAsyncProviders(): Provider<any>[] {
    return PROVIDERS.map<Provider>((ProviderService) => ({
      provide: ProviderService,
      useFactory: (options: FirebaseAdminModuleOptions) => {
        const app = admin.apps.length === 0 ? admin.initializeApp(options) : admin.apps[0];
        return new ProviderService(app);
      },
      inject: [FIREBASE_ADMIN_MODULE_OPTIONS],
    }));
  }
}
