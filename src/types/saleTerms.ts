export interface TagsSaleTermsType {
  hidden?: boolean;
  multivalued?: boolean;
  read_only?: boolean;
}

export interface ValuesSaleTermsType {
  id: string;
  name: string;
  metadata?: {
    value: boolean;
  };
}

export interface AllowedUnitsType {
  id: string;
  name: string;
}

export interface SaleTermsType {
  id: string;
  name: string;
  tags: TagsSaleTermsType;
  hierarchy: string;
  relevance: number;
  value_type: string;
  value_max_length?: number;
  values?: ValuesSaleTermsType[];
  allowed_units?: AllowedUnitsType[];
  default_unit?: string;
  attribute_group_id: string;
  attribute_group_name: string;
}
