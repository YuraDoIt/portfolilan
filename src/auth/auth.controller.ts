import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService, IUserWithoutPassword } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 201, description: 'Successful login', schema: {
            example: { access_token: 'jwt.token.here' }
        }
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    @ApiOperation({ summary: 'User registration' })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'User successfully registered' })
    async register(@Body() registerDto: RegisterDto): Promise<IUserWithoutPassword | null> {
        const user = await this.authService.register(registerDto);
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ status: 200, description: 'Current user profile' })
    getProfile(@Request() req) {
        return req.user;
    }
}
