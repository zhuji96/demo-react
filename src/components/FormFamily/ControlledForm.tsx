import { Form } from "antd";

import NormalForm from "./NormalForm";
import { IPropsControlled } from "./index";

export default Form.create({
    onFieldsChange(props: IPropsControlled, changedFields) {
        const changedValue = Object.keys(changedFields).reduce(
            (acc: any, cur: string) => {
                acc[cur] = changedFields[cur].value;
                return acc;
            },
            {}
        );
        props.onChange(changedValue);
    },
    mapPropsToFields(props: IPropsControlled) {
        return Object.keys(props.value).reduce((acc: any, cur: string) => {
            acc[cur] = Form.createFormField({ value: props.value[cur] });
            return acc;
        }, {});
    }
})(NormalForm);
