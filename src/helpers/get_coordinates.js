export function get_pos(space, x_list, y_list, list_size) {
    let coordinates = [];
    if (y_list === 0) {
        let overload_x = space;
        let overload_y = space;
        let i = 0;
        while (i < list_size.length) {
            let x = overload_x;
            overload_x += space + list_size[i][1];
            if (overload_x < x_list) {
                coordinates.push([list_size[i][0], x, overload_y]);
                i++;
            } else {
                overload_y += space + list_size[i][2];
                overload_x = space;
            }
        }
    } else {
        let number_list = 1;
        let overload_x = space;
        let overload_y = space;
        let i = 0;
        while (i < list_size.length) {
            let x = overload_x;
            let y = overload_y;
            overload_x += space + list_size[i][1];
            if (overload_x < x_list) {
                coordinates.push([list_size[i][0], x, y, number_list]);
                i++;
            } else if (overload_y + list_size[i][2] * 2 < y_list) {
                overload_x = space;
                overload_y += space + list_size[i][2];
            } else {
                overload_x = space;
                overload_y = space;
                number_list += 1;
            }
        }
    }
    return coordinates
}