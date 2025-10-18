import React,{useState,useEffect} from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import { Provider } from 'react-redux'
import store from './store'

const testConfig="./config/testConfig.json";


const App = () => {
    const [data,setData]=useState([]);
    return (
        <Provider store={store}>
        <div className="App">
            <div className="content">
                <Form config={testConfig} setData={setData}/>
            </div>
            <div className="content">
                <Table config={testConfig}/>
            </div>
        </div></Provider>
    );

};

export default App;
