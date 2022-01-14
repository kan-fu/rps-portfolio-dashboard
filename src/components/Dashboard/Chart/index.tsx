import * as React from 'react'

import { useTheme } from '@mui/material/styles'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from 'recharts'

import ChartHeader from './ChartHeader'

import { PALETTE20, PALETTE12, API_URL } from '../../../utils/constants'
import {
  ETFPctChangeBot,
  ETFPctChangeTop,
  StockPctChange,
  Summaries,
  Option,
} from '../../../utils/types'

import { calCumPctReturns, calSummary } from '../../../utils/helpers'

const CustomizedLabel = (props: any) => {
  const { x, y, stroke, index, legend, length } = props
  if (index === length) {
    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor='right'>
        {legend}
      </text>
    )
  } else return null
}

export default function Chart({
  pctChanges,
  // setPctChanges,
  pctChangesToShow,
  setPctChangesToShow,
  setSummaries,
  type,
  page,
}: {
  pctChanges: (ETFPctChangeBot | ETFPctChangeTop | StockPctChange)[]
  // setPctChanges: React.Dispatch<React.SetStateAction<PctChange[]>>
  pctChangesToShow: (ETFPctChangeBot | ETFPctChangeTop | StockPctChange)[]
  setPctChangesToShow: React.Dispatch<
    React.SetStateAction<(ETFPctChangeBot | ETFPctChangeTop | StockPctChange)[]>
  >
  setSummaries: React.Dispatch<React.SetStateAction<Summaries | null>>
  type: 'cn' | 'us' | 'top' | 'bot'
  page: 'etf' | 'stock'
}) {
  const theme = useTheme()

  const [cumPctReturns, setCumPctReturns] = React.useState<
    (ETFPctChangeBot | ETFPctChangeTop | StockPctChange)[]
  >([])
  const [topN, setTopN] = React.useState<string[]>([])
  const [botN, setBotN] = React.useState<string[]>([])
  const [sortedStrategies, setSortedStrategies] = React.useState<string[]>([])
  const [startYear, setStartYear] = React.useState<number | ''>('')

  const [options, setOptions] = React.useState<Option[]>(() => ['cumulative'])
  const N = 3 // Top and bottom N

  const isSingleYear = options.includes('single')

  const isCumulative = options.includes('cumulative')

  const isTopN = options.includes('topN')

  const palette = page === 'stock' ? PALETTE20 : PALETTE12

  const setTopBotCum = (
    newPctChangestoShow: (ETFPctChangeBot | ETFPctChangeTop | StockPctChange)[]
  ) => {
    setPctChangesToShow(newPctChangestoShow)
    const newCumPctReturns = calCumPctReturns(newPctChangestoShow)
    setCumPctReturns(newCumPctReturns)
    const summaries = calSummary(newPctChangestoShow)
    // Sort by accumulated returns
    const latestCumPctChange = Object.entries(
      newCumPctReturns[newCumPctReturns.length - 1]
    )
      .filter(([key, _]) => key !== 'date')
      .sort((a, b) => (-a[1] as number) + (b[1] as number))

    setSummaries(summaries)

    setSortedStrategies(latestCumPctChange.map(([key, _]) => key))
    setTopN(latestCumPctChange.slice(0, N).map(([key, _]) => key))
    setBotN(latestCumPctChange.slice(-N).map(([key, _]) => key))
  }

  // Fetch pctChanges data from API
  React.useEffect(() => {
    setStartYear('')
    setOptions(['cumulative'])
    setPctChangesToShow(pctChanges)
    setTopBotCum(pctChanges)
  }, [type])

  // Filter the pctChanges to only show the ones that match the selected year
  React.useEffect(() => {
    if (startYear) {
      if (isSingleYear) {
        const startIndex = pctChanges.findIndex((pct) =>
          pct.date.startsWith(startYear.toString())
        )
        const endIndex = pctChanges.findIndex((pct) =>
          pct.date.startsWith((startYear + 1).toString())
        )
        const newPctChangestoShow = pctChanges.slice(
          startIndex,
          endIndex === -1 ? undefined : endIndex
        )
        setTopBotCum(newPctChangestoShow)
      } else {
        const startIndex = pctChanges.findIndex((pct) =>
          pct.date.startsWith(startYear.toString())
        )
        const newPctChangestoShow = pctChanges.slice(startIndex)
        setTopBotCum(newPctChangestoShow)
      }
    }
  }, [startYear, isSingleYear, pctChanges])

  return (
    <React.Fragment>
      <ChartHeader
        startYear={startYear}
        setStartYear={setStartYear}
        pctChanges={pctChanges}
        options={options}
        setOptions={setOptions}
        N={N}
      />
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          data={isCumulative ? cumPctReturns : pctChangesToShow}
          margin={{
            top: 10,
            right: 70,
            left: 10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='date'
            height={60}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            tickFormatter={(tick) => `${Math.round(tick * 100)}%`}
            // domain={
            //   isCumulative
            //     ? [
            //         (dataMin: number) => Math.floor(dataMin * 10) / 10,
            //         (dataMax: number) => Math.ceil(dataMax),
            //       ]
            //     : ['auto', 'auto']
            // }
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              return [...topN, ...botN].includes(name)
                ? [`${Math.round(value * 1000) / 10}%`, name]
                : [null, null]
            }}
            isAnimationActive={false}
            wrapperStyle={{ zIndex: 1000 }}
            // @ts-ignore
            // itemSorter={(item) => -item.value}
          />
          {(isTopN ? topN : sortedStrategies).map((strategy) => (
            <Line
              dataKey={strategy}
              stroke={palette[strategy]}
              dot={false}
              animationDuration={800}
              key={strategy}
            >
              <LabelList
                content={
                  <CustomizedLabel
                    legend={strategy}
                    stroke={palette[strategy]}
                    length={pctChangesToShow.length - 1}
                  />
                }
              />
            </Line>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
