// not-found.interceptor.ts

import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	NotFoundException,
	CallHandler,
	BadRequestException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class HandlerExceptions implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError((error) => {
				throw new BadRequestException(error.message)
			}),
		)
	}
}
