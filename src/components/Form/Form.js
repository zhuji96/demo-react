import React, { useEffect } from "react";
import { Form } from "antd";

import FormItem from "./FormItem";

const { useState } = React;
const DONOTHING = x => x;

export default function ControlledForm(props) {
    const { value, config, onChange, children, onSubmit } = props;
    const [formValue, setFormValue] = useState(value);
    const [transFormMap, setTransFormMap] = useState();

    useEffect(() => {
        setFormValue(value);
    }, [value]);

    useEffect(() => {
        const newTransFormMap = config.reduce((acc, cur) => {
            acc[cur.key] = cur.transform;
            return acc;
        }, {});
        setTransFormMap(newTransFormMap);
    }, [config]);

    function handleChange(value, fieldName) {
        const newFormValue = {};
        const tranformed = {};
        for (let [key, val] of Object.entries(formValue)) {
            const transformer = transFormMap[key] || DONOTHING;
            if (key === fieldName) {
                newFormValue[key] = value;
                tranformed[key] = transformer(value);
            } else {
                newFormValue[key] = val;
                tranformed[key] = transformer(val);
            }
        }
        onChange(newFormValue, tranformed);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formValue);
        onSubmit(formValue);
    }

    return (
        <Form onSubmit={handleSubmit}>
            {config.map(item => (
                <FormItem
                    key={item.key}
                    labelName={item.label}
                    fieldName={item.key}
                    value={formValue[item.key]}
                    required={item.required}
                    onChange={handleChange}
                    component={{ Component: item.component, props: item.props }}
                />
            ))}
            {children}
        </Form>
    );
}

// 自定义组件change
// function handleChange(form, onChange, formatter, event) {
//     const data = new FormData(form.current);
//     console.dir(form.current);
//     const value = {};
//     const formatted = {};
//     console.log(event);
//     for (let [key, val] of data.entries()) {
//         if (key === event.target.name) {
//             value[key] = event.target.value;
//             formatted[key] = formatter(event.target.value);
//         } else {
//             value[key] = val;
//             formatted[key] = val;
//         }
//     }
//     onChange(value, formatted);
// }

// antd获取内部原生控件change
// function handleChange(form, onChange, formatter, event) {
//     const elements = form.current.elements;
//     const value = {};
//     const formatted = {};
//     for (let ele of elements) {
//         if (ele.id === event.target.id) {
//             value[ele.id] = event.target.value;
//             formatted[ele.id] = formatter(event.target.value);
//         } else {
//             value[ele.id] = ele.value;
//             formatted[ele.id] = ele.value;
//         }
//     }
//     onChange(value, formatted);
// }
