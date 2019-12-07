export default function arrayMove<T>(
    array: Array<T>,
    from: number,
    to: number
): Array<T> {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
}
