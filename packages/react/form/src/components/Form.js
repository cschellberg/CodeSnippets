import React, {useState, useEffect} from "react";
import FormElement from "./FormElement";

function Form({config}) {
    const [formData, setFormData] = useState(new Map());
    const [formConfig, setFormConfig] = useState({ formClassName: "", elements: []});
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
            let jsonObj = Object.fromEntries(mutableMap);
            console.log("json obj is" + JSON.stringify(jsonObj))
            let resetMap = new Map();
            resetMap.set("action", "reset");
            setFormData(resetMap);
        }
        if (formData.has("action") && formData.get("action") === "reset") {
            setFormData(new Map())
        }
    }, [formData]);

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