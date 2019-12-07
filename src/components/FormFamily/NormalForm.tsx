import * as React from "react";
import { IProps, IItems, IItem } from "./index";

export default function NormalForm(props: React.PropsWithChildren<IProps>) {
    const { form, items, children, isCollapsed, cols = 5 } = props;
    const { getFieldDecorator } = form;

    function renderWrapper(item: IItem | IItems) {
        if (Array.isArray(item)) {
            const style = {
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridColumnGap: "24px"
            };
            return (
                <div style={style} key={JSON.stringify(item)}>
                    {(item as IItems).map(childItem =>
                        renderWrapper(childItem)
                    )}
                </div>
            );
        }
        const { key, span, hide, collapse } = item;
        if (hide) {
            return null;
        }
        if (collapse && isCollapsed) {
            return null;
        }
        if (span) {
            let style = {
                gridColumnStart: `span ${span}`
            };
            return (
                <div style={style} key={key}>
                    {renderFormItem(item)}
                </div>
            );
        }
        return renderFormItem(item);
    }

    function renderFormItem(item: IItem) {
        const {
            label,
            key,
            component,
            initialValue,
            options = {},
            rules = [],
            required,
            labelWidth = "auto",
            ...rest
        } = item;
        const style = {
            lineHeight: "40px",
            display: "flex"
        };
        return (
            <div key={key} style={style}>
                {label && <div style={{ flex: labelWidth }}>{label}：</div>}
                <div style={{ flex: 1 }}>
                    {getFieldDecorator(key, {
                        ...options,
                        initialValue,
                        rules: required
                            ? [...rules, { required, message: `${label}为空` }]
                            : rules
                    })(component(rest))}
                </div>
            </div>
        );
    }

    return (
        <div>
            {(items as IItems).map((item: IItems | IItem) =>
                renderWrapper(item)
            )}
            {children}
        </div>
    );
}
