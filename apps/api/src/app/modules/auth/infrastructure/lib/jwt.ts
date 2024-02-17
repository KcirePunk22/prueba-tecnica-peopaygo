import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtLib } from '@ocmi/api/app/modules/auth/domain/lib/jwt.lib'

@Injectable()
export class JWTImpService implements JwtLib {
	constructor(private jwtService: JwtService) {}

	async signIn<T>(payload: T): Promise<string> {
		return await this.jwtService.signAsync({ payload })
	}
}
