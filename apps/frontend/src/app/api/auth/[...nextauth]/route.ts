import NextAuth from 'next-auth/next'
import CredentialsProviver from 'next-auth/providers/credentials'

export const authOptions = {
	secret: 'testoesunsecreto',
	providers: [
		CredentialsProviver({
			name: 'credentials',
			credentials: {
				typeUser: { label: 'typeUser', type: 'text' },
				email: { label: 'Email', type: 'text' },
				password: { label: 'Contraseña', type: 'password' },
			},
			async authorize(credentials: any): Promise<any> {
				const response = await fetch('http://localhost:3000/api/auth/login', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						typeUser: credentials.typeUser,
						email: credentials.email,
						password: credentials.password,
					}),
				})
				const result = await response.json()

				if (!result.token) {
					throw new Error('Credenciales incorrecta')
				}

				return {
					token: result.token,
					userId: result.userId,
					rol: result.rol,
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: any) {
			if (user) {
				token.id = user?.token
				token.userId = user.userId
				token.rol = user.rol
			}

			return token
		},
		async session(session: any) {
			return session
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
