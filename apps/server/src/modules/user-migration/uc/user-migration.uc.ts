import { Injectable } from '@nestjs/common';
import { UserMigrationService } from '../service/user-migration.service';
import { PageContentDto } from '../service/dto/page-content.dto';
import { PageTypes } from '../interface/page-types.enum';

@Injectable()
export class UserMigrationUc {
	constructor(private readonly migrationService: UserMigrationService) {}

	async getPageContent(pageType: PageTypes, sourceSystem: string, targetSystem: string): Promise<PageContentDto> {
		const content: PageContentDto = await this.migrationService.getPageContent(pageType, sourceSystem, targetSystem);

		return content;
	}
}