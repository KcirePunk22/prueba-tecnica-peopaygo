import { FileTypeValidatorOptions, ValidationError } from '@nestjs/common'

export interface BodyValidatorPipeOptions extends FileTypeValidatorOptions {
	transform?: boolean
	disableErrorMessages?: boolean
	exceptionFactory?: (errors: ValidationError[]) => any
}
