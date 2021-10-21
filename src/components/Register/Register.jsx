import React from 'react'
import { withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { connect } from 'react-redux'
import './Register.scss'
import { CREATE_USER } from 'redux/types/UserTypes';

function Register(props) {


    const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;

    
    return (
        <form id="register" className="register" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <span className="register-title">Email</span>
            <input type="text" className="form-control" name="email" onChange={handleChange} />
            <ErrorMessage name="email" render={ msg => <div className="text-red-500">*{msg}</div>}/>
            <span className="register-title">Password</span>
            <input type = 'password' placeholder="Input password" name = "password" className="form-control" onChange={handleChange}/>
            <ErrorMessage name="password" render={ msg => <div className="text-red-500">*{msg}</div>}/>
            <span className="register-title">Name</span>
            <input type="text" className="form-control" placeholder="Input name" name="name" onChange={handleChange} />
            <ErrorMessage name="name" render={ msg => <div className="text-red-500">*{msg}</div>}/>
            <span className="register-title">Phone Number</span>
            <input type="tel" className="form-control" placeholder="Input phone number" name="phoneNumber" onChange={handleChange} />
            <ErrorMessage name="phoneNumber" render={ msg => <div className="text-red-500">*{msg}</div>}/>
            <button type="submit" className="btn-register">Register</button>
        </form>
    )
}

const formRegisterWithFormik = withFormik({
    mapPropsToValues : () => {
        return {
            email : '',
            password : '',
            name : '',
            phoneNumber : ''
        }
    },
    validationSchema : Yup.object().shape({
        email : Yup.string().required('Email is required').email('Email is invalid'),
        password : Yup.string().required('Password is required').min(6, 'To Short').max(20, 'To Long'),
        name: Yup.string().required('Name is required').min(3, 'To Short').max(20, 'To Long'),
        phoneNumber : Yup.string().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, { message : 'Phone Number is invalid', excludeEmptyString : false}).required('Phone is required').min(10, 'Phone Number min is 10 number').max(11, 'Phone Number max is 10 number')
    }),
    handleSubmit : (values, {props}) => {
        props.dispatch({
            type : CREATE_USER,
            data : values
        })
        document.getElementById('register').reset();
    },
    displayName : 'FromRegister'
})(Register)

export default connect()(formRegisterWithFormik)
