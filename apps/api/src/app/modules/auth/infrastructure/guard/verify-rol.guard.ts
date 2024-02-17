import R from 'ramda'
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { AllowRol } from '@ocmi/api/auth/domain/enum/auth.enum'
import { UserImplRepository } from '@ocmi/api/auth/infrastructure/adapter/repository/user-impl.repository'

const isNotAdmin = R.pipe(R.prop('name'), R.equals(AllowRol.ADMIN), R.not)

@Injectable()
export class VerifyRol implements CanActivate {
	constructor(private readonly userImplRepository: UserImplRepository) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const idRol = R.path(['payloadJwt', 'rol'], request)
		const rol = await this.userImplRepository.findRolById(idRol)

		if (isNotAdmin(rol)) {
			throw new ForbiddenException()
		}

		return true
	}
}
