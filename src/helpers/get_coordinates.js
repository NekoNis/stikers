export function get_pos1(space, x_list, y_list, list_size) {
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

export function get_pos2(space, x_list, y_list, objects) {
    let coordinates = []; // полученные данные [id:str, coordinateX:int, coordinateY:int]
    if (y_list === 0) { // для рулона
        let PK = [[[0, 0], [x_list, 650]]]; // начальный потенциальный контейнер (ПК) [[coordinateX:int, coordinateY:int],[sizeX:int, sizeY:int]]
        let i = 0; // индекс объекта
        let p = 0; // индекс ПК
        while (i<objects.length) {
            while (p<PK.length) {
                // проверка на вместимость объекта в ПК
                if (objects[i][1]<PK[p][1][0] && objects[i][2]<PK[p][1][1]) {
                    coordinates.push([objects[i][0], PK[p][0][0]+space, PK[p][0][1]+space]);
                    PK.push([
                        [PK[p][0][0]+objects[i][1], PK[p][0][1]], // координаты нового ПК (левый верхний угол)
                        [PK[p][1][0]-objects[i][1], PK[p][1][1]] // ширина/высота | размеры нового ПК
                    ]);
                    PK.push([
                        [PK[p][0][0], PK[p][0][1]+objects[i][2]], // координаты нового ПК (левый верхний угол)
                        [PK[p][1][0], PK[p][1][1]-objects[i][2]] // ширина/высота | размеры нового ПК
                    ]);
                    PK.splice(0, 1); // удаление старого ПК


                    // проверка на пересечение объекта с контейнером
                    let z = 0 // индекс контейнера
                    let PK_del = [] // информация об удаленных ПК
                    while (z<PK.length) {
                        if (objects[i][1]>PK[z][0][0]) {
                            PK_del = PK[z];
                            PK.splice(z, 1);
                        }
                        z++
                    }
                    // Генерация PK [[x, y], [x_list, 10000]]
                    PK.push([ // 1) or 2***
                        [PK_del[0][0], PK.at(-1)[0][1]+objects[i][2]], // cord pk
                        [PK_del[1][0], PK.at(-1)[1][1]] // Шрина Высота pk размеры
                    ]);
                    PK.push([ // 2) or 2**
                        [PK.at(-1)[0][0], PK_del[0][1]], // cord pk
                        [PK.at(-1)[1][0], PK.at(-1)[1][1]] // Шрина Высота pk размеры
                    ]);
                    PK.push([ // 2*
                        [PK_del[0][0], PK_del[0][1]], // cord pk
                        [PK_del[1][0], PK.at(-1)[1][1]-PK_del[1][1]] // Шрина Высота pk размеры
                    ]);
                    // проверка на вложеность контейнеров
                    let m = 0
                    while (m<PK.length) {
                        let n = 0;
                        while (n<PK.length) {
                            if ((PK[n][0][0] > PK[m][0][0]) && (PK[n][0][0] < (PK[m][0][0] + PK[m][1][0]))) {
                                if ((PK[n][0][1] > PK[m][0][1]) && (PK[n][0][1] < PK[m][0][1] + PK[m][1][1])) {
                                    if (PK[n][1][0] < PK[m][1][0] - (PK[n][0][0] - PK[m][0][0])) {
                                        if (PK[n][1][1] < PK[m][1][1] - (PK[n][0][1] - PK[m][0][1])) {
                                            PK.splice(n, 1)
                                        }
                                    }
                                }
                            }
                            n++
                        }
                        m++
                    }
                }
                PK.push(PK[0]);
                PK.splice(0, 1);
                p++
            }
            objects.push(objects[0]);
            objects.splice(0, 1);
            i++
        }
    }
    return coordinates
}