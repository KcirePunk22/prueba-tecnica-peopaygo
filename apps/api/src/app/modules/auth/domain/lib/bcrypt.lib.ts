export interface BcryptLib {
	hash(plainText: string): Promise<string>
	compare(plainText: string, encryptedText: string): Promise<boolean>
}
