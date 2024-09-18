import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserToken } from './models/UserToken';
import { UserPayload } from './models/UserPayload';

@Injectable()
export class AuthService {
    constructor(private readonly jwt: JwtService, private readonly userService: UserService,) { }

    async generateToken(user: User): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            username: user.username,
            email: user.email,
        };

        return {
            access_token: this.jwt.sign(payload),
        };
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findEmail(email);

        if (user) {
            const passwordValid = await bcrypt.compare(password, user.password);

            if (passwordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }

        throw new Error('O username e/ou a senha fornecidos estão incorretos.');
    }
}
