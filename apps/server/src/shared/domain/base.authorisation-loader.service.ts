import { BaseDO } from './domainobject';
import { EntityId } from './types';

// It is possible to implement a on the fly registration, or a registration that can be executed
// but the part how the registration in authorisation modul works, must be implement in the authorisation modul it self.
// On this place it can only be triggered.
export abstract class BaseAuthorisationLoaderService<BaseDO> {
	abstract getById(id: EntityId): BaseDO;
}
