import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import {
   DataGrid,
   GridRowsProp,
   GridColDef,
   GridRenderCellParams,
} from '@mui/x-data-grid';
import { fullWidthFlex } from 'shared/styles';

const rows: GridRowsProp = [
   {
      id: 1,
      col1: 'Hello',
      col2: 'World',
   },
   {
      id: 2,
      col1: 'DataGridPro',
      col2: 'is Awesome',
   },
   {
      id: 3,
      col1: 'MUI',
      col2: 'is Amazing',
   },
];

const columns: GridColDef[] = [
   { field: 'col1', headerName: 'Column 1', width: 150 },
   { field: 'col2', headerName: 'Column 2', width: 150 },
   {
      field: 'col3',
      headerName: 'Column3',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
         return <Button variant="contained">Block</Button>;
      },
   },
];

export const AdminList = () => {
   return (
      <div style={fullWidthFlex('column', 10)}>
         <div>
            <Button color="success" variant="outlined" startIcon={<Add />}>
               Them tai khoan moi
            </Button>
         </div>
         <DataGrid rows={rows} columns={columns} />
      </div>
   );
};
