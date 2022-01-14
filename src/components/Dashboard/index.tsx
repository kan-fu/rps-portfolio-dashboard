import * as React from 'react'

import Box from '@mui/material/Box'

import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import Chart from './Chart'
import Highlights from './Highlights'
import Summary from './Summary'
import {
  ETFPctChangeBot,
  ETFPctChangeTop,
  ETFPortfolioTop,
  ETFPortfolioBot,
  StockPctChange,
  StockPortfolio,
  Summaries,
} from '../../utils/types'
import Layout from '../Layout'

export default function DashboardContent({
  page,
  type,
  setType,
  portfolio,
  pctChanges,
}: {
  page: 'etf' | 'stock'
  type: 'cn' | 'us' | 'top' | 'bot'
  setType: React.Dispatch<React.SetStateAction<'cn' | 'us' | 'top' | 'bot'>>
  portfolio: ETFPortfolioTop | ETFPortfolioBot | StockPortfolio
  pctChanges: (ETFPctChangeBot | ETFPctChangeTop | StockPctChange)[]
}) {
  const [pctChangesToShow, setPctChangesToShow] =
    React.useState<(ETFPctChangeBot | ETFPctChangeTop | StockPctChange)[]>(
      pctChanges
    )
  const [summaries, setSummaries] = React.useState<Summaries | null>(null)

  return (
    <Layout page={page} type={type} setType={setType}>
      <Box
        component='main'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar variant='dense' />
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Highlights */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 340,
                }}
              >
                <Highlights
                  summaries={summaries}
                  type={type}
                  portfolio={portfolio}
                />
              </Paper>
            </Grid>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 340,
                }}
              >
                <Chart
                  pctChanges={pctChanges}
                  pctChangesToShow={pctChangesToShow}
                  setPctChangesToShow={setPctChangesToShow}
                  setSummaries={setSummaries}
                  page={page}
                  type={type}
                />
              </Paper>
            </Grid>

            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  p: 2,
                  maxHeight: 400,
                }}
              >
                <Summary summaries={summaries} pctChanges={pctChanges} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}
