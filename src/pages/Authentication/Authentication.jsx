import { Card, Grid } from '@mui/material';
import React from 'react';

import Register from './Register';
import Login from './Login';
import { Route, Routes } from 'react-router-dom';

const Authentication = () => {
  return (
    // ✅ Outer div to center content both vertically and horizontally
    <div className="h-screen flex items-center justify-center bg-gray-100">
      
      {/* ✅ Grid is not necessary for centering one card, but if needed: */}
      <Grid container justifyContent="center">
        
        {/* ✅ Set width and shadow to control card size and appearance */}
        <Card className="p-8 w-96 shadow-lg">
          
          {/* ✅ Title and subtitle section */}
          <div className="flex flex-col items-center mb-5 space-y-1">
            <h1 className="text-center text-xl font-semibold">Social Media App</h1>
            <p className="text-center text-sm text-gray-600 w-[70%]">
              Connecting Lives, Sharing Stories: Your Social World, Your Way
            </p>
          </div>

         <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/login' element={<Login/>} ></Route>
             <Route path='/register' element={<Register/>}></Route>
         </Routes>
        
        </Card>
      </Grid>
    </div>
  );
};

export default Authentication;
