import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from '@/styles/Home.module.css'
import { HeaderRow } from "../header-row";
import { BodyRow } from "../body-row";
import {TableTypes} from "../types";


const MainTable = (props:TableTypes) => {
    const {properties,showDiff,products,compareItems,firstProduct,secondProduct,page,rowsPerPage,SelectedFood} = props;
    return (
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
                  {showDiff && 
                    <TableRow>
                        {properties.map((column) => <HeaderRow key={column.name} column={column} firstProduct={firstProduct} secondProduct={secondProduct}  />)}
                    </TableRow>
                  }
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
    );
};

export default MainTable;