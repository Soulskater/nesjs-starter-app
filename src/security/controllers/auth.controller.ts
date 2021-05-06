import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../interfaces/auth-response';
import { UserDocument } from "../schemas/user.schema";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { AuthRequestDto } from "../dto/auth-request.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req, @Body() authDto: AuthRequestDto): Promise<AuthResponse> {
    const user = req.user as UserDocument;
    return this.authService.issueAccessToken(user);
  }
}
