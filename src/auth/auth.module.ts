import {
    Module,
    Global,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyStrategy } from './api-key.strategy';
import { KeyModule } from 'src/key/key.module';

@Global()
@Module({
    imports: [
        ConfigModule,
        PassportModule.register({
            defaultStrategy: ['jwt', 'api-key'],
        }),
        UserModule,
        KeyModule,
    ],
    providers: [
        ApiKeyStrategy,
        JwtStrategy,
        AuthService,
    ],
    exports: [
        PassportModule,
        JwtStrategy,
        ApiKeyStrategy,
        AuthService,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
