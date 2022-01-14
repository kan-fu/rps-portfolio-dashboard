import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'
import { PctChange, Summaries } from '../../utils/types'
import Box from '@mui/material/Box'

export default function Summary({
  summaries,
  pctChanges,
}: {
  summaries: Summaries | null
  pctChanges: PctChange[]
}) {
  const [showAll, setShowAll] = React.useState(false)
  const lastWeekPctChanges = pctChanges[pctChanges.length - 1]
  const sortedSummaries =
    summaries &&
    Object.entries(summaries).sort((a, b) => -a[1].sharpe + b[1].sharpe)

  return (
    <React.Fragment>
      <Title>Summary</Title>
      <Box sx={{ overflow: 'auto', maxHeight: 350 }}>
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Strategy</TableCell>
              <TableCell align='right'>Last Week</TableCell>
              <TableCell align='right'>Cum. Return</TableCell>
              <TableCell align='right'>Ann. Return</TableCell>
              <TableCell align='right'>Sharpe Ratio</TableCell>
              <TableCell align='right'>Max Drawdown (MDD)</TableCell>
              <TableCell align='center'>MDD Start</TableCell>
              <TableCell align='center'>MDD End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedSummaries &&
              (showAll ? sortedSummaries : sortedSummaries.slice(0, 3)).map(
                ([key, val]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell
                      align='right'
                      sx={{
                        color: lastWeekPctChanges[key] > 0 ? 'red' : 'green',
                      }}
                    >
                      {((lastWeekPctChanges[key] as number) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell align='right'>
                      {(val.cumlativeReturn * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell align='right'>
                      {(val.annualizedReturn * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell align='right'>{val.sharpe.toFixed(2)}</TableCell>
                    <TableCell align='right'>
                      {(val.maxDrawdown * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell align='center'>{val.maxDrawdownStart}</TableCell>
                    <TableCell align='center'>{val.maxDrawdownEnd}</TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
        <Link
          color='primary'
          onClick={() => setShowAll(!showAll)}
          sx={{ mt: 3, display: showAll ? 'none' : 'block' }}
        >
          See more strategies
        </Link>
      </Box>
    </React.Fragment>
  )
}
