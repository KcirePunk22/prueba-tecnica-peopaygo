import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { BcryptLib } from '../../domain/lib/bcrypt.lib'

@Injectable()
export class BcryptImplService implements BcryptLib {
	async hash(plainText: string): Promise<string> {
		return await bcrypt.hash(plainText, 10)
	}

	async compare(plainText: string, encryptedText: string): Promise<boolean> {
		return await bcrypt.compare(plainText, encryptedText)
	}
}
