import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Response } from 'express';
import JwtAuthenticationGuard from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './guards/local-auth.guard';
import RequestWithUser from './interfaces/requestWithUser';
import { UserId } from 'src/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@UserId() userId, @Res() response: Response) {
    const cookie = this.authService.getCookieWithJwtToken(userId);
    response.setHeader('Set-Cookie', cookie);
    response.redirect(process.env.FRONTEND_URL);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@UserId() userId, @Res() response: Response) {
    const cookie = this.authService.getCookieWithJwtToken(userId);
    response.setHeader('Set-Cookie', cookie);

    return response.send({ authStatus: 'OK' });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());

    return response.sendStatus(200);
  }
}
