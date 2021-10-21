import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { withFormik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { PROJECT_CATEGORY } from 'redux/types/ProjectTypes'
import { ON_SUBMIT_DRAWER } from 'redux/types/ProjectTypes'
import { UPDATE_PROJECT } from 'redux/types/ProjectTypes'
import './EditProject.scss'

function EditProject(props) {

    const { projectCategory } = useSelector(state => state.ProjectReducer)

    const dispatch = useDispatch()

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;


    useEffect(() => {
        dispatch(dispatch({
            type: PROJECT_CATEGORY
        }))

        dispatch({
            type :ON_SUBMIT_DRAWER,
            onSubmit : handleSubmit
        })
    }, [])

    

    const handleEditorChange = (content) => {
        setFieldValue('description', content)
    }

    return (
        <form className="edit__project row form-group" onSubmit={handleSubmit}>
            <div className="edit__project-item col-6">
                <span>ID</span>
                <input type="text" name="id" value={values.id} className="form-control" disabled />
            </div>
            <div className=" edit__project-item col-6">
                <span>Creator</span>
                <input type="text" name="creator" value={values.creator} className="form-control" disabled />
            </div>
            <div className=" edit__project-item col-12">
                <span>Project Name</span>
                <input type="text" name="projectName" value={values.projectName} className="form-control" onChange={handleChange} />
                <ErrorMessage name="projectName" render={(msg) => <div className="alert alert-danger">{msg}</div>}/>
            </div>
            <div className=" edit__project-item col-12">
                <span>Alias</span>
                <input type="text" name="alias" value={values.alias} className="form-control" onChange={handleChange} />
                <ErrorMessage name="alias" render={(msg) => <div className="alert alert-danger">{msg}</div>}/>
            </div>
            <div className=" edit__project-item col-12">
                <span>Category</span>
                <select className="form-control" name="categoryId" value={values.categoryId} onChange={handleChange} >
                    {projectCategory?.map((item, index) => {
                        return <option key={item.id} value={item.id}>{item.projectCategoryName}</option>
                    })}
                </select>
            </div>
            <div className=" edit__project-item col-12">
                <span>Description</span>
                <Editor
                    name="description"
                    initialValue={values.description}
                    init={{
                        height: 600,
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


const FormEditProjectWithFormik = withFormik({
    mapPropsToValues : (props) => {
        return{
            id : props.projectDetail.id,
            creator : props.projectDetail.id,
            projectName : props.projectDetail.projectName,
            description : props.projectDetail.description,
            categoryId : props.projectDetail.categoryId,
            alias : props.projectDetail.alias
        }
    },
    validationSchema : Yup.object().shape({
        projectName : Yup.string().required('ProjectName is valid!'),
        alias : Yup.string().required('Alias is valid!')
    }),
    handleSubmit : (values, {props}) => {
        props.dispatch({
            type : UPDATE_PROJECT,
            data : values
        })
    },
    displayName : 'FormEditProject'
})(EditProject)

const mapStateToProps = state => ({
    projectDetail : state.ProjectReducer.projectDetail
})

export default connect(mapStateToProps)(FormEditProjectWithFormik)