import React from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {NavBar} from "../nav-bar"
import styles from '@/styles/Home.module.css'
import { Product, ProductPropertyEntryDTO } from "@/api/types";
import { HeaderRow } from "../header-row";
import { BodyRow } from "../body-row";




const ProductsTable: React.FC<{products: Product[],properties:ProductPropertyEntryDTO[]}> = (props) => {
  const {products,properties} = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [compareItems,setCompareItems] = React.useState([]);
  const [showDiff,setShowDiff] = React.useState(false);
  const [firstProduct,setFirstProduct] = React.useState({});
  const [secondProduct,setSecondProduct] = React.useState({});

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

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
    <NavBar showDiff={showDiff} items={compareItems} Compare={()=>CompareFood()} />
    <Paper >
        <TableContainer className={styles.table_container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                    {properties.map((column) => (
                      <TableCell
                        key={column.name}
                        align={"center"}
                        style={{ minWidth: 170,position:"relative",padding:'20px' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                {showDiff && <TableRow>
                    {properties.map((column) => <HeaderRow key={column.name} column={column} firstProduct={firstProduct} secondProduct={secondProduct}  />)}
                </TableRow>}
            </TableHead>
            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow style={compareItems.includes(row.id) ? {backgroundColor:"#794350"} : {}} className={styles.clicked_row} onClick={()=> SelectedFood(row.id)} hover role="checkbox" tabIndex={-1} key={row.id}>
                      {properties.map((column) => <BodyRow key={column.name} row={row} column={column} />)}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
