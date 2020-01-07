import { DynamicModule, Module } from '@nestjs/common';
import { FirebaseAdminModuleOptions } from './firebase-admin.interface';
import { FirebaseAuthenticationService } from './firebase-admin-authentication.service';
import { FIREBASE_ADMIN_MODULE_OPTIONS } from './firebase-admin.constant';

const PROVIDERS = [FirebaseAuthenticationService]
const EXPORTS = [...PROVIDERS]

@Module({})
export class FirebaseAdminModule {
  static forRoot(options?: FirebaseAdminModuleOptions): DynamicModule {
    return {
      module: FirebaseAdminModule,
      providers: [...PROVIDERS, { provide: FIREBASE_ADMIN_MODULE_OPTIONS, useValue: options }],
      exports: [...EXPORTS]
    }
  }
}
