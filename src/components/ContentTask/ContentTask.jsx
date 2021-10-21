import React from 'react'
import { Avatar, Tooltip } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import './ContentTask.scss'
import { UPDATE_STATUS } from 'redux/types/TaskTypes';
import { TASK_DETAIL } from 'redux/types/TaskTypes';
import { ALL_COMMENT } from 'redux/types/CommentTypes';


export default function ContentTask(props) {

    const dispatch = useDispatch()

    const { projectDetail } = props

    const handleDragEnd = (result) => {
        const { destination, source} = result
        let draggableId = JSON.parse(result.draggableId)
        if(!destination){
            return;
        }
        if(destination.index === source.index && destination.droppableId === source.droppableId){
            return;
        }

        dispatch({
            type : UPDATE_STATUS,
            data : {
                projectId : draggableId.projectId,
                taskId : draggableId.taskId,
                statusId : destination.droppableId
            }
        })
    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
                {projectDetail?.map((task, index) => {
                    return <Droppable droppableId={task.statusId} key={index}>
                            {(provided) => {
                                return <div className="card" style={{ width: '25%', height: 'auto' }} >
                                        <div className="card-header">
                                            {task.statusName}
                                        </div>
                                        <div ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            key={index}
                                            className="list-group list-group-flush" style={{ height: '100%' }}>
                                            {task.lstTaskDeTail?.map((item, index) => {
                                                return <Draggable draggableId={JSON.stringify({ projectId: item.projectId, taskId: item.taskId })} key={item.taskId.toString()} index={index}>
                                                        {(provided) => {
                                                            return (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="list-group-item" 
                                                                    data-toggle="modal" 
                                                                    data-target="#infoModal" 
                                                                    key={item.statusId} 
                                                                    onClick={() => {
                                                                        dispatch({
                                                                            type : TASK_DETAIL,
                                                                            data : item.taskId
                                                                        })
                                                                        dispatch({
                                                                            type : ALL_COMMENT,
                                                                            data : item.taskId
                                                                        })
                                                                    }}
                                                                    >
                                                                    <p>{item.taskName}</p>
                                                                    <div className="block" style={{ display: 'flex' }}>
                                                                        <div className="block-left">
                                                                            { item.taskTypeDetail.taskType === "bug" ? <i className="fa fa-exclamation-circle"></i> : <i className="fa fa-bookmark" />}
                                                                            { item.priorityTask.priority === 'Hight' || item.priorityTask.priority === 'Medium' ?  <i className="fa fa-arrow-down"></i> : <i className="fa fa-arrow-up" />}
                                                                        </div>
                                                                        <div className="block-right">
                                                                            <Avatar.Group maxCount={5}>
                                                                                {item.assigness?.map((item) => {
                                                                                    return (
                                                                                        <Tooltip title={`${item.name}`} placement="top" key={item.id} >
                                                                                            <Avatar src={item.avatar} />
                                                                                        </Tooltip>
                                                                                    )
                                                                                })}
                                                                            </Avatar.Group>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                            }}
                        </Droppable>
                })}
            </DragDropContext>
        </div>
    )
}

