import * as React from "react";
import { Form } from "antd";
import { get } from "lodash";

const { useState } = React;
const { Item } = Form;

function isEmpty(val) {
    return val == null || val === "";
}

export default function FormItem(props) {
    const {
        fieldName,
        labelName,
        value,
        onChange,
        required,
        component
    } = props;

    const [validateStatus, setValidateStatus] = useState();
    const [errorMsg, setErrorMsg] = useState();

    function renderItem() {
        const { Component, props } = component;
        return <Component {...props} value={value} onChange={handleChange} />;
    }

    function handleChange(e) {
        const value = get(e, "target.value", e);
        if (required && isEmpty(value)) {
            setValidateStatus("error");
            setErrorMsg(`${labelName}为空`);
        }
        if (required && !isEmpty(value)) {
            setValidateStatus("");
            setErrorMsg("");
        }
        onChange(value, fieldName);
    }

    return (
        <Item
            label={labelName}
            validateStatus={validateStatus}
            help={errorMsg}
            required={required}
        >
            {renderItem()}
        </Item>
    );
}
