import ContentTask from 'components/ContentTask/ContentTask'
import HeaderTask from 'components/HeaderTask/HeaderTask'
import InfoTask from 'components/InfoTask/InfoTask'
import Modal from 'components/Modal/Modal'
import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PROJECT_DETAIL } from 'redux/types/ProjectTypes'
import './Task.scss'

export default function Task(props) {


    const { projectEdit } = useSelector(state => state.ProjectReducer)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: PROJECT_DETAIL,
            data: props.match.params.projectId
        })
    }, [])
    return (
        <div className="main">
            <HeaderTask/>
            <InfoTask projectDetail={projectEdit}/>
            <ContentTask projectDetail={projectEdit.lstTask}/>
            <Modal projectDetail={projectEdit}/>         
        </div>
    )
}
