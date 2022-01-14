import React from 'react'
import Helmet from 'react-helmet'
import Dashboard from '../components/Dashboard'
import { graphql } from 'gatsby'
import {
  ETFPortfolioTop,
  ETFPortfolioBot,
  ETFPctChangeTop,
  ETFPctChangeBot,
} from '../utils/types'

interface dataProps {
  rps: {
    etfPortfolioTop: ETFPortfolioTop
    etfPortfolioBot: ETFPortfolioBot
    etfPctChangesTop: ETFPctChangeTop[]
    etfPctChangesBot: ETFPctChangeBot[]
  }
}

const ETF = ({ data }: { data: dataProps }) => {
  const [type, setType] = React.useState<'cn' | 'us' | 'top' | 'bot'>('bot')
  const etfPortfolio =
    type === 'top' ? data.rps.etfPortfolioTop : data.rps.etfPortfolioBot
  const etfPctChanges =
    type === 'top' ? data.rps.etfPctChangesTop : data.rps.etfPctChangesBot
  return (
    <div>
      <Helmet title='RPS | ETF' />
      <Dashboard
        page='etf'
        type={type}
        setType={setType}
        portfolio={etfPortfolio}
        pctChanges={etfPctChanges}
      />
    </div>
  )
}

export const query = graphql`
  query {
    rps {
      etfPortfolioTop: etfPortfolio(type: "top") {
        date
        rps120_1
        rps120_250_1
        rps120_250_3
        rps120_3
        rps250_1
        rps250_3
        rps50_1
        rps50_3
        rps5_1
        rps5_3
      }
      etfPortfolioBot: etfPortfolio(type: "bot") {
        date
        rps120_1
        rps120_3
        rps250_1
        rps250_3
        rps50_1
        rps50_3
        rps5_1
        rps5_3
        rps5_50_1
        rps5_50_3
      }
      etfPctChangesTop: etfPctChanges(type: "top") {
        date
        rps120_1
        rps120_250_1
        rps120_250_3
        rps120_3
        rps250_1
        rps250_3
        rps50_1
        rps50_3
        rps5_1
        rps5_3
      }
      etfPctChangesBot: etfPctChanges(type: "bot") {
        date
        rps120_1
        rps120_3
        rps250_1
        rps250_3
        rps50_1
        rps50_3
        rps5_1
        rps5_3
        rps5_50_1
        rps5_50_3
      }
    }
  }
`

export default ETF
