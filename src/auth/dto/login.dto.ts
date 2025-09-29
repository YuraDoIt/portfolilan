import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'andrii@example.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'strongpassword' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
