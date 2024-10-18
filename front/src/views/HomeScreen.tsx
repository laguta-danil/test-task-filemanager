import styled from "@emotion/styled";
import { Box, Button, CssBaseline, Divider, FormControl, FormControlLabel, FormLabel, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {  GoogleIcon } from "../assets/singUpIcons";
import Stack from '@mui/material/Stack';


const Card = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
      }));
  
  const Container = styled(Stack)(({ theme }) => ({
    minHeight: '100%',
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      inset: 0,
      backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      backgroundRepeat: 'no-repeat',
      
    },
  }));
  
  export function HomeScreen(props: { disableCustomTheme?: boolean }) {
  
    return (
      <Box sx={{ backgroundColor: 'Scrollbar', p: 5, borderRadius: 4, width: '30%', maxWidth: 480, minWidth: 240, color: 'black'}}>
                tratata
      </Box>
    );
  }

