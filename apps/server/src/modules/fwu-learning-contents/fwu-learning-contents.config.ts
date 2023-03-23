import { Configuration } from '@hpi-schul-cloud/commons';
import { S3Config } from './interface/config';

export const s3Config: S3Config = {
	endpoint: Configuration.get('FWU_CONTENT__S3_ENDPOINT') as string,
	region: Configuration.get('FWU_CONTENT__S3_REGION') as string,
	bucket: Configuration.get('FWU_CONTENT__S3_BUCKET') as string,
	accessKeyId: Configuration.get('FWU_CONTENT__S3_ACCESS_KEY') as string,
	secretAccessKey: Configuration.get('FWU_CONTENT__S3_SECRET_KEY') as string,
};

const fwuLearningContentsConfig = {
	NEST_LOG_LEVEL: Configuration.get('NEST_LOG_LEVEL') as string,
	INCOMING_REQUEST_TIMEOUT: Configuration.get('FWU_CONTENT__INCOMING_REQUEST_TIMEOUT') as number,
	FEATURE_FWU_CONTENT_ENABLED: Configuration.get('FEATURE_FWU_CONTENT_ENABLED') as boolean,
};

export const config = () => fwuLearningContentsConfig;
