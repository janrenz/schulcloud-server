import { Module, NotFoundException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/authentication/auth.module';
import { NewsModule } from './modules/news/news.module';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { UsersModule } from './modules/user/users.module';
import { DB_URL } from './config';
import { TaskModule } from './modules/task/task.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { News, SchoolInfo, UserInfo } from './modules/news/entity';
import { Dictionary, IPrimaryKey } from '@mikro-orm/core';

@Module({
	imports: [
		AuthModule,
		UsersModule,
		NewsModule,
		TaskModule,
		MongooseModule.forRoot(DB_URL),
		MikroOrmModule.forRoot({
			type: 'mongo',
			clientUrl: DB_URL,
			entities: [News, SchoolInfo, UserInfo],
			findOneOrFailHandler: (entityName: string, where: Dictionary | IPrimaryKey) => {
				return new NotFoundException(`The requested ${entityName}: ${where} has not been found.`);
			},
		}),
	],
	controllers: [ServerController],
	providers: [ServerService],
})
export class ServerModule {}
