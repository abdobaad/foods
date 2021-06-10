import React from "react";
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import {NavBar} from "../nav-bar";
import {MainTable} from "../main-table";
import { ProductsTableProps } from "../types";



const ProductsTable: React.FC<ProductsTableProps> = (props) => {
  const {products,properties} = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [compareItems,setCompareItems] = React.useState([]);
  const [showDiff,setShowDiff] = React.useState(false);
  const [firstProduct,setFirstProduct] = React.useState({});
  const [secondProduct,setSecondProduct] = React.useState({});

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const SelectedFood = (food) => {
      if(compareItems.length < 2){
          setCompareItems([...compareItems,food])
        }
  }
  const CompareFood = () => {
      if(showDiff){
        setShowDiff(false)
        setFirstProduct({})
        setSecondProduct({})
        setCompareItems([])
      }else{
        setShowDiff(true)
        setFirstProduct(products.find(ele=> ele.id === compareItems[0]))
        setSecondProduct(products.find(ele=> ele.id === compareItems[1]))
      }
  } 

  return( <>
      <NavBar 
            showDiff={showDiff}
            items={compareItems}
            Compare={CompareFood} 
      />
      <Paper >
          <MainTable
            properties={properties}
            showDiff={showDiff}
            products={products}
            compareItems={compareItems}
            page={page}
            rowsPerPage={rowsPerPage}
            SelectedFood={SelectedFood}
            firstProduct={firstProduct}
            secondProduct={secondProduct}
          />
          <TablePagination
            rowsPerPageOptions={[10, 25,40, 100]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
      </Paper>
  
  </>)
}
 

export default ProductsTable
