import React, {useState, useEffect,useRef} from "react";


function FormElement({elementConfigString,formData,setFormData}) {
    const elementConfig = JSON.parse(elementConfigString);
    const [elementValue, setElementValue] = useState("");
    const [hasErrors, setHasErrors] = useState(false);
    const selectRef = useRef();

    useEffect(() => {
        let jsonObj=Object.fromEntries(formData);
        if ( formData.has("action") && formData.get("action") === "reset") {
            setElementValue("");
        }
       else
        {
           setElementValue(jsonObj[elementConfig.name])
        }
    }, [formData]);

    useEffect(() => {

        if (selectRef.current && selectRef.current.value) {
            const value=selectRef.current.value;
            setElementValue(value);
            setMapValue(elementConfig.name,value)
        }
    }, []);

    const setMapValue=(key,value)=>{
        const newMap=new Map(formData);
        newMap.set(key,value)
        setFormData(newMap)
    }

    const validateByMinMax=(value)=>{
        const numValue=parseFloat(value);
        if (elementConfig.validation.min){
             if (numValue < elementConfig.validation.min){
                setHasErrors(true);
                return
            }
        }
        if (elementConfig.validation.max){
            if (numValue>elementConfig.validation.max){
                setHasErrors(true);
                return
            }
        }
        setHasErrors(false);
    }

    const validateByRegex=(value)=> {
        const regex = new RegExp(elementConfig.validation.pattern);
        const isValid=regex.test(value);
        setHasErrors(!isValid);
    }

    const validateValue = (value) => {
        if ( value == null || value.length === 0){
            setHasErrors(false);
            return;
        }
        if ( elementConfig.validation && elementConfig.validation.pattern){
            validateByRegex(value)
        } else {
            validateByMinMax(value);
        }

    }

    const changeValue = (event) => {
        const value=event.target.value;
        setElementValue(value);
        setMapValue(elementConfig.name,value)
        validateValue(value);
    }

    const changeSelectValue = (event) => {
        const newValue = event.target.value;
        setElementValue(newValue);
        setMapValue(elementConfig.name, newValue);
    }

    const changeCheckboxValue = (event) => {
        const fieldset=event.target.parentElement.parentElement;
        const checkboxes=fieldset.querySelectorAll(`input[name='${elementConfig.name}']:checked`);
        let selectedValues=[];
        checkboxes.forEach((checkbox)=>{
            selectedValues.push(checkbox.value);
        });
        const value=selectedValues.join(",");
        setElementValue(value);
        setMapValue(elementConfig.name,value)
    }

    const getDateInput = (type) => {
        return (<div className="form-group">
                <label className={elementConfig.labelClassName}>{elementConfig.label}</label> <input
                className={elementConfig.inputClassName}
                type={type}
                placeholder={elementConfig.name}
                onChange={changeValue}
                value={elementValue}
            />
                {hasErrors &&(<div className="error-message">{elementConfig.errorMessage}</div>)}
            </div>
        );
    }

    const getInputType = (type) => {
        return (<div className="form-group">
                <label className={elementConfig.labelClassName}>{elementConfig.label}</label> <input
                className={elementConfig.inputClassName}
                type={type} // Use curly braces to inject the variable 'type'
                placeholder={elementConfig.name}
                onChange={changeValue}
                value={elementValue}
            />
                {hasErrors &&(<div className="error-message">{elementConfig.errorMessage}</div>)}
            </div>
        );
    }

    const onSubmit = () => {
        setMapValue("action","submit");
    }

    const getSubmitButton = () => {
        return (<div className="form-button-group"><button className={elementConfig.inputClassName}
                name={elementConfig.name}
            onClick={()=>onSubmit()}>{elementConfig.label}</button>
        </div>   );
    }

    const getSelectInput = () => {
        return (
            <div className="form-group">
                <label className={elementConfig.labelClassName}>{elementConfig.label}</label>
            <select onChange={changeSelectValue } ref={selectRef}>
                name={elementConfig.name}
                value={elementValue}
                {elementConfig.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
                </div>
        );
    }

    const getCheckboxGroupInput = () => {
        return (
            <div className="form-group">
            <fieldset  onChange={changeCheckboxValue }>
                <legend>{elementConfig.label}</legend>
                {elementConfig.options.map((option) => (
                    <label key={option.value}>
                        <input
                            type="checkbox"
                            name={elementConfig.name} // Use the same name for the group
                            value={option.value}

                        />
                        {option.label}
                    </label>
                ))}
            </fieldset>
            </div>
        );
    }

    const getFormElement = (type) => {
        switch (type) {
            case "text":
                return getInputType("text");
            case "number":
                return getInputType("number");
            case "submit":
                return getSubmitButton();
            case "date":
            case "datetime-local":
                return getDateInput(type);
            case "select":
                return getSelectInput();
            case "checkbox":
                return getCheckboxGroupInput();
            default:
                return null;
        }
    }

    return (
        <div>{getFormElement(elementConfig.type)}</div>
    )
}

export default FormElement;