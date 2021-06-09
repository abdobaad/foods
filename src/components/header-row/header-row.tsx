import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { Chip } from '@material-ui/core';

const HeaderRow = ({column,firstProduct,secondProduct}) => {
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
           </TableCell>) 
      }
                   
               
       return( <TableCell
           key={column.name}
           align={"center"}
           style={{ minWidth: 170,position:"relative",padding:'20px 16px' }}
             >
              {value1 === undefined && value2 === undefined ? "-" 
                 : 
                value1 !== value2 && value1 !== 0 && value2 !== 0  ? 
                   <>
                     <Chip style={{marginRight:"5px",textDecoration:"line-through"}} color="secondary" label={`${value1 || " - "}`} />
                     <Chip color="primary"  label={`${value2 || " - "}`} />  
                   </>
                 :`${value1 || value2}`
                }
        </TableCell>
       )
}

export default HeaderRow;