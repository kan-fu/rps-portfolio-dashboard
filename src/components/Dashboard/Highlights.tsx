import * as React from 'react'
import Typography from '@mui/material/Typography'
import Title from './Title'
import { Summaries, Portfolio } from '../../utils/types'
import { API_URL } from '../../utils/constants'
import axios from 'axios'

import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

export default function Highlights({
  summaries,
  type,
  portfolio,
}: {
  summaries: Summaries | null
  type: 'cn' | 'us' | 'top' | 'bot'
  portfolio: Portfolio
}) {
  // const [portfolio, setPortfolio] = React.useState<Portfolio | null>(null)
  const [stockNames, setStockNames] = React.useState<string[]>([])
  const [stockRates, setStockRates] = React.useState<number[]>([])
  const winning =
    summaries &&
    Object.entries(summaries).sort((a, b) => -a[1].sharpe + b[1].sharpe)[0][0]

  React.useEffect(() => {
    if (type === 'us') {
      setStockNames([])
      setStockRates([])
    } else if (portfolio && winning && portfolio[winning]) {
      const stockList = portfolio[winning]
        .replaceAll('.', '')
        .replaceAll('S', 'S_S')
        .toLowerCase()
      setStockNames([])

      axios
        .get(`${API_URL}/api/v1/sina/${stockList}`)
        .then((res) => {
          const stockData: string[] = res.data.split(/;\n/)
          setStockNames(stockData.map((i: string) => i.split(/[",]/)[1]))
          setStockRates(
            stockData.map((i: string) => Number(i.split(/[",]/)[4]))
          )
        })
        .catch((err) => console.log(err))
    }
  }, [portfolio, winning])

  return (
    <>
      <Title>Winning Strategy</Title>
      <Typography component='p' variant='h4'>
        {winning?.toUpperCase()}
      </Typography>
      <Divider />
      <Typography color='text.secondary'>
        {portfolio && winning && `Portfolio for week ${portfolio['date']}`}
      </Typography>
      <Box sx={{ overflow: 'auto' }}>
        {portfolio &&
          winning &&
          portfolio[winning] &&
          portfolio[winning]
            .split(',')
            .map((item, i) => (
              <Chip
                label={
                  stockNames.length === 0 || i >= stockNames.length
                    ? item.slice(3)
                    : `${item.slice(3)} ${stockNames[i]} ${stockRates[i]}%`
                }
                variant='outlined'
                key={item}
                color={
                  type === 'us'
                    ? 'default'
                    : stockRates.length >= 0 && stockRates[i] > 0
                    ? 'error'
                    : 'success'
                }
                sx={{ m: 0.5 }}
                clickable
                component='a'
                href={
                  type === 'us'
                    ? `https://finance.yahoo.com/quote/${item.slice(3)}`
                    : `https://quote.eastmoney.com/${item.replace('.','')}.html`
                }
                target='_blank'
              />
            ))}
      </Box>
    </>
  )
}
