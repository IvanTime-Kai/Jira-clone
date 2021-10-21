import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { ALL_STATUS } from 'redux/types/StatusTypes'
import { TASK_TYPE } from 'redux/types/TaskTypes'
import { Select, Slider } from 'antd';
import { PROJECT_DETAIL } from 'redux/types/ProjectTypes';
import { PRIORITY } from 'redux/types/PriorityTypes';
import { USER_BY_PROJECT } from 'redux/types/UserTypes';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup'

import './CreateTask.scss'
import { CREATE_TASK } from 'redux/types/TaskTypes';
import { ON_SUBMIT_DRAWER } from 'redux/types/ProjectTypes';


function CreateTask(props) {

    const { allProject, projectEdit } = useSelector(state => state.ProjectReducer)
    const { allStatus } = useSelector(state => state.StatusReducer)
    const { taskType } = useSelector(state => state.TaskReducer)
    const { priority } = useSelector(state => state.PriorityReducer)
    const { getUserByProject } = useSelector(state => state.UserReducer)


    // const assignUser = useRef('')
    const [value, setValue] = useState([])
    const [time, setTime] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: ALL_STATUS
        })
        dispatch({
            type: TASK_TYPE
        })
        dispatch({
            type: PRIORITY
        })
        dispatch({
            type :ON_SUBMIT_DRAWER,
            onSubmit : handleSubmit
        })
    }, [])

    const selectProps = {
        mode: 'multiple',
        style: { width: '100%' },
        options: getUserByProject?.map((item) => {
            return { label: item.name, value: item.userId }
        }),
        optionFilterProp: 'label',
        onChange: (newValue) => {
            // setValue(newValue);
            // console.log(newValue);
            setFieldValue('listUserAsign', newValue)
        },
        // onSearch: (value) => {

        // },
        placeholder: 'Select Item...',
        maxTagCount: 'responsive',
    };

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;
    return (
        <form className="form-group row task" onSubmit={handleSubmit}>
            <div className="col-12 task__item">
                <span>Project name</span>
                <select name="projectId" className="form-control" onChange={(e) => {
                    dispatch({
                        type: USER_BY_PROJECT,
                        data: e.target.value
                    })
                    setFieldValue('projectId', e.target.value)
                }}>
                    {allProject?.map((item) => {
                        return <option key={item.id} value={item.id}>{item.projectName}</option>
                    })}
                </select>
            </div>
            <div className="col-12 task__item">
                <span>Task name</span>
                <input type="text" className="form-control" name="taskName" onChange={handleChange} />
                <ErrorMessage name="taskName" render={(msg) => <div className="alert alert-danger">{msg}</div>}/>
            </div>
            <div className="col-12 task__item">
                <span>Status</span>
                <select className="form-control" name="statusId" onChange={handleChange} >
                    {allStatus?.map((item) => {
                        return <option key={item.statusId} value={item.statusId}>{item.statusName}</option>
                    })}
                </select>
            </div>
            <div className="col-6 task__item">
                <span>Priority</span>
                <select className="form-control" name="priorityId" onChange={handleChange}>
                    {priority?.map((item) => {
                        return <option key={item.priorityId} value={item.priorityId}>{item.priority}</option>
                    })}
                </select>
            </div>
            <div className="col-6 task__item">
                <span>Task type</span>
                <select className="form-control" name="typeId" onChange={handleChange}>
                    {taskType?.map((item) => {
                        return <option key={item.id} value={item.id}>{item.taskType}</option>
                    })}
                </select>
            </div>
            <div className="col-6 task__item">
                <div>
                    <span className="text-lg">Asignees</span>
                    <Select name="listUserAsign" className="form-control mt-2" {...selectProps} />
                </div>
                <div className="mt-4">
                    <span>Original Estimate</span>
                    <input type="number" name="originalEstimate" className="form-control" defaultValue="0" min="0" onChange={handleChange} />
                </div>
            </div>
            <div className="col-6 task__item">
                <span>Time tracking</span>
                <Slider className="form-control" value={time.timeTrackingSpent} max={parseInt(time.timeTrackingSpent) + parseInt(time.timeTrackingRemaining)} onChange={handleChange} />
                <div className="row">
                    <div className="col-6 text-left font-weight-bold">
                        <span>{time.timeTrackingSpent}h logged</span>
                    </div>
                    <div className="col-6 text-right font-weight-bold">
                        <span>{time.timeTrackingRemaining}h remaining</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <p>Time spent </p>
                        <input type="number" defaultValue="0" min="0" name="timeTrackingSpent" className="form-control" onChange={(e) => {
                            setTime({
                                ...time,
                                timeTrackingSpent: e.target.value
                            })
                            setFieldValue('timeTrackingSpent', e.target.value)
                        }} />
                    </div>
                    <div className="col-6">
                        <p>Time remaining </p>
                        <input type="number" defaultValue="0" min="0" name="timeTrackingRemaining" className="form-control" onChange={(e) => {
                            setTime({
                                ...time,
                                timeTrackingRemaining: e.target.value
                            })
                            setFieldValue('timeTrackingRemaining', e.target.value)
                        }} />
                    </div>
                </div>
            </div>
            <div className="col-12 task__item">
                <span>Description</span>
                <Editor
                    name="description"
                    initialValue=""
                    init={{
                        height: 480,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={handleEditorChange}
                />
            </div>
        </form>
    )
}

const FormCreateTaskWith = withFormik({
    enableReinitialize : true,
    mapPropsToValues : (props) => {
        return {
            taskName : "",
            description : "",
            statusId: props.allStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: props.allProject[0]?.projectId,
            typeId: props.taskType[0]?.id,
            priorityId: props.priority[0]?.priorityId,
            listUserAsign: []
        }
    },
    validationSchema : Yup.object().shape({
        taskName : Yup.string().required('Task Name is valid')
    }),
    handleSubmit : (values, {props}) => {
        props.dispatch({
            type : CREATE_TASK,
            data : values
        })
    },
    displayName : 'FormCreateTask'
})(CreateTask)

const mapStateToProps = state => ({
    allStatus : state.StatusReducer.allStatus,
    allProject : state.ProjectReducer.allProject,
    taskType : state.TaskReducer.taskType,
    priority : state.PriorityReducer.priority
})

export default connect(mapStateToProps)(FormCreateTaskWith)

