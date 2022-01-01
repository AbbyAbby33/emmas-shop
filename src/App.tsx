import React, { useState } from 'react';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/material/styles';
// 多國語言
import { IntlProvider, FormattedMessage } from 'react-intl';
import en from './i18n/en';
import zh from './i18n/zh';

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
  
  /** menu */
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['product', 'flowerbox', 'lesson', 'contact'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            {/* <ListItemText primary={text} /> */}
            <ListItemText primary={handleI18n(text)} />
          </ListItem>
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
                Emma's Shop
              </Typography>
              <Button color="inherit">
                <FormattedMessage
                  id="login"
                  defaultMessage="login"
                />
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

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
        <Box
          component="div"
          sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, flexShrink: { sm: '100%' } }}
          aria-label="mailbox folders"
        >
          <Button variant="contained" onClick={() => { setLocale('en'); setMessage(en) }}>English</Button>
          <Button variant="contained" onClick={() => { setLocale('zh'); setMessage(zh) }}>中文</Button>
        </Box>

      </div>
    </IntlProvider>
  );
}

export default App;
