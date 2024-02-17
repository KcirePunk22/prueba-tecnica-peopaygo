export interface JwtLib {
	signIn<T>(payload: T): Promise<string>
}
