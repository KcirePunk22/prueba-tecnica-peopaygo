import { Request, Response } from 'express'
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common'
import { UserService } from '@ocmi/api/auth/application/services/user.service'
import { CreateUserDTO } from '@ocmi/api/auth/application/dto/create-user.dto'
import { LoginDTO } from '@ocmi/api/auth/application/dto/login.dto'
import { UpdateUserDTO } from '../../application/dto/update-user.dto'
import { VerifyToken } from '../guard/verify-token.guard'
import { AuthToControllerService } from '../services/auth-to-controller.service'

@Controller({
	path: '/auth',
})
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly authToControllerService: AuthToControllerService,
	) {}

	@Get('/verify')
	@UseGuards(VerifyToken)
	verifyToken() {
		return true
	}

	@Post('/login')
	async login(@Res() res: Response, @Body() body: LoginDTO) {
		const result = await this.userService.login(body)

		return res.status(HttpStatus.OK).json({
			token: result.token,
			userId: result.userId,
			rol: result.rol,
		})
	}

	@Get('/users')
	@HttpCode(HttpStatus.OK)
	async getUser() {
		return await this.authToControllerService.getUser()
	}

	@Get('/users/:id')
	@HttpCode(HttpStatus.OK)
	async getUserById(@Param('id') id: string) {
		return await this.authToControllerService.findCompanyByEmployee(Number(id))
	}

	@Post('/users')
	@HttpCode(HttpStatus.CREATED)
	createUser(@Body() body: CreateUserDTO) {
		return this.userService.createUser(body)
	}

	@Put('/users/:id')
	@HttpCode(HttpStatus.OK)
	updateUser(@Param('id') id: number, @Body() body: UpdateUserDTO) {
		console.log({
			id,
			body,
		})

		return this.userService.updateUser(id, body)
	}

	@Delete('/users/:id')
	@HttpCode(HttpStatus.OK)
	deleteUser(@Param('id') id: number) {
		return this.userService.deleteUser(Number(id))
	}
}
