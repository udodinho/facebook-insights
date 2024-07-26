import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../authz/auth.service';
import axios from 'axios';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  async getUserInsights(accessToken: string): Promise<any> {
    try {
      const url = `https://graph.facebook.com/v20.0/me?fields=id,name,friends.limit(0).summary(true)&access_token=${accessToken}`;
      const response = await axios.get(url);

      const { id, name, friends } = response.data;

      const friendsCount = friends && friends.summary ? friends.summary.total_count : 0;

      return {
        id,
        name,
        friendsCount,
      };
    } catch (error) {
      console.log("Error", error)
      this.logger.error("Error fetching user insights from Facebook", error.response ? error.response.data : error.message);

      throw new Error("Error fetching user insights from Facebook");
    }
  }

  async getUserFriends(userId: string, accessToken: string): Promise<any> {
    try {
      const url = `https://graph.facebook.com/v20.0/${userId}/friends?access_token=${accessToken}`;
      const response = await axios.get(url);
      this.logger.log('Response from Facebook:', response.data);

      const { friends } = response.data;

      const friendsCount = friends && friends.summary ? friends.summary.total_count : 0;

      return {
        friendsCount,
      };
    } catch (error) {
      console.log("Error", error)
      this.logger.error("Error fetching user friends counts from Facebook", error.response ? error.response.data : error.message);

      throw new Error("Error fetching user friends counts from Facebook");
    }
  }
  
}

