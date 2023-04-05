import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';



export default function ButtonAppBar() {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "transparent", marginTop: 0 }} className='Appbar' position="static">
        <Toolbar>
          <button class='glowing-btn'><span class='glowing-txt'>Por<span class='faulty-letter'>t</span>folio</span></button>
        </Toolbar>
      </AppBar>

    </Box>
  );
}
