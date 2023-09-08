import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_OAUTH2_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_OAUTH2_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_OAUTH2_CALLBACK_URL'),
      scope: ['email', 'profile'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      name: `${name.familyName} ${name.givenName}`,
      imageUrl: photos[0].value,
      authProvider: 'google',
      authProviderAccessToken: accessToken,
    }

    done(null, user)
  }
}
