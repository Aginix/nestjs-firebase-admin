import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthenticationService {
  constructor(public readonly app: admin.app.App) {}

  get auth() {
    if (!this.app) {
      throw new Error('Firebase instance is undefined.');
    }
    return admin.auth(this.app);
  }

  tenantManager(): admin.auth.TenantManager {
    return this.auth.tenantManager();
  }
  createCustomToken(uid: string, developerClaims?: Object): Promise<string> {
    return this.auth.createCustomToken(uid, developerClaims);
  }
  createUser(properties: admin.auth.CreateRequest): Promise<admin.auth.UserRecord> {
    return this.auth.createUser(properties);
  }
  deleteUser(uid: string): Promise<void> {
    return this.auth.deleteUser(uid);
  }
  deleteUsers(uids: string[]): Promise<admin.auth.DeleteUsersResult> {
    return this.auth.deleteUsers(uids);
  }
  getUser(uid: string): Promise<admin.auth.UserRecord> {
    return this.auth.getUser(uid);
  }
  getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
    return this.auth.getUserByEmail(email);
  }
  getUserByPhoneNumber(phoneNumber: string): Promise<admin.auth.UserRecord> {
    return this.auth.getUserByPhoneNumber(phoneNumber);
  }
  getUserByProviderUid(providerId: string, uid: string): Promise<admin.auth.UserRecord> {
    return this.auth.getUserByProviderUid(providerId, uid);
  }
  getUsers(identifiers: admin.auth.UserRecord[]): Promise<admin.auth.GetUsersResult> {
    return this.auth.getUsers(identifiers);
  }
  listUsers(maxResults?: number, pageToken?: string): Promise<admin.auth.ListUsersResult> {
    return this.auth.listUsers(maxResults, pageToken);
  }
  updateUser(uid: string, properties: admin.auth.UpdateRequest): Promise<admin.auth.UserRecord> {
    return this.auth.updateUser(uid, properties);
  }
  verifyIdToken(idToken: string, checkRevoked?: boolean): Promise<admin.auth.DecodedIdToken> {
    return this.auth.verifyIdToken(idToken, checkRevoked);
  }
  setCustomUserClaims(uid: string, customUserClaims: Object): Promise<void> {
    return this.auth.setCustomUserClaims(uid, customUserClaims);
  }
  revokeRefreshTokens(uid: string): Promise<void> {
    return this.auth.revokeRefreshTokens(uid);
  }
  importUsers(
    users: admin.auth.UserImportRecord[],
    options?: admin.auth.UserImportOptions,
  ): Promise<admin.auth.UserImportResult> {
    return this.auth.importUsers(users, options);
  }
  createSessionCookie(idToken: string, sessionCookieOptions: admin.auth.SessionCookieOptions): Promise<string> {
    return this.auth.createSessionCookie(idToken, sessionCookieOptions);
  }
  verifySessionCookie(sessionCookie: string, checkForRevocation?: boolean): Promise<admin.auth.DecodedIdToken> {
    return this.auth.verifySessionCookie(sessionCookie, checkForRevocation);
  }
  generatePasswordResetLink(email: string, actionCodeSettings?: admin.auth.ActionCodeSettings): Promise<string> {
    return this.auth.generatePasswordResetLink(email, actionCodeSettings);
  }
  generateEmailVerificationLink(email: string, actionCodeSettings?: admin.auth.ActionCodeSettings): Promise<string> {
    return this.auth.generateEmailVerificationLink(email, actionCodeSettings);
  }
  generateSignInWithEmailLink(email: string, actionCodeSettings: admin.auth.ActionCodeSettings): Promise<string> {
    return this.auth.generateSignInWithEmailLink(email, actionCodeSettings);
  }
  listProviderConfigs(options: admin.auth.AuthProviderConfigFilter): Promise<admin.auth.ListProviderConfigResults> {
    return this.auth.listProviderConfigs(options);
  }
  getProviderConfig(providerId: string): Promise<admin.auth.AuthProviderConfig> {
    return this.auth.getProviderConfig(providerId);
  }
  deleteProviderConfig(providerId: string): Promise<void> {
    return this.auth.deleteProviderConfig(providerId);
  }
  updateProviderConfig(
    providerId: string,
    updatedConfig: admin.auth.UpdateAuthProviderRequest,
  ): Promise<admin.auth.AuthProviderConfig> {
    return this.auth.updateProviderConfig(providerId, updatedConfig);
  }
  createProviderConfig(config: admin.auth.AuthProviderConfig): Promise<admin.auth.AuthProviderConfig> {
    return this.auth.createProviderConfig(config);
  }
}
