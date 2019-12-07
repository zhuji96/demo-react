import * as React from "react";
import {
    sortableContainer,
    sortableElement
} from "../../components/SortableHoc";
import arrayMove from "../../utils/arrayMove";

const SortableItem = sortableElement(({ value }) => <li>{value}</li>);

const SortableContainer = sortableContainer(({ children }) => {
    return <ul>{children}</ul>;
});

class App extends React.Component {
    state = {
        items: [
            "Item 1",
            "Item 2",
            "Item 3",
            "Item 4",
            "Item 5",
            "Item 6",
            "Item 7",
            "Item 8",
            "Item 9",
            "Item 10",
            "Item 11",
            "Item 12",
            "Item 13",
            "Item 14",
            "Item 15",
            "Item 16"
        ]
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex)
        }));
    };

    render() {
        const { items } = this.state;

        return (
            <SortableContainer onSortEnd={this.onSortEnd}>
                {items.map((value, index) => (
                    <SortableItem
                        key={`item-${index}`}
                        index={index}
                        value={value}
                    />
                ))}
            </SortableContainer>
        );
    }
}

export default App;
