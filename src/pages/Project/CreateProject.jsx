import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { PROJECT_CATEGORY } from 'redux/types/ProjectTypes';
import { connect } from 'react-redux'
import './CreateProject.scss'
import { CREATE_PROJECT } from 'redux/types/ProjectTypes';


function CreateProject(props) {

    const { projectCategory } = useSelector(state => state.ProjectReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(dispatch({
            type: PROJECT_CATEGORY
        }))
    }, [])


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
        <>

            <div className="project container-lg">
                <div className="project__title">
                    <h3 className="text-blue-600">Create project</h3>
                </div>
                <div className="project__content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <p>Name</p>
                            <input name="projectName" type="text" className="form-control" onChange={handleChange} />
                            <ErrorMessage name="projectName" render={(msg) => <div className="alert alert-danger">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <p>Alias</p>
                            <input name="alias" type="text" className="form-control" onChange={handleChange} />
                            <ErrorMessage name="alias" render={(msg) => <div className="alert alert-danger">{msg}</div>} />
                        </div>
                        <div className="form-group">
                            <p>Description</p>
                            <Editor
                                name="description"
                                initialValue=""
                                init={{
                                    height: 500,
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
                        <div className="form-group">
                            <p>Category</p>
                            <select className="form-control" name="categoryId" onChange={handleChange}>
                                {projectCategory.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.projectCategoryName}</option>
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Create Project</button>
                    </form>
                </div>
            </div>
        </>
    )
}

const CreateFormProjectFormik = withFormik({
    mapPropsToValues: (props) => {
        return {
            projectName: '',
            description: '',
            categoryId: props.projectCategory[0]?.id,
            alias: ''
        }
    },
    validationSchema: Yup.object().shape({
        projectName: Yup.string().required('ProjectName is valid'),
        alias: Yup.string().required('Alias is invalid').min(3, 'Alias too short').max(20, 'Alias too long')
    }),
    handleSubmit: (values, { props }) => {
        props.dispatch({
            type: CREATE_PROJECT,
            data: {
                projectName: values.projectName,
                description: values.description,
                categoryId: values.categoryId,
                alias: values.alias
            }
        })
    },
    displayName: 'FormCreateProject'
})(CreateProject)

const mapStateToProps = state => ({
    projectCategory: state.ProjectReducer.projectCategory
})

export default connect(mapStateToProps)(CreateFormProjectFormik)
