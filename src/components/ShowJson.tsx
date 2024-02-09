import AddIcon from '@mui/icons-material/Add'
import Popover from '@mui/material/Popover'
import React, { useState } from 'react'
import JSONPretty from 'react-json-pretty'

interface ShowJsonProps<T> {
  obj: T
}

export function ShowJson<T>({ obj }: ShowJsonProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [devMode, setDevMode] = useState<boolean>(false)
  const [relevantJson, setRelevantJson] = useState<T | null>(null)

  const JSONPrettyMon = {
    main: 'line-height:1.3;color:#000000;background:#fafafa;overflow:auto;',
    error: 'line-height:1.3;color:#66d9ef;background:#fafafa;overflow:auto;',
    key: 'color:#3D5A80;',
    string: 'color:#EE6C4D;',
    value: 'color:#21BD97;',
    boolean: 'color:#A6924C;',
  }

  const handleClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    setDevMode(true)
    if (devMode) {
      const currentTarget = event.currentTarget as unknown as HTMLElement
      setAnchorEl(currentTarget)
      setRelevantJson(obj)
    }
  }

  const handleClose = () => {
    setDevMode(false)
    setAnchorEl(null)
    setRelevantJson(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div style={{ float: 'left', transform: 'translate(-20px, -12px)' }}>
      <AddIcon
        style={{
          color: '#00000020',
          cursor: 'default',
        }}
        onClick={handleClick}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{
          maxWidth: '60%',
        }}
      >
        <JSONPretty
          style={{ margin: 4 }}
          data={relevantJson}
          theme={JSONPrettyMon}
        />
      </Popover>
    </div>
  )
}
