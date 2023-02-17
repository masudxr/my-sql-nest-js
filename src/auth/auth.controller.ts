import {
  Controller,
  // Get,
  Post,
  // Req,
  Request,
  // Session,
  UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local.authguard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
