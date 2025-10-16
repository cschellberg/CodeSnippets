import React,{useState,useEffect} from "react";
import "./App.css";
import Form from "./components/Form";

const testConfig="./config/testConfig.json";


const App = () => {
    const [patientId, setPatientId] = useState(0);
    return (
        <div className="App">
            <div className="content">
                <Form config={testConfig}/>
            </div>
        </div>
    );
};

export default App;
