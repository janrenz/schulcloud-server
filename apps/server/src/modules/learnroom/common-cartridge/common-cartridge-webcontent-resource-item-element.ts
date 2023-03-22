import internal from 'stream';
import {
	CommonCartridgeResourceItemElement,
	ICommonCartridgeResourceProps,
} from './common-cartridge-resource-item-element';

export type ICommonCartridgeWebContentProps = Omit<ICommonCartridgeResourceProps, 'type'> & { file: internal.Readable };

export class CommonCartridgeWebContentResourceItemElement extends CommonCartridgeResourceItemElement {
	constructor(protected readonly props: ICommonCartridgeWebContentProps & { type: 'webcontent' }) {
		super(props);
	}
}
