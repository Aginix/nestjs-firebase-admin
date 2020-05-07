<a href="https://www.npmjs.com/@aginix/nestjs-firebase-admin"><img src="https://img.shields.io/npm/v/@aginix/nestjs-firebase-admin.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/@aginix/nestjs-firebase-admin"><img src="https://img.shields.io/npm/l/@aginix/nestjs-firebase-admin.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/@aginix/nestjs-firebase-admin"><img src="https://img.shields.io/npm/dm/@aginix/nestjs-firebase-admin.svg" alt="NPM Downloads" /></a>

## Description

Firebase Admin Module for [Nest.js Framework](https://nestjs.com/)

## Installation

```bash
$ yarn add @aginix/nestjs-firebase-admin
```

### Import module

```typescript
import { Module } from '@nestjs/common';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import * as admin from 'firebase-admin'

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.applicationDefault()
      })
    }),
  ],
})
export class AppModule {}
```

## Example

### Inject Authentication Service

```typescript
import { Injectable } from '@nestjs/common';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class AppService {
  constructor(private firebaseAuth: FirebaseAuthenticationService) {}

  getUsers() {
    return this.firebaseAuth.listUsers()
  }
}
```

## License

MIT © [Aginix Technologies Co., Ltd.](https://github.com/Aginix/nestjs-firebase-admin)
