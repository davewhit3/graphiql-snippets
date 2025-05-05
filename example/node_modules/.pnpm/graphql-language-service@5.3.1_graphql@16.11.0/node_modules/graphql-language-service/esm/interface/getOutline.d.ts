import { Outline } from '../types';
export declare type OutlineableKinds = 'Field' | 'OperationDefinition' | 'Document' | 'SelectionSet' | 'Name' | 'FragmentDefinition' | 'FragmentSpread' | 'InlineFragment' | 'ObjectTypeDefinition' | 'InputObjectTypeDefinition' | 'InterfaceTypeDefinition' | 'EnumTypeDefinition' | 'EnumValueDefinition' | 'InputValueDefinition' | 'FieldDefinition';
export declare function getOutline(documentText: string): Outline | null;
//# sourceMappingURL=getOutline.d.ts.map