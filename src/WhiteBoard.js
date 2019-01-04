import React from 'react'
import {
  Avatar,
  Button,
  Grid,
  TextField,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  Typography,
  Chip
} from '@material-ui/core'
import Flag from '@material-ui/icons/Flag'
import OutlinedFlag from '@material-ui/icons/OutlinedFlag'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import CustomChip from './components/CustomChip'

const grid = 8

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
})


const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  // change background colour if dragging

  // styles we need to apply on draggables
  ...draggableStyle
})


export default function() {
    const { classes, theme } = this.props
    const { open } = this.state
    return (
      <Grid container style={{minHeight : '300px'}} direction='column'>
        <Grid item >
          <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  backgroundColor: 'white',
                  minWidth: 300,
                  minHeight: '200px'
                }}
              >
                {this.state.selectedList.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Grid container style={{
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                            <Chip
                              avatar={<Avatar>{item.expression}</Avatar>}
                              label={item.content}
                              clickable
                              className={classes.chip}
                              style={{
                                width: '50%',
                                minHeight: '50px',
                              }}
                              >
                              // color="primary"

                          </Chip>
                          {item.id === 'character' && (
                            <TextField
                            // label="Enter Any Character"
                            className={classes.textField}
                            value={this.state.selectedList[index].value}
                            onChange={e => {
                              e.preventDefault()
                              if (e.target.value.length > 1) return
                              const { selectedList } = this.state
                              selectedList[index].value = e.target.value
                              this.setState({ selectedList })
                            }}
                            margin="dense"
                            variant="outlined"
                            style={{ width: 50, height : 30 }}
                            // InputProps={{
                              //   inputProps: {
                                //     style: { fontSize: 12 }
                                //   }
                                // }}
                                InputLabelProps={{
                                  root: { style: { fontSize: 12 } }
                                }}
                                />
                              )}
                        </Grid>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
        <Grid item>
        <Typography variant='h4' color={this.regexError && 'error'}>
          {this.regexError ? this.regexError : `Expressive (Regex) : ${this.regexSource}`}
        </Typography>
        </Grid>
      </Grid>
    )
    // return (
    //       <Grid >

    //       </Grid>
    //       <Grid item >
    //         <Typography variant='h4' color='error'>
    //           {this.regexError}
    //         </Typography>
    //       </Grid>
    // )
}