import React from 'react';
import "../App.css";
import Form from "../components/Form";
import Table from "../components/Table";
import { Provider } from 'react-redux'
import store from '../store'

const testConfig="./config/membersConfig.json";
const Members = () => {
    const sliceType="member";
    return (
        <Provider store={store}>
            <div className="App">
                <div className="content">
                    <Form config={testConfig} sliceType={sliceType}/>
                </div>
                <div className="content">
                    <Table config={testConfig} sliceType={sliceType}/>
                </div>
            </div></Provider>
    );

};

export default Members;