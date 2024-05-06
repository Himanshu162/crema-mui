import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: 'blue',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#EF6C00',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };


const Chatbot = () => {
  return (
    <>
     <ThemeProvider theme={theme}>
        <ChatBot
            steps={[
                {
                id: '1',
                message: 'Hello! How can I help You?',
                trigger: '2',
                },
                {
                id: '2',
                user: true,
                trigger: '3',
                },
                {
                id: '3',
                message: 'Okay we will look into it and get back to you!!',
                trigger:'4',
                },
                {
                    id: '4',
                    user: true,
                    trigger: '5',
                },
                {
                    id: '5',
                    message: 'You can also upload the screenshot of your problem, that would allow us to solve your problem better',
                    trigger: '6',
                },
                {
                    id: '6',
                    user: true,
                    trigger: '7',
                },
                {
                    id: '7',
                    message: 'If you need any further assisstance, I am here to help you out',
                   trigger:'8'
                },
                {
                    id: '8',
                    message: 'Have a nice day!!',
                    trigger : '9',
                },
                {
                    id: '9',
                    user: true,
                    trigger: '10',
                },
                {
                    id: '10',
                    message: 'We will get back to you soon!!',
                    trigger: '11',
                },
                {
                    id: '11',
                    user: true,
                    trigger: '12',
                },
                {
                    id: '12',
                    message: 'Happy to help you :)',
                    end: true,
                },
  ]}/>
  </ThemeProvider>
    </>
  )
}

export default Chatbot
