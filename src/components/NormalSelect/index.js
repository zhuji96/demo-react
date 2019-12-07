import { Select } from "antd";
import * as React from "react";

const { Option } = Select;

const { useState, forwardRef } = React;

function NormalSelect(props, ref) {
    const { options = [], value, onChange, ...rest } = props;
    const [asyncOption, setAsyncOption] = useState();
    if (
        Object.prototype.toString.call(options) === "[object Promise]" &&
        !asyncOption
    ) {
        options.then(res => setAsyncOption(res));
        return (
            <Select
                value={value}
                onChange={onChange}
                {...rest}
                ref={ref}
                loading
            ></Select>
        );
    }
    if (asyncOption) {
        return (
            <Select value={value} onChange={onChange} ref={ref} {...rest}>
                {asyncOption.map(({ value: val, label }) => {
                    return (
                        <Option key={val} value={val}>
                            {label}
                        </Option>
                    );
                })}
            </Select>
        );
    }
    return (
        <Select value={value} onChange={onChange} ref={ref} {...rest}>
            {options.map(({ value: val, label }) => {
                return (
                    <Option key={val} value={val}>
                        {label}
                    </Option>
                );
            })}
        </Select>
    );
}

export default forwardRef(NormalSelect);
