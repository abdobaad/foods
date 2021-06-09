import React from 'react';
import TableCell from '@material-ui/core/TableCell';

const BodyRow = ({column,row}) => {
    
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

};

export default BodyRow;