import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from 'decorators/public';
import { SignInDto } from './dto/signIn';
import { SignUpDto } from './dto/signUp';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: SignInDto })
  signIn(@Body(new ValidationPipe()) signInData: SignInDto) {
    return this.authService.signIn(signInData.email, signInData.password);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  @ApiBody({ type: SignUpDto })
  signUp(@Body(new ValidationPipe()) signUpData: SignUpDto) {
    return this.authService.signUp(signUpData);
  }
}
