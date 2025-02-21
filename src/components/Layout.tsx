"use client";

import React, { useState } from 'react';
import { 
  Box, Drawer, List, ListItem, ListItemText, 
  Typography, ListItemButton, ListItemIcon, 
  useMediaQuery, useTheme, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label={mobileOpen ? "close drawer" : "open drawer"}
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 2000,
            backgroundColor: mobileOpen ? 'transparent' : 'white',
            '&:hover': {
              backgroundColor: mobileOpen ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          {mobileOpen ? <CloseIcon sx={{ color: '#FFFFFF' }} /> : <MenuIcon />}
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: isMobile ? '100%' : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: isMobile ? '100%' : drawerWidth, 
            boxSizing: 'border-box', 
            backgroundColor: '#1C2434',
            zIndex: 1900
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              padding: 2, 
              color: '#FFFFFF', 
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
            onClick={handleHomeClick}
          >
            InvoiceHub
          </Typography>
          <Typography variant="subtitle1" sx={{ paddingLeft: 2, color: '#FFFFFF' }}>
            Menu
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/invoices/add" onClick={isMobile ? handleDrawerToggle : undefined}>
                <ListItemIcon>
                  <AddIcon sx={{ color: '#FFFFFF' }} />
                </ListItemIcon>
                <ListItemText primary="Add Invoice" sx={{ color: '#FFFFFF' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/invoices/list" onClick={isMobile ? handleDrawerToggle : undefined}>
                <ListItemIcon>
                  <ListIcon sx={{ color: '#FFFFFF' }} />
                </ListItemIcon>
                <ListItemText primary="My Invoices" sx={{ color: '#FFFFFF' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: isMobile ? 5 : 0 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;