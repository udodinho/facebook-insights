import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { Strategy } from 'passport-facebook';
import { VerifyCallback } from 'passport-oauth2';

export type FacebookLoginCallbackResponse = {
  message: string;
  user: {
    accessToken: string;
    refreshToken: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type FacebookRequest = {
  user: {
    accessToken: string;
    refreshToken: string;
  };
};

@Injectable()
export class AuthService extends PassportStrategy(Strategy, "facebook") {
  private readonly logger = new Logger(AuthService.name);

  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ["id", "name", "photos", "email"],
      scope: ["email"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, displayName, emails } = profile;
    const user = {
      id,
      name: displayName,
      email: emails ? emails[0].value : null,
      accessToken,
      refreshToken
    };

    // Check the permissions granted to the access token
    try {
      const permissionsUrl = `https://graph.facebook.com/me/permissions?access_token=${accessToken}`;
      const permissionsResponse = await axios.get(permissionsUrl);
      this.logger.log("Permissions:", permissionsResponse.data);
    } catch (error) {
      this.logger.error("Error fetching permissions:", error.response ? error.response.data : error.message);
    }

    done(null, user);
  }
}
