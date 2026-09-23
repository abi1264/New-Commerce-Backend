import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from './decorator/public.decorator.js';
import { LoginDto } from './dto/login.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  async register(@Body() registerDto: SignupDto) {
    const user = this.authService.register(registerDto);
    return {
      message: 'User Successfully Registered',
      user,
    };
  }

  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token } = await this.authService.login(loginDto);
    response.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return {
      message: 'User Successfully logged in',
      token,
    };
  }

  //logout
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    return {
      message: 'Logged out successfully',
    };
  }

  //Get currently logged user information
  @Get('me')
  getCurrentUser(@Req() req: Request) {
    return this.authService.getMe(req.user.sub);
  }
}
