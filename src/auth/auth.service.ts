import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';

export interface IUserWithoutPassword {
    id: number;
    username: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<IUserWithoutPassword | null> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user.get({ plain: true });
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: RegisterDto): Promise<IUserWithoutPassword> {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }
        const user = await this.usersService.create(registerDto);
        const { password, ...result } = user.get({ plain: true });
        return result;
    }
}
