import { MLASTElement } from '@markuplint/ml-ast';
import { RuleConfigOptions, RuleConfigValue } from '@markuplint/ml-config';

import Document from '../document';
import { getNode } from '../helper/dom-traverser';
import Selector from '../selector';
import { AnonymousNode, NodeType } from '../types';
import Attribute from './attribute';
import ElementCloseTag from './element-close-tag';
import Node from './node';

export default class Element<T extends RuleConfigValue, O extends RuleConfigOptions> extends Node<T, O, MLASTElement> {
	public readonly type: NodeType = 'Element';
	public readonly nodeName: string;
	public readonly attributes: Attribute[];
	public readonly namespaceURI: string;
	public readonly isForeignElement: boolean;
	public readonly closeTag: ElementCloseTag<T, O> | null;
	public obsolete = false;

	constructor(astNode: MLASTElement, document: Document<T, O>) {
		super(astNode, document);
		this.nodeName = astNode.nodeName;
		this.attributes = astNode.attributes.map(attr => new Attribute(attr));
		this.namespaceURI = astNode.namespace;
		this.isForeignElement = this.namespaceURI !== 'http://www.w3.org/1999/xhtml';
		this.closeTag = astNode.pearNode ? new ElementCloseTag<T, O>(astNode.pearNode, this) : null;
	}

	public get childNodes(): AnonymousNode<T, O>[] {
		const astChildren = this._astToken.childNodes || [];
		return astChildren.map(node => getNode<typeof node, T, O>(node));
	}

	public getAttribute(attrName: string) {
		for (const attr of this.attributes) {
			if (attr.name.raw.toLowerCase() === attrName.toLowerCase()) {
				return attr;
			}
		}
	}

	public hasAttribute(attrName: string) {
		return !!this.getAttribute(attrName);
	}

	public matches(selector: string): boolean {
		return Selector(selector).match(this);
	}
}