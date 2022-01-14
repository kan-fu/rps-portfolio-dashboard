import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Box from '@mui/material/Box'
import Title from '../Title'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { range } from '../../../utils/helpers'
import { PctChange, Option } from '../../../utils/types'

const YearSelect = ({
  startYear,
  setStartYear,
  curYear,
}: {
  startYear: number | ''
  setStartYear: React.Dispatch<React.SetStateAction<number | ''>>
  curYear: number
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setStartYear(Number(event.target.value))
  }
  return (
    <FormControl size='small' sx={{ minWidth: 80 }}>
      <InputLabel>Year</InputLabel>
      <Select value={startYear.toString()} label='Age' onChange={handleChange}>
        {range(2016, curYear).map((year) => (
          <MenuItem value={year} key={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const ToggleOptionButtons = ({
  options,
  setOptions,
  startYear,
  N,
}: {
  options: Option[]
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>
  startYear: number | ''
  N: number
}) => {
  const handleOption = (
    event: React.MouseEvent<HTMLElement>,
    newOptions: Option[]
  ) => {
    setOptions(newOptions)
  }
  return (
    <ToggleButtonGroup
      size='small'
      value={options}
      onChange={handleOption}
      sx={{ mr: 2 }}
    >
      <ToggleButton value='single' disabled={startYear === ''}>
        1 Year
      </ToggleButton>
      <ToggleButton value='cumulative'>Cumulative</ToggleButton>
      <ToggleButton value='topN'>Top {N}</ToggleButton>
    </ToggleButtonGroup>
  )
}

const ChartHeader = ({
  startYear,
  pctChanges,
  setStartYear,
  options,
  setOptions,
  N,
}: {
  startYear: number | ''
  pctChanges: PctChange[]
  setStartYear: React.Dispatch<React.SetStateAction<number | ''>>
  options: Option[]
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>
  N: number
}) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      flexWrap='wrap'
      sx={{
        p: 2,
      }}
    >
      <Title>Weekly Percent Change</Title>
      <Box>
        <ToggleOptionButtons
          options={options}
          setOptions={setOptions}
          startYear={startYear}
          N={N}
        />
        <YearSelect
          startYear={startYear}
          setStartYear={setStartYear}
          curYear={Number(pctChanges[pctChanges.length - 1].date.slice(0, 4))}
        />
      </Box>
    </Box>
  )
}

export default ChartHeader
