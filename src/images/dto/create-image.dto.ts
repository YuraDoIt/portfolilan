import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateImageDto {
    @ApiProperty({ example: 'My Image', description: 'Name of the image' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: 'A nice image description', description: 'Optional description' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 1, description: 'ID of the portfolio' })
    @IsInt()
    @Type(() => Number)
    portfolioId: number;
}
