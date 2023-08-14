import { AttributesType } from "./attributes";

export interface CategoryType {
  domain_id: string;
  domain_name: string;
  category_id: string;
  category_name: string;
  attributes: AttributesType[];
}
