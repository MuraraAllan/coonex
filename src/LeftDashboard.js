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

const grid = 8

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  backgroundColor : '#282c34'
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
    return (<Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}

      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader} style={{backgroundColor : '#3f51b5', justifyContent: 'flex-start'}}>
        <Typography
          variant='h6'
          align='left'
        >
          Operators
        </Typography>
      </div>
      <Divider />
      {/* <DragDropContext onDragEnd={this.onDragEnd}> */}
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {this.state.operatorsList.map((item, index) => (
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
                    <Chip
                      avatar={<Avatar>{item.expression}</Avatar>}
                      label={item.content}
                      clickable
                      color='primary'
                      className={classes.chip}
                      style={{
                        width: '100%',
                        minHeight: '50px',
                      }}
                      // color="primary"
                      // onDelete={handleDelete}
                      // deleteIcon={<DoneIcon />}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {this.state.flagList.map((flag, index) => (
        <Button
          key={flag.id}
          variant="outlined"
          size="medium"
          style={{border: '2px solid #282c34'}}
          onClick={() => this.handleFlagClick(flag.id)}
          // className={classes.button}
        >
          <Typography component="h4">{flag.content}</Typography>
          {flag.flagged ? <Flag /> : <OutlinedFlag />}
        </Button>
      ))}
      {/* </DragDropContext> */}
    </Drawer>
    )

}