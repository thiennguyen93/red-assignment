import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDTO } from './dto/login-request.dto';
import { ApiConfigService } from 'src/config/config.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    return {
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: this.jwtService.sign({ id: user.id }),
      user: {
        ...user,
        password: undefined,
        passwordConfirmation: undefined,
      },
    };
  }

  async validateUser(payload: LoginRequestDTO): Promise<User> {
    const user = await this.userService.getByEmail(payload.email);
    if (!user || !(await compare(payload.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return user;
  }
}
