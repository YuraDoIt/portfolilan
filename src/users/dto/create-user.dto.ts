import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'andrii', description: 'Username' })
    @IsString()
    readonly username: string;

    @ApiProperty({ example: 'andrii@example.com', description: 'Email address' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'strongpassword', description: 'Password (min 6 symbols)' })
    @IsString()
    @MinLength(6)
    readonly password: string;
}
