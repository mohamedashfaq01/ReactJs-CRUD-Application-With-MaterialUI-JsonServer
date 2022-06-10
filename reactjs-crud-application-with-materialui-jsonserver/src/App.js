import React from 'react';
import './App.css';
import Title from 'antd/lib/typography/Title';
import Contact from './Contact';
import Test from './Test';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu } from 'antd';
import AllUsers from './Component/AllUsers';
import EditUser from './Component/EditUser';
import NotFound from './Component/NotFound';
import 'antd/dist/antd.css';
import Grid from "@material-ui/core/Grid";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#fff"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Grid container style={{ borderBottom: '1px solid #dee2e6', height: 50 }}>
        <Grid item xs={2}>
          <Title style={{ color: '#095dff', fontFamily: 'Inter', fontSize: 18, marginTop: 12, marginLeft: 20 }}
            level={2}>CRUD React App</Title>
        </Grid>
        <Grid item xs={8} style={{ textAlign: 'center', marginTop: 10 }}>
          <img src="./logo192.png" height={'35px'}/>
        </Grid>
        <Grid item xs={2} style={{ padding: 0 }}>
          <CardHeader style={{ height: 50 }}
            avatar={
              <Avatar
                alt='Mohamed Ashfaq'
                src='./p1.png'
              />
            }
            title="Mohamed Ashfaq"
          />
        </Grid>
      </Grid>

      <Grid container items={12}>
        <Grid container items={12}>
          <Grid item xs={2} style={{ borderRight: '1px solid #dee2e6' }}>
            <br />
            <div id="workspace-sidebar-text">WORKSPACE</div>
            <Menu
              defaultSelectedKeys={['Dashboard']}
              mode="inline">
              <Menu.Item key='Dashboard'>
                Menu 1
                <Link to="/all" />
              </Menu.Item>
              <Menu.Item key='Contact'>
                Menu 2
                <Link to="/contact" />
              </Menu.Item>
              <Menu.Item key='Users'>
                Menu 3
                <Link to="/test" />
              </Menu.Item>
            </Menu>
          </Grid>
          <Grid item xs={10}>
            <Routes>
              <Route path="/" element={<AllUsers />} />
              <Route path="test" element={<Test />} />
              <Route path="contact" element={<Contact />} />
              <Route path="/all" element={<AllUsers />} />
              {/* <Route path="/add" element={<AddEmployeeInfo />} /> */}
              <Route path="/edit/:id" element={<EditUser />} />
              <Route path="*" element={<NotFound />} />
              {/* </Route> */}
            </Routes>
          </Grid>
        </Grid>
      </Grid>
    </Router>
    <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
