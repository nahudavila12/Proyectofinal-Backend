import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service'; 
import { User } from '../users/user.entity'; 
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UserService
    ) {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET, 
            callbackURL: 'http://localhost:3000/auth/google/callback', 
            scope: ['email', 'profile'],
        });
    }

    async validate( profile: any ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
        const { email, given_name, family_name } = profile._json;
        let user = await this.usersService.findByEmail(email);
    
        if (!user) {
            const newUser: CreateUserDto = {
                email: email,
                user_name: `${given_name} ${family_name}`,
                password: 'password',
                firstName: family_name,
                lastName: family_name, 
            };
    
            user = await this.usersService.addUser(newUser);
        }
        const { generateAccessToken,generateRefreshToken} = this.authService.generateTokens(user); 
    
        return { user, accessToken:generateAccessToken, refreshToken:generateRefreshToken }; 
    }
}