import { ProductPropertyEntryDTO, Product } from '@/api/types'

export interface ProductsTableProps {
  properties: ProductPropertyEntryDTO[]
  products: Product[]
}

export interface MaterialTableColumn {
  id?: 'name' | 'code' | 'population' | 'size' | 'density'
  minWidth?: number
  align?: 'left' | 'right' | 'center'
  format?: (value: any) => any
}

export interface TableTypes {
  properties: ProductPropertyEntryDTO[];
  showDiff:boolean;
  products:Product[];
  compareItems:string[];
  page:number;
  rowsPerPage:number;
  SelectedFood:(food:string)=> void;
  firstProduct:Product | object;
  secondProduct:Product | object;
}
export interface NavBarTypes {
  showDiff:boolean;
  items:string[];
  Compare:()=> void;
}

export interface ProductTableProperty extends ProductPropertyEntryDTO, MaterialTableColumn {}
