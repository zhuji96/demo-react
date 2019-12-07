import * as React from "react";
import SearchForm from "../../components/FormFamily/SearchForm";
import { Button, InputNumber, Input, Form, Select } from "antd";
import NormalSelect from "../../components/NormalSelect";

const promise = new Promise((res, rej) => {
    setTimeout(() => {
        res([{ value: "a", label: "A" }]);
    }, 1000);
});

const config = [
    [
        {
            key: "name",
            label: "姓名",
            labelWidth: "100%",
            required: true,
            component: () => <Input />
        },
        {
            key: "age",
            // label: "年龄",
            required: true,
            component: () => <Input />
        },
        {
            key: "name1",
            // label: "姓名",
            required: true,
            component: () => <Input />
        },
        {
            key: "age1",
            // label: "年龄",
            required: true,
            component: () => <Input />
        },
        {
            key: "name2",
            // label: "姓名",
            required: true,
            component: () => <Input />
        }
    ],
    [
        {
            key: "name3",
            // label: "姓名",
            span: 2,
            required: true,
            component: () => {
                return (
                    <NormalSelect options={promise} style={{ width: "100%" }} />
                );
            }
        },
        {
            key: "name4",
            // label: "姓名",
            span: 3,
            required: true,
            component: () => <Input placeholder="aaaa" />
        }
    ]
];

export default function Index(props) {
    return <SearchForm items={config} />;
}
