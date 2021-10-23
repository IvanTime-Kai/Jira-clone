import React, {useState} from 'react'
import { Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_DRAWER } from 'redux/types/ProjectTypes'
import './Drawer.scss'

export default function DrawerComponent() {
    const { visible, placement, Component, onSubmit, title } = useSelector(state => state.DrawerReducer)
    const dispatch = useDispatch()

    
    return (
        <Drawer
            title={title}
            width={700}
            placement={placement}
            closable={true}
            onClose={() => {
                dispatch({
                    type : CLOSE_DRAWER
                })
            }}
            visible={visible}
            key='right'
            footer = {
                <div className="text-right">
                    <button className="btn btn-primary mr-4" type="submit" onClick={onSubmit}>Submit</button>
                    <button className="btn btn-dark mr-4" onClick={() => {
                        dispatch({
                            type: CLOSE_DRAWER
                        })
                    }}>Cancel</button>
                </div>
            }
        >
            {Component}
        </Drawer>
    )
}
