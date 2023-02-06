/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Controller,
  Get,
  Post,
  Req,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthenticateGuard, LocalAuthGuard } from 'src/auth/utilis/LocalGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {}

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authentication = true;
    return session;
  }
  @UseGuards(AuthenticateGuard)
  @Get('status')
  async getAuthStatus() {}
}
