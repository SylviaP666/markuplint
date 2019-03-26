export interface MLMLSpecJSON {
	cites?: string[];
	def?: { [name: string]: Attribute[] };
	specs: ElementSpec[];
}

export type ElementSpec = {
	name: string;
	description?: string;
	categories: (
		| ElementCategory
		| {
				category: ElementCategory;
				condition: ElementCondition;
		  })[];
	contentModel: {
		exists: 'required' | 'any';
		models: string[];
	}[];
	omittion: ElementSpecOmittion;
	attributes: (AttributeSpec | string)[];
};

/**
 * @cite https://html.spec.whatwg.org/multipage/dom.html#kinds-of-content
 */
export type ElementCategory =
	| 'metadata'
	| 'flow'
	| 'sectioning'
	| 'heading'
	| 'phrasing'
	| 'embedded'
	| 'interactive'
	| 'palpable'
	| 'script-supporting';

export type ElementSpecOmittion = false | ElementSpecOmittionTags;

type ElementSpecOmittionTags = {
	startTag: boolean | ElementCondition;
	endTag: boolean | ElementCondition;
};

export type ElementCondition = {
	__WIP__: 'WORK_IN_PROGRESS';
};

export type Attribute = {
	name: string;
	category: AttributeCtegory;
	value: AttributeValue;
};

export type AttributeSpec = Attribute & {
	required: boolean;
};

export type AttributeCtegory = 'global' | 'xml' | 'aria' | 'eventhandler' | 'form' | 'particular';

export type AttributeValue = 'string' | 'space-separated-tokens' | 'function-body' | 'uint' | 'int' | 'float';
