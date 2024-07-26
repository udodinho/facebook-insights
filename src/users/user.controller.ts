import { Controller, Get, Logger, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller("use")
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserService.name);


  @Get("nsights")
  async getUserInsights(@Query("accessToken") accessToken: string): Promise<any> {
    if (!accessToken) {
      this.logger.log(`Fetching user insights with access token: ${accessToken}`);

      throw new Error("Access token is missing");
    }
    return this.userService.getUserInsights(accessToken);
  }

  @Get("nsights/count")
  async getUserFriendsCount(@Query("userId") userId: string, @Query("accessToken") accessToken: string, ): Promise<any> {
    if (!accessToken) {
      this.logger.log(`Fetching user insights with access token: ${accessToken}`);

      throw new Error("Access token is missing");
    }
    return this.userService.getUserFriends(userId, accessToken);
  }
}