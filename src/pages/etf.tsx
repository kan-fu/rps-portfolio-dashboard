import React from 'react'
import SEO from '../components/SEO'
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
      <SEO link='https://rps-portfolio.netlify.app/etf' title='RPS | ETF' />

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
        rps120_250_2
        rps120_2
        rps250_1
        rps250_2
        rps50_1
        rps50_2
        rps5_1
        rps5_2
      }
      etfPortfolioBot: etfPortfolio(type: "bot") {
        date
        rps120_1
        rps120_2
        rps250_1
        rps250_2
        rps50_1
        rps50_2
        rps5_1
        rps5_2
        rps5_50_1
        rps5_50_2
      }
      etfPctChangesTop: etfPctChanges(type: "top") {
        date
        rps120_1
        rps120_250_1
        rps120_250_2
        rps120_2
        rps250_1
        rps250_2
        rps50_1
        rps50_2
        rps5_1
        rps5_2
      }
      etfPctChangesBot: etfPctChanges(type: "bot") {
        date
        rps120_1
        rps120_2
        rps250_1
        rps250_2
        rps50_1
        rps50_2
        rps5_1
        rps5_2
        rps5_50_1
        rps5_50_2
      }
    }
  }
`

export default ETF
