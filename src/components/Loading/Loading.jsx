import React from 'react'
import './Loading.scss'
import { useSelector } from 'react-redux'
export default function Loading() {

    const { isLoading} = useSelector(state => state.LoadingReducer)
    return (
        <>
        { isLoading  ? <div className="loading">
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
        </div> : ''}
        </>
    )
}
