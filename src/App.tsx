import React, { useState, lazy, Suspense } from 'react';
// material元件
// import AppBar from '@mui/material/AppBar';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import DiamondIcon from '@mui/icons-material/Diamond';
import DryIcon from '@mui/icons-material/Dry';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// 多國語言
import { IntlProvider, FormattedMessage } from 'react-intl';
import en from './i18n/en';
import zh from './i18n/zh';
// router
import { Route, NavLink, Routes } from 'react-router-dom';

const theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: '#16504b',
    },
    secondary: {
      main: '#f50057',
    },
    info: {
      main: '#676F54',
    },
    warning: {
      main: '#FDE74C',
    },
    error: {
      main: '#A93636',
    },
    success: {
      main: '#62dc66',
    },
  },
  // typography: {
  //   // Tell Material-UI what's the font-size on the html element is.
  //   htmlFontSize: 20,
  // },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 900,
  //     md: 900,
  //     lg: 1000,
  //     xl: 1200,
  //   },
  // },
});

// router
const Product = lazy(() => import('./pages/Product'));
const FlowerBox = lazy(() => import('./pages/FlowerBox'));
const Lesson = lazy(() => import('./pages/Lesson'));
const Contact = lazy(() => import('./pages/Contact'));
const NotMatch = lazy(() => import('./pages/NotMatch'));

/** 菜單寬度 */
const drawerWidth = 240;

function App(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [locale, setLocale] = useState(navigator.language);
  const [message, setMessage] = useState(zh);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /** header樣式 */
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<MuiAppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    position: 'relative'
  }));

  const menu = [
    { id: 'product', icon: <ViewInArIcon /> },
    { id: 'flowerbox', icon: <DiamondIcon /> },
    { id: 'lesson', icon: <DryIcon /> },
    { id: 'contact', icon: <LocalPostOfficeIcon /> }
  ]

  /** menu */
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menu.map(v => (
          <NavLink to={`/${v.id}`} key={v.id}>
            <ListItem button>
              <ListItemIcon>
                {v.icon}
              </ListItemIcon>
              <ListItemText primary={handleI18n(v.id)} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  /** 處理多國語言 */
  function handleI18n(id: string) {
    return <FormattedMessage
      id={id}
      defaultMessage={id}
    />
  }

  return (
    <IntlProvider locale={locale} messages={message}>
      <div className="App">
        <ThemeProvider theme={theme}>
          {/* header */}
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <FormattedMessage
                    id="emmas_shop"
                    defaultMessage="emmas_shop"
                  />
                </Typography>
                <Button color="inherit" onClick={() => { setLocale('en'); setMessage(en) }}>English</Button>
                <Button color="inherit" onClick={() => { setLocale('zh'); setMessage(zh) }}>中文</Button>
                <Button color="inherit">
                  <FormattedMessage
                    id="login"
                    defaultMessage="login"
                  />
                </Button>
              </Toolbar>
            </AppBar>
          </Box>

          {/* menu */}
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          {/* content */}
          <Box
            component="div"
            sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, flexShrink: { sm: '100%' } }}
            aria-label="mailbox folders"
          >
            <Routes>
              <Route
                path="/"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <Product />
                  </React.Suspense>
                } />
              <Route
                path="/product"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <Product />
                  </React.Suspense>
                } />
              <Route
                path="/flowerbox"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <FlowerBox />
                  </React.Suspense>
                } />
              <Route
                path="/lesson"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <Lesson />
                  </React.Suspense>
                } />
              <Route
                path="/contact"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <Contact />
                  </React.Suspense>
                } />
              <Route
                path="*"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <NotMatch />
                  </React.Suspense>
                } />
            </Routes>
          </Box>
        </ThemeProvider>
      </div>
    </IntlProvider>
  );
}

export default App;
