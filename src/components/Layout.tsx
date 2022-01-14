import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import ReactCountryFlag from 'react-country-flag'
import MenuIcon from '@mui/icons-material/Menu'
import CssBaseline from '@mui/material/CssBaseline'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'

import Typography from '@mui/material/Typography'

import IconButton from '@mui/material/IconButton'
import { listItems } from './listItems'
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const drawerWidth: number = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7),
      },
    }),
  },
}))

const MobileDrawer = styled(MuiDrawer)(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const mdTheme = createTheme()
const Layout = ({
  children,
  page,
  type,
  setType,
}: {
  children: React.ReactNode
  page: 'stock' | 'etf'
  type: 'cn' | 'us' | 'top' | 'bot'
  setType: React.Dispatch<React.SetStateAction<'cn' | 'us' | 'top' | 'bot'>>
}) => {
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const drawer = (
    <>
      <Toolbar
        variant='dense'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>{listItems}</List>
    </>
  )

  const select =
    page === 'etf' ? (
      <FormControl>
        <Select
          value={type}
          label='type'
          onChange={(event: SelectChangeEvent) =>
            setType(event.target.value as 'cn' | 'us')
          }
          variant='standard'
          disableUnderline
          sx={{color:'white'}}
        >
          <MenuItem value='top'>
            Top
          </MenuItem>
          <MenuItem value='bot'>
            Bot
          </MenuItem>
        </Select>
      </FormControl>
    ) : (
      <FormControl>
        <Select
          value={type}
          label='market'
          onChange={(event: SelectChangeEvent) =>
            setType(event.target.value as 'cn' | 'us')
          }
          variant='standard'
          disableUnderline
        >
          <MenuItem value='cn'>
            <ReactCountryFlag countryCode='CN' /> CN
          </MenuItem>
          <MenuItem value='us'>
            <ReactCountryFlag countryCode='US' /> US
          </MenuItem>
        </Select>
      </FormControl>
    )
  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position='absolute' open={open}>
            <Toolbar
              variant='dense'
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={toggleDrawer}
                sx={{
                  marginRight: '16px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component='h1'
                variant='h6'
                color='inherit'
                noWrap
                sx={{ flexGrow: 1 }}
              >
                RPS Portfolio - {page.toUpperCase()}
              </Typography>
              {select}
            </Toolbar>
          </AppBar>
          <MobileDrawer
            // variant='permanent'
            variant='temporary'
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            open={open}
            sx={{
              display: { xs: 'block', sm: 'none' },
            }}
          >
            {drawer}
          </MobileDrawer>
          <Drawer
            variant='permanent'
            open={open}
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {drawer}
          </Drawer>
          {children}
        </Box>
      </ThemeProvider>
    </>
  )
}

export default Layout
