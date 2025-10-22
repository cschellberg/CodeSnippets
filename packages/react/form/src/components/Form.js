import React, {useState, useEffect,useMemo} from "react";
import FormElement from "./FormElement.js";
import { useDispatch,useSelector } from 'react-redux';
import {updateSliceItem, getSelectedItemBySliceType} from "../redux/item/itemSlice.js";

let idCounter=1;

function Form({config,sliceType}) {

    const [formData, setFormData] = useState(new Map());
    const [formConfig, setFormConfig] = useState({ formClassName: "", elements: []});
    const dispatch = useDispatch();
    const selectItemBySliceType = useMemo(getSelectedItemBySliceType, []);
    const selectedItem = useSelector((state) => selectItemBySliceType(state, sliceType));
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

            if ( !mutableMap.has("id") || mutableMap.get("id") === undefined) {
                mutableMap.set("id", idCounter++);
            }
            let jsonObj = Object.fromEntries(mutableMap);
            dispatch(updateSliceItem({sliceType:sliceType,data:jsonObj}));
            let resetMap = new Map();
            resetMap.set("action", "reset");
            setFormData(resetMap);
        }
        if (formData.has("action") && formData.get("action") === "reset") {
            setFormData(new Map())
        }
    }, [formData]);


    useEffect(() => {

          if (selectedItem) {
            const initialMap = new Map(Object.entries(selectedItem));
            initialMap.set("id", selectedItem.id);
            setFormData(initialMap);
        } else {
            setFormData(new Map());
        }
    }, [selectedItem]);

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