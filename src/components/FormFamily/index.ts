import { FormComponentProps } from "antd/es/form";

export interface IItem {
    key: string;
    component(props: Partial<IItem>): any;
    label?: string;
    span?: number;
    hide?: boolean;
    collapse?: boolean;
    initialValue?: any;
    options?: any;
    rules?: any;
    required?: boolean;
    labelWidth: string | number;
    [propName: string]: any;
}

export type IItems = Array<IItem>;

export interface IProps extends FormComponentProps {
    items: IItems | Array<IItems>;
    isCollapsed?: boolean;
    cols?: number;
}

export interface IPropsControlled extends IProps {
    value: any;
    onChange(value: any): any;
}

export interface IPropsSearch extends IProps {}
