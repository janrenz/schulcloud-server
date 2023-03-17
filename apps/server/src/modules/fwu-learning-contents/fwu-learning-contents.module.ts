import { Module } from '@nestjs/common';
import { AuthorizationModule } from '@src/modules/authorization';
import { Logger } from '@src/core/logger';
import { FwuLearningContentsController } from './controller/fwu-learning-contents.controller';
import { FwuLearningContentsUc } from './uc/fwu-learning-contents.uc';
import { config, s3Config } from './files-storage.config';

const providers = [
	FwuLearningContentsUc,
	Logger,
	S3ClientAdapter,
	{
		provide: 'S3_Client',
		useFactory: (configProvider: S3Config) =>
			new S3Client({
				region: configProvider.region,
				credentials: {
					accessKeyId: configProvider.accessKeyId,
					secretAccessKey: configProvider.secretAccessKey,
				},
				endpoint: configProvider.endpoint,
				forcePathStyle: true,
				tls: true,
			}),
		inject: ['S3_Config'],
	},
	{
		provide: 'S3_Config',
		useValue: s3Config,
	},
];

@Module({
	imports: [AuthorizationModule],
	controllers: [FwuLearningContentsController],
	providers,
})
export class FwuLearningContentsModule {}
