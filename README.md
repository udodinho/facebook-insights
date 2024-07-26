# Facebook Insights

### Usage

1. Clone repo
2. Run the command on your terminal
```npm
npm install
``` 

### Create a .env 
```
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```
### Set up Facebook Login:
- Go to the [Facebook Developers](https://developers.facebook.com/) page.
- Create a new application and get the App ID and App Secret.
- Configure the OAuth Redirect URI as http://localhost:3000/auth/facebook/callback.


###Running the Application
```
npm run start
```
- The application will run on http://localhost:3000

### API Endpoints
#### Authentication
- GET /auth/facebook: Initiates Facebook OAuth2 login.
- GET /auth/facebook/callback: Handles the Facebook OAuth2 callback.

#### Insights
- GET /insights/: Fetches basic user insights such as id, name, and friends count. Requires Facebook OAuth2 authentication.
- GET /insights/count: Fetches basic user insights such as friends count. Requires Facebook OAuth2 authentication.


