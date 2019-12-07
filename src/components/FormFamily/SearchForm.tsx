import * as React from "react";

import AdvancedForm from "./AdvancedForm";
import { IPropsSearch } from "./index";

export default function SearchForm(props: IPropsSearch) {
    // function submit(e) {
    //     e.preventDefault();
    //     form.validateFieldsAndScroll((err, values) => {
    //         console.log("values", values);
    //         if (err) {
    //             if (onError) {
    //                 onError();
    //             }
    //             return;
    //         }
    //         if (onSubmit) {
    //             onSubmit(values);
    //         }
    //     });
    // }

    return <AdvancedForm {...props}>hhh</AdvancedForm>;
}
