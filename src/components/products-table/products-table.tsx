import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Chip } from '@material-ui/core';

import styles from '@/styles/Home.module.css'
import { Product, ProductPropertyEntryDTO } from "@/api/types";


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
  const CompareFood =async () => {
    setShowDiff(true)
    setFirstProduct(products.find(ele=> ele.id === compareItems[0]))
    setSecondProduct(products.find(ele=> ele.id === compareItems[1]))
  }

  return( <>
     <AppBar className={styles.navbar} color="inherit" position="static">
        <Toolbar className={styles.toolbar}>
            <div className={styles.toolbar_left}>
              <IconButton className={styles.burger_icon} edge="start" color="inherit" aria-label="menu">
                 <MenuIcon />
              </IconButton>
              {compareItems.length > 0 &&( 
                <Typography variant="h6" >
                  {compareItems.length === 1 ? '1 product selected' : `${compareItems.length} products selected` }
                </Typography>
                )}
              
            </div>
            <Button onClick={()=> CompareFood()} variant="contained" disabled={compareItems.length < 2 || showDiff}>
              {compareItems.length < 2 ? "select 2 products to compare" : "compare products"}
            </Button>
        </Toolbar>
    </AppBar>
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
                    {properties.map((column) =>{
                      const value1 = firstProduct[column.name]
                      const value2 = secondProduct[column.name]
                      if(column.name === "name"){
                          return <TableCell
                          key={column.name}
                          align={"center"}
                          style={{ minWidth: 170,position:"relative",padding:'20px' }}
                          >
                            <Typography>{value1} vs {value2}</Typography>
                          </TableCell>
                      }

                      if(column.name === 'tags'){
                          const tags = [];
                          firstProduct['tags'] && firstProduct['tags'].map(tag=> !tags.includes(tag) && tags.push(tag))
                          secondProduct['tags'] && secondProduct['tags'].map(tag=> !tags.includes(tag) && tags.push(tag))

                          return( 
                          <TableCell
                                    key={column.name}
                                    align={"center"}
                                    style={{ minWidth: 170,position:"relative",padding:'20px' }}
                                  >
                              <Typography>{tags.length > 0 ? tags.join(', ') : '-'}</Typography>
                          </TableCell>
                          ) 
                      }
                       
                   
                    return( <TableCell
                        key={column.name}
                        align={"center"}
                        style={{ minWidth: 170,position:"relative",padding:'20px 16px' }}
                      >
                       {value1 === undefined && value2 === undefined ?
                         "-" 
                         : 
                         value1 !== value2 && value1 !== 0 && value2 !== 0  ? 
                            <>
                              <Chip style={{marginRight:"5px",textDecoration:"line-through"}} color="secondary" label={`${value1 || " - "}`} />
                              <Chip color="primary"  label={`${value2 || " - "}`} />  
                            </>
                            :`${value1 || value2}`
                      }
                     
                      
                    
                    </TableCell>)
                  })}
              </TableRow>}
            </TableHead>
            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow style={compareItems.includes(row.id) ? {backgroundColor:"#794350"} : {}} className={styles.clicked_row} onClick={()=> SelectedFood(row.id)} hover role="checkbox" tabIndex={-1} key={row.id}>
                      {properties.map((column) => {
                        
                        const value = row[column.name]; 
                        
                        if(column.name === 'tags'){
                          return <TableCell key={column.name} style={{ minWidth: 170,position:"relative",padding:'20px 16px' }} align={"center"}>
                             {typeof value === 'object' && value ? value.join(', ') : '-'} 
                            
                        </TableCell>
                        }          
                          return (
                            <TableCell key={column.name} style={{ minWidth: 170,position:"relative",padding:'20px 16px' }} align={"center"}>
                              {value !== undefined ? value : '-'}
                            </TableCell>
                          );
                        })}
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
