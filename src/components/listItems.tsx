import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'gatsby-theme-material-ui'
import Box from '@mui/material/Box'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import SvgIcon from '@mui/material/SvgIcon'

function ETFIcon(props:any) {
  return (
    <SvgIcon {...props}>
      <path d='m 3.5 18.49 l 6 -6.01 l 4 4 L 22 6.92 l -1.41 -1.41 l -7.09 7.97 l -4 -4 L 2 16.99 z M 19 14 L 19 14 L 19 15 L 19 15 L 19 19 L 22 19 L 22 18 L 20 18 L 20 17 L 22 17 L 22 16 L 20 16 L 20 15 L 22 15 L 22 15 L 22 14 L 19 14 C 19 14 19 14 19 14 Z' />
    </SvgIcon>
  )
}

export const listItems = (
  <div>
    <ListItem button>
      <Link to='/stock' style={{ textDecoration: 'none', width: '100%' }}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
          }}
        >
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>

          <ListItemText
            primary='Stock'
            sx={{ color: 'black', display: 'inline-block' }}
          />
        </Box>
      </Link>
    </ListItem>
    <ListItem button>
      <Link to='/etf' style={{ textDecoration: 'none', width: '100%' }}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
          }}
        >
          <ListItemIcon>
            <ETFIcon />
          </ListItemIcon>
          <ListItemText
            primary='ETF'
            sx={{ color: 'black', display: 'inline-block' }}
          />
        </Box>
      </Link>
    </ListItem>
    {/* <ListItem button>
      <Link to='/about' style={{ textDecoration: 'none', width: '100%' }}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
          }}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText
            primary='About'
            sx={{ color: 'black', display: 'inline-block' }}
          />
        </Box>
      </Link>
    </ListItem> */}
  </div>
)
