import { Test } from '@nestjs/testing';
import { FirebaseAdminModule } from './firebase-admin.module';

describe('FirebaseAdminModule', () => {
  describe('forRoot', () => {
    beforeEach(async () => {
      await Test.createTestingModule({
        imports: [
          FirebaseAdminModule.forRoot({
            projectId: 'nestjs-firebase-admin-for-test',
          }),
        ],
      }).compile();
    });

    it('should create', () => {
      expect(FirebaseAdminModule).toBeDefined();
    });
  });

  describe('forRootAsync', () => {
    beforeEach(async () => {
      await Test.createTestingModule({
        imports: [
          FirebaseAdminModule.forRootAsync({
            useFactory: () => ({
              projectId: 'nestjs-firebase-admin-for-test',
            }),
          }),
        ],
      }).compile();
    });

    it('should create', () => {
      expect(FirebaseAdminModule).toBeDefined();
    });
  });
});
