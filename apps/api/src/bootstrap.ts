import { NestFactory } from '@nestjs/core'
import { AppModule } from '@ocmi/api/app/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import session from 'express-session'

export const globalPrefix = 'api'

export const createSwaggerDocument = (app: INestApplication<any>) => {
	const config = new DocumentBuilder()
		.setTitle('Spikey')
		.setDescription('API description')
		.setVersion('1.0')
		.addTag('spikey')
		.addBearerAuth()
		.build()

	return SwaggerModule.createDocument(app, config)
}

export const getApp = async () => {
	/**
	 * Initialize the NestJS application
	 */
	const app = await NestFactory.create(AppModule)
	//app.useGlobalPipes(new ValidationPipe())
	app.use(cookieParser())
	app.use(
		session({
			secret: 'my-secret',
			resave: false,
			saveUninitialized: false,
		}),
	)
	app.enableCors()
	app.setGlobalPrefix(globalPrefix)

	return app
}
