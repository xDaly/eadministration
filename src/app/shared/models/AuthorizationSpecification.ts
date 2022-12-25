import { Authorization } from './Authorization';
import { Specification } from './Specification';
export class AuthorizationSpecification {
    declarationId: number;
    authorizations: Authorization[];
    specifications: Specification[];
}
