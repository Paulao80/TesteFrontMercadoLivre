export interface ConditionValueType {
    id: string;
    name: string;
}

export interface ConditionType {
    id: string;
    name: string;
    tags: object;
    hierarchy: string;
    relevance: number;
    value_type: string;
    values: ConditionValueType[];
    attribute_group_id: string;
    attribute_group_name: string;
}