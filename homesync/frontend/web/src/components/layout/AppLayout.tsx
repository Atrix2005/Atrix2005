import { PropsWithChildren, useMemo } from 'react'
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import DevicesIcon from '@mui/icons-material/Devices'
import BoltIcon from '@mui/icons-material/Bolt'
import AutoModeIcon from '@mui/icons-material/AutoMode'
import MenuIcon from '@mui/icons-material/Menu'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const drawerWidth = 240

const menu = [
  { label: 'Devices', path: '/devices', icon: <DevicesIcon /> },
  { label: 'Routines', path: '/routines', icon: <AutoModeIcon /> },
  { label: 'Energy', path: '/energy', icon: <BoltIcon /> }
]

export function AppLayout({ children }: PropsWithChildren) {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const selectedIndex = useMemo(
    () => menu.findIndex((m) => location.pathname.startsWith(m.path)),
    [location.pathname]
  )

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          HomeSync
        </Typography>
      </Toolbar>
      <List>
        {menu.map((m, idx) => (
          <ListItemButton key={m.path} selected={idx === selectedIndex} onClick={() => navigate(m.path)}>
            <ListItemIcon>{m.icon}</ListItemIcon>
            <ListItemText primary={m.label} />
          </ListItemButton>
        ))}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            HomeSync Smart Automation
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}