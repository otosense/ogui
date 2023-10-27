import React, { memo, useEffect, useState } from 'react'
import Editor, { useMonaco } from '@monaco-editor/react'
import { Alert, AppBar, Box, Button, Toolbar, Tooltip, Typography } from '@mui/material'
import LoadingOverlay from '../../utilities/Loader'
import SaveIcon from '@mui/icons-material/Save'
import { isEmpty } from 'lodash'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import CustomModal from './Modal'
import ResetAll from './ResetSpec'
// import * as monaco from "monaco-editor";

interface TSchemaManager {
  onDataUploaded?: any
  data: any
  title: string
  saveSchema?: any
  formType?: {
    label: string
    value: string
  }
}
const MONACO_OPTIONS: any = {
  codeLens: true,
  autoIndent: 'full',
  automaticLayout: true,
  contextmenu: true,
  fontFamily: 'monospace',
  fontSize: 13,
  lineHeight: 18,
  // theme: 'vs-dark',
  hideCursorInOverviewRuler: true,
  matchBrackets: 'always',
  minimap: {
    enabled: false
  },
  readOnly: false,
  scrollbar: {
    handleMouseWheel: true,
    alwaysConsumeMouseWheel: false,

    horizontal: 'auto',
    vertical: 'hidden',
    scrollByPage: true
    // horizontalSliderSize: 0,
    // verticalSliderSize: 0
  },
  selectOnLineNumbers: true,
  roundedSelection: false,
  cursorStyle: 'line',
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  decorationsOverviewRuler: false,
  overviewRulerLanes: 0,
  alwaysConsumeMouseWheel: false
}
function Editors (props: TSchemaManager): JSX.Element {
  const { title, data, onDataUploaded, saveSchema, formType } = props
  const [errors, setErrors] = useState<any[]>([])
  const [jsonString, setJsonString] = useState<any>({})
  const [value, setValue] = useState((JSON.stringify(data, null, 2)))
  const [openModal, setOpenModal] = useState(false)

  const monaco = useMonaco()
  useEffect(() => {
    setJsonString(data)
    setValue((JSON.stringify(data, null, 2)))
  }, [data])
  function handleEditorValidation (markers: any[]): void {
    const errors = markers.length > 0 ? markers : []
    setErrors(errors)
  }

  function handleEditorChange (value: any, event: any): void {
    setJsonString(value)
    onDataUploaded?.(value)
    // setting the cursor back to its normal state
    setTimeout(() => {
      monaco?.editor.getEditors().forEach((editor) => {
        const range = event.changes[0]?.range
        const isBackspaceOrDelete = event.changes[0]?.text === ''

        const column = isBackspaceOrDelete
          ? range.startColumn
          : +range.startColumn + 1

        editor.setPosition({
          lineNumber: range.startLineNumber,
          column
        })
      })
    }, 10)
  }

  const saveSchemas = (): void => {
    const val = {
      rjsf: jsonString
    }
    const finalPayload = {
      value: val,
      key: formType?.value
    }
    saveSchema(finalPayload)
  }

  function ErrorHandlers (errors: any[]): JSX.Element[] | null {
    if (errors?.length > 0) {
      return errors.map((error: { message: string, startLineNumber: string }, index: number) => (
        <Alert severity="error" key={`error-${index}`}>
          {error?.message} at {error?.startLineNumber}
        </Alert>
      ))
    }
    return null
  }

  const handleOpenModal = (): void => {
    setOpenModal(true)
  }

  const handleCloseModal = (): void => {
    setOpenModal(false)
  }

  return (
        <main>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar style={{ justifyContent: 'center' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                        <Tooltip title="Save the Specification">
                          <span>
                            {/* <IconButton
                              aria-label="SaveIcon"
                              color="inherit"
                              onClick={saveSchemas}
                              disabled={errors.length > 0 || isEmpty(jsonString)}
                            >
                              <SaveIcon />
                            </IconButton> */}
                            <Button onClick={saveSchemas} disabled={errors.length > 0 || isEmpty(jsonString)} color="success" aria-label="Save" variant="contained" startIcon={<SaveIcon />}>
                           Save
                            </Button>

                          </span>
                        </Tooltip>
                        <Tooltip title="Reset Specification">
                        <span>
                              <Button onClick={handleOpenModal} disabled={errors.length > 0 || isEmpty(jsonString)} color="info" aria-label="Save" variant="contained" startIcon={<RestartAltIcon />}>
                              Reset
                            </Button>
                            </span>
                        </Tooltip>

                    </Toolbar>
                </AppBar>
            </Box>
            {ErrorHandlers(errors)}
            {<Editor
                height='92vh'
                width={'100%'}
                language='json'
                options={MONACO_OPTIONS}
                value={value}
                onValidate={handleEditorValidation}
                onChange={handleEditorChange}
                loading={<LoadingOverlay />}
            />
            }

                <CustomModal
                    open={openModal}
                    handleClose={handleCloseModal}
                    title="Reset the Specification Panel"
                    content={<ResetAll handleClose={handleCloseModal} />}
                />
        </main>

  )
}

export default memo(Editors)
