import React from 'react'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


function TaskCard(props) {

  const priorities = ['Very Low','Low','Medium','High','Very High']
  console.log(props)
  return (
    <Card className='card mb-3'>
        <Card.Header className='fw-bold' style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>{props.title}</Card.Header>
        <Card.Subtitle className='p-3 pb-0 fw-normal'>{priorities[props.priority - 1]}</Card.Subtitle>
        <Card.Subtitle className='p-3 pb-0 fw-normal'>Created At <br/> 
        {props.createdAt?props.createdAt.slice(0,19).replace("T"," "):"Just Now"}</Card.Subtitle>
        <Card.Body>
            <button className='btn btn-success me-3'onClick={()=>props.onChecked(props.id)}><FontAwesomeIcon icon={faCheckSquare} /></button>
            <button className='btn btn-primary me-3' onClick={()=>props.onEdit(props.id)}><FontAwesomeIcon icon={faEdit} /></button>
            <button className='btn btn-danger' onClick={()=>props.onDel(props.id)}><FontAwesomeIcon icon={faTrash} /></button>
        </Card.Body>
    </Card>
  )
}

export default TaskCard