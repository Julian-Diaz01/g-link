import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React from 'react'

interface Column<T> {
  id: keyof T
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
  format?: (value: T[keyof T], row: T) => React.ReactNode
}

interface FlexibleTableProps<T> {
  columns: Column<T>[]
  data: T[]
}

const FlexibleTable = <T extends object>({
  columns,
  data,
}: FlexibleTableProps<T>) => {
  return (
    <TableContainer style={{ border: '0.5px solid #00000020' }}>
      <Table sx={{ minWidth: 650 }} aria-label="flexible table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                align={column.align || 'left'}
                style={{
                  minWidth: column.minWidth,
                  fontWeight: 'bold',
                  padding: '8px 16px',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id]
                  return (
                    <TableCell
                      key={String(column.id)}
                      align={column.align}
                      style={{ padding: '8px 16px' }}
                    >
                      {column.format
                        ? column.format(value, row)
                        : String(value)}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FlexibleTable
