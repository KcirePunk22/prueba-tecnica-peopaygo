import { Response, Request } from 'express'
import { pathOr, split } from 'ramda'
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class VerifyToken implements CanActivate {
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)

		if (!token) {
			throw new UnauthorizedException()
		}
		try {
			const jwtDecode = await this.jwtService.verifyAsync(token, {
				secret: 'esteesmisecreto',
			})

			request['payloadJwt'] = jwtDecode.payload
			request['jwtEncode'] = token
		} catch {
			throw new UnauthorizedException()
		}
		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		console.log(request.header('authorization'))

		const authorizationHeader = pathOr('', ['headers', 'authorization'], request)
		const [type, token] = split(' ', authorizationHeader)
		return type === 'Bearer' ? token : undefined
	}

	private extractToken(request: Request): string | undefined {
		return request.cookies['token']
	}
}
