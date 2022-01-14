import React from 'react'
import Dashboard from '../components/Dashboard'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { StockPortfolio, StockPctChange } from '../utils/types'

interface dataProps {
  rps: {
    stockPortfolioUS: StockPortfolio
    stockPortfolioCN: StockPortfolio
    stockPctChangesUS: StockPctChange[]
    stockPctChangesCN: StockPctChange[]
  }
}

const Stock = ({ data }: { data: dataProps }) => {
  const [type, setType] = React.useState<'cn' | 'us' | 'top' | 'bot'>('cn')
  const stockPortfolio =
    type === 'cn' ? data.rps.stockPortfolioCN : data.rps.stockPortfolioUS
  const stockPctChanges =
    type === 'cn' ? data.rps.stockPctChangesCN : data.rps.stockPctChangesUS
  return (
    <div>
      <Helmet title='RPS | Stock' />
      <Dashboard
        page='stock'
        type={type}
        setType={setType}
        portfolio={stockPortfolio}
        pctChanges={stockPctChanges}
      />
    </div>
  )
}
export const query = graphql`
  query MyQuery {
    rps {
      stockPortfolioUS: stockPortfolio(type: "us") {
        date
        D10
        D10GT
        D10LS
        D30
        D30GT
        D30LS
        D30LSW5LS
        D30W10GT
        D5
        D5GT
        D5LS
        D5U
        RPS
        W10
        W10GT
        W10LS
        W5
        W5GT
        W5U
        W5LS
      }
      stockPortfolioCN: stockPortfolio(type: "cn") {
        date
        D10
        D10GT
        D10LS
        D30
        D30GT
        D30LS
        D30LSW5LS
        D30W10GT
        D5
        D5GT
        D5LS
        D5U
        RPS
        W10
        W10GT
        W10LS
        W5
        W5GT
        W5U
        W5LS
      }
      stockPctChangesUS: stockPctChanges(type: "us") {
        date
        D10
        D10GT
        D10LS
        D30
        D30GT
        D30LS
        D30LSW5LS
        D30W10GT
        D5
        D5GT
        D5LS
        D5U
        RPS
        W10
        W10GT
        W10LS
        W5
        W5GT
        W5U
        W5LS
      }
      stockPctChangesCN: stockPctChanges(type: "cn") {
        date
        D10
        D10GT
        D10LS
        D30
        D30GT
        D30LS
        D30LSW5LS
        D30W10GT
        D5
        D5GT
        D5LS
        D5U
        RPS
        W10
        W10GT
        W10LS
        W5
        W5GT
        W5U
        W5LS
      }
    }
  }
`
export default Stock
