import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FacebookLoginCallbackResponse, FacebookRequest } from './auth.service';

@Controller("auth")
export class AuthController {
  @Get("facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<void> {
    // initiates the Facebook OAuth2 login flow
  }

  @Get("facebook/callback")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginCallback(@Req() req:  FacebookRequest ): Promise<FacebookLoginCallbackResponse> {
    return {
      message: "User information from Facebook",
      user: req.user,
      accessToken: req.user.accessToken,
      refreshToken: req.user.refreshToken
    };
  }
}
