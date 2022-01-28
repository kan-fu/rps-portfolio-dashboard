export interface Summary {
  annualizedReturn: number
  cumlativeReturn: number
  maxDrawdown: number
  maxDrawdownEnd: string
  maxDrawdownStart: string
  sharpe: number
}

export interface Summaries {
  // D10?: Summary
  // D10GT: Summary
  // D10LS: Summary
  // D30: Summary
  // D30GT: Summary
  // D30W10GT: Summary
  // D30LS: Summary
  // D30LSW5LS: Summary
  // D5: Summary
  // D5GT: Summary
  // D5LS: Summary
  // D5U: Summary
  // RPS: Summary
  // W10: Summary
  // W10GT: Summary
  // W10LS: Summary
  // W5: Summary
  // W5GT: Summary
  // W5LS: Summary
  // W5U: Summary
  [key: string]: Summary
}
export interface PctChange {
  date: string
  [key: string]: number | string
}

export interface StockPctChange extends PctChange{
  
  D10: number
  D10GT: number
  D10LS: number
  D30: number
  D30GT: number
  D30W10GT: number
  D30LS: number
  D30LSW5LS: number
  D5: number
  D5GT: number
  D5LS: number
  D5U: number
  RPS: number
  W10: number
  W10GT: number
  W10LS: number
  W5: number
  W5GT: number
  W5LS: number
  W5U: number
  
}
export type Option = 'single' | 'cumulative' | 'topN'

export interface Portfolio {
  date: string
  [key: string]: string
}

export interface StockPortfolio extends Portfolio {
  
  D10: string
  D10GT: string
  D10LS: string
  D30: string
  D30GT: string
  D30W10GT: string
  D30LS: string
  D30LSW5LS: string
  D5: string
  D5GT: string
  D5LS: string
  D5U: string
  RPS: string
  W10: string
  W10GT: string
  W10LS: string
  W5: string
  W5GT: string
  W5LS: string
  W5U: string
}

interface ETFPctChange extends PctChange {
  rps120_1: number
  rps120_2: number
  rps250_1: number
  rps250_2: number
  rps50_1: number
  rps50_2: number
  rps5_1: number
  rps5_2: number
}

export interface ETFPctChangeTop extends ETFPctChange {
  rps120_250_1: number
  rps120_250_2: number
}

export interface ETFPctChangeBot extends ETFPctChange {
  rps5_50_1: number
  rps5_50_2: number
}

interface ETFPortfolio extends Portfolio{
  rps120_1: string
  rps120_2: string
  rps250_1: string
  rps250_2: string
  rps50_1: string
  rps50_2: string
  rps5_1: string
  rps5_2: string
}

export interface ETFPortfolioTop extends ETFPortfolio {
  rps120_250_1: string
  rps120_250_2: string
}

export interface ETFPortfolioBot extends ETFPortfolio {
  rps5_50_1: string
  rps5_50_2: string
}
