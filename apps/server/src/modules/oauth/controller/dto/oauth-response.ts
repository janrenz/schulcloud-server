import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OAuthResponse {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	jwt?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	errorcode?: string;
}