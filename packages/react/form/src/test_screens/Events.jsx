import React from 'react';
import {Provider} from "react-redux";
import store from "../store";
import Form from "../components/Form";
import Table from "../components/Table";

const testConfig="./config/eventsConfig.json";
const Events = () => {
    const sliceType="event";
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

export default Events;