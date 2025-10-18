import React, {useState, useEffect} from "react";
import FormElement from "./FormElement";
import { useDispatch,useSelector } from 'react-redux';
import {updateMember,getSelectedMember} from "../features/member/memberSlice";

let idCounter=1;

function Form({config,setData}) {
    const [formData, setFormData] = useState(new Map());
    const [formConfig, setFormConfig] = useState({ formClassName: "", elements: []});
    const dispatch = useDispatch();
    const selectedMember = useSelector(getSelectedMember);
    useEffect(() => {

        fetch(config)
            .then(response => {
                return response.json();
            })
            .then(initialFormConfig => {
                setFormConfig(initialFormConfig);
            })
            .catch(error => console.error('Startup fetch error:' + error));

    }, []);


    useEffect(() => {
        if (formData.has("action") && formData.get("action") === "submit") {
            let mutableMap = new Map(formData);
            mutableMap.delete("action")
            if ( !mutableMap.has("id")) {
                mutableMap.set("id", idCounter++);
            }
            let jsonObj = Object.fromEntries(mutableMap);
            dispatch(updateMember(jsonObj));
            let resetMap = new Map();
            resetMap.set("action", "reset");
            setFormData(resetMap);
        }
        if (formData.has("action") && formData.get("action") === "reset") {
            setFormData(new Map())
        }
    }, [formData]);


    useEffect(() => {

          if (selectedMember) {
            // 1. Convert the member object into a new Map for formData
            const initialMap = new Map(Object.entries(selectedMember));
            initialMap.set("id", selectedMember.id);
            setFormData(initialMap);
        } else {
            // Optional: Clear the form if selectedMember becomes null or undefined
            setFormData(new Map());
        }
    }, [selectedMember]);

    return (
        <div className={formConfig.formClassName}>
            {formConfig.elements.map((field, index) => (
                    <FormElement elementConfigString={JSON.stringify(field)} formData={formData}
                                 setFormData={setFormData}/>
            ))}
        </div>
    )
}

export default Form;