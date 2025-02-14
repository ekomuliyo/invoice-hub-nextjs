import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, ListItemButton, ListItemIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex'}}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1C2434' },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <Typography variant="h6" sx={{ padding: 2, color: '#FFFFFF', textAlign: 'center' }}>
            InvoiceHub
          </Typography>
          <Typography variant="subtitle1" sx={{ paddingLeft: 2, color: '#FFFFFF' }}>
            Menu
          </Typography>
          <List>
            <ListItem disablePadding>
                <ListItemButton component="a" href="/invoices/add">
                    <ListItemIcon>
                        <AddIcon sx={{ color: '#FFFFFF' }} />
                    </ListItemIcon>
                    <ListItemText primary="Add Invoice" sx={{ color: '#FFFFFF' }} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a" href="/invoices/list">
                    <ListItemIcon>
                        <ListIcon sx={{ color: '#FFFFFF' }} />
                    </ListItemIcon>
                    <ListItemText primary="My Invoices" sx={{ color: '#FFFFFF' }} />
                </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;