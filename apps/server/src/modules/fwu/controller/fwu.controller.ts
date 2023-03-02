import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Authenticate } from '@src/modules/authentication/decorator/auth.decorator';
import { Request, Response } from 'express';
import { FwuUc } from '../uc/fwu.uc';

@ApiTags('FWU')
@Authenticate('jwt')
@Controller('fwu')
export class FwuController {
	constructor(private readonly fwuUc: FwuUc) {}

	@Get('*')
	async get(@Req() req: Request, @Res() res: Response) {
		// TODO: make sure its a user from Brandenburg
		const path = req.params[0];
		try {
			// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>fwu: ', path.toString());
			var file = await this.fwuUc.get(path);
		} catch (error) {
			throw new Error('HttpStatusCode: ' + error.$metadata.httpStatusCode + ' at ' + path + ' ' + error);
			// res.sendStatus(error);
			// return;
		}
		const i = path.lastIndexOf('.');
		const contentType = i !== -1 ? path.slice(i) : 'application/octet-stream';
		res.type(contentType);
		res.send(file);
	}
}
