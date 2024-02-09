import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { HubStageEnum } from './Table/HubStage.tsx'
import { capitalizeFirstLetter } from '../utils/format.ts'
import { Button } from '@mui/material'

interface FilterComponentProps {
  onFilterChange: (filters: {
    stage?: HubStageEnum
    location?: string
    name?: string
  }) => void
}

interface Filters {
  stage?: HubStageEnum
  location?: string
  name?: string
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  onFilterChange,
}) => {
  const initialFilters: Filters = {}
  const [filters, setFilters] = useState<Filters>(initialFilters)

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handleInputChange = (filterType: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }))
  }

  const handleResetFilters = () => {
    setFilters(initialFilters)
  }

  return (
    <div style={{ margin: '16px 0' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Enter Name"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filters.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Enter Location"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filters.location || ''}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            options={Object.values(HubStageEnum)}
            getOptionLabel={(value) =>
              capitalizeFirstLetter(value.replace('_', ' '))
            }
            onChange={(_, value) => handleInputChange('stage', value ?? '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Stage"
                variant="outlined"
                fullWidth
                size="small"
                value={filters.stage || ''}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="outlined" onClick={handleResetFilters}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default FilterComponent
