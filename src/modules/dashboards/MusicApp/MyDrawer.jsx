import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import Chatbot from './Chatbot';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { BotProvider } from '@crema/eOfficeBot/BotContext';
import Bot from '@crema/eOfficeBot/Component/Bot';
// import { styled } from '@mui/material/styles';
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });


export default function MyDrawer() {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
      noValidate
      autoComplete="off"
    >

      {/* <div style={{height:'500px', width:'350px'}}><Chatbot/></div> */}
        <div style={{ height: '700px', width: '350px' }}>
          <BotProvider>
            <Bot />
          </BotProvider>
        </div>
    </Box>
  );

  return (
    <>

      <div style={{ marginLeft: '1340px', marginTop: '110px' }}>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <QuestionMarkIcon style={{ color: 'white', backgroundColor: 'orange', borderRadius: '30px', height: '35px', width: '60px', marginLeft: '-8px' }} onClick={toggleDrawer(anchor, !state[anchor])} />
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              sx={{ '& .MuiDrawer-paper': { height: '67%', width: '350px' } }}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
