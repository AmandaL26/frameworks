import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { FindUserByEmailRepository } from "../repository";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly findUserByEmailRepository: FindUserByEmailRepository,
        private readonly jwtService: JwtService,
        private readonly logger: Logger,
    ) {}

    async execute(data: LoginDto) {
        this.logger.log('Logging in user ...');

        const user = await this.findUserByEmailRepository.findByEmail(data.email);

         if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload);

        this.logger.log('User logged in successfully!');

        return { accessToken, user: { id: user.id, name: user.name, email: user.email }, };
    }
}
