
import OtherAttribute from './OtherAttribute';

export default class Namespace {

	static findNamespacesFromOtherAttributes(otherAttributes: OtherAttribute[]) {
		return otherAttributes.filter(oa => oa.isNamespace).map(oa => new this(oa.prefix, oa.value));
	}

	constructor(public prefix: string, public namespace: string) {}

}