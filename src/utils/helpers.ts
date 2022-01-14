import {
  ETFPctChangeBot,
  ETFPctChangeTop,
  StockPctChange,
  Summaries,
} from './types'

const commision = 0.00126
export const range = (start: number, stop: number, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)

export const calCumPctReturns = (
  pctChanges: (ETFPctChangeBot | ETFPctChangeTop | StockPctChange)[]
) => {
  const cumPctReturns: (ETFPctChangeBot | ETFPctChangeTop | StockPctChange)[] =
    []
  for (const pct of pctChanges) {
    if (cumPctReturns.length === 0) {
      cumPctReturns.push(pct)
    } else {
      const cumpct: ETFPctChangeBot | ETFPctChangeTop | StockPctChange = {
        ...cumPctReturns[cumPctReturns.length - 1],
      }
      for (const key in pct) {
        if (key === 'date') {
          cumpct[key] = pct[key]
        } else {
          cumpct[key] =
            ((cumpct[key] as number) + 1) *
              ((pct[key] as number) + 1 - commision) -
            1
        }
      }
      cumPctReturns.push(cumpct)
    }
  }
  return cumPctReturns
}

const convertFormat = (
  pctChanges: (ETFPctChangeBot | ETFPctChangeTop | StockPctChange)[]
) => {
  // Convert [{D10: 0.01,D30:0.1}, {D10:0.02:D30:0.2}] to {D10: [0.01, 0.02],D30:[0.1,0.2]} for analysis
  const strategies = Object.keys(pctChanges[0]).filter((key) => key !== 'date')
  return strategies.reduce(
    (preV: { [key: string]: Array<number> }, strategy) => {
      preV[strategy] = pctChanges.map((pct) => pct[strategy] as number)
      return preV
    },
    {}
  )
}
const calSharpe = (array: Array<number>) => {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  const std = Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (n - 1)
  )
  return { sharpe: ((mean - commision) / std) * 50 ** 0.5 }
}

const maxDrawdown = (equityCurve: Array<number>) => {
  // Initialisations
  let highWaterMark = -Infinity
  let maxDd = -Infinity
  let idxHighWaterMark = -1
  let idxStartMaxDd = -1
  let idxEndMaxDd = -1

  // Loop over all the values to compute the maximum drawdown
  for (let i = 0; i < equityCurve.length; ++i) {
    if (equityCurve[i] > highWaterMark) {
      highWaterMark = equityCurve[i]
      idxHighWaterMark = i
    }

    let dd = (highWaterMark - equityCurve[i]) / highWaterMark

    if (dd > maxDd) {
      maxDd = dd
      idxStartMaxDd = idxHighWaterMark
      idxEndMaxDd = i
    }
  }

  // Return the computed values
  return [maxDd, idxStartMaxDd, idxEndMaxDd]
}

const calMDD = (array: Array<number>, dates: string[]) => {
  const equityCurve = array.reduce((preV: Array<number>, curV) => {
    preV.length
      ? preV.push(preV[preV.length - 1] * (curV + 1 - 0))
      : preV.push(curV + 1 - commision)
    return preV
  }, [])
  const mdd = maxDrawdown(equityCurve)
  return {
    maxDrawdown: mdd[0],
    maxDrawdownStart: dates[mdd[1]],
    maxDrawdownEnd: dates[mdd[2]],
  }
}

const calReturn = (array: Array<number>) => {
  const n = array.length
  const cumlativePctChange = array.reduce(
    (preV, curV) => preV * (curV + 1 - commision),
    1
  )
  return {
    annualizedReturn: cumlativePctChange ** (50 / n) - 1,
    cumlativeReturn: cumlativePctChange - 1,
  }
}

export const calSummary = (
  pctChanges: (ETFPctChangeBot | ETFPctChangeTop | StockPctChange)[]
) => {
  const convertedPctChanges = convertFormat(pctChanges)
  const dates = pctChanges.map((pct) => pct.date)
  const summary: Summaries = {}
  for (const key in convertedPctChanges) {
    summary[key] = {
      ...calSharpe(convertedPctChanges[key]),
      ...calReturn(convertedPctChanges[key]),
      ...calMDD(convertedPctChanges[key], dates),
    }
  }
  return summary
}
