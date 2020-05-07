import { DynamicModule, Module } from '@nestjs/common';

import { FirebaseAdminCoreModule } from './firebase-admin-core.module';
import { FirebaseAdminModuleAsyncOptions, FirebaseAdminModuleOptions } from './firebase-admin.interface';

@Module({})
export class FirebaseAdminModule {
  static forRoot(options: FirebaseAdminModuleOptions): DynamicModule {
    return {
      module: FirebaseAdminModule,
      imports: [FirebaseAdminCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: FirebaseAdminModuleAsyncOptions): DynamicModule {
    return {
      module: FirebaseAdminModule,
      imports: [FirebaseAdminCoreModule.forRootAsync(options)],
    };
  }
}
