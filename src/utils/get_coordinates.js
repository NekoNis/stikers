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

export function get_pos2(space, listX, listY, objectsImport) {
    let coordinates = []; // полученные данные [id:str, coordinateX:int, coordinateY:int]

    // для рулона
    if (listY === 0) {
        // объявление переменных
        let containers = [[[0+space, 0+space], [listX-(space*2), 10000-(space*2)]]]; // потенциальные контейнеры (ПК) [[coordinateX:int, coordinateY:int],[sizeX:int, sizeY:int]]
        let numObj = 0; // индекс объекта
        let numCon = 0; // индекс ПК

        // сортировка объектов по sizeX
        let tempObjects = objectsImport;
        let objects = [];
        if (tempObjects.length > 1) {
            let min = [];
            let temp;
            for (var i = 0; i < tempObjects.length; i++) {
                min = [tempObjects[i], i];
                for (var j = i; j < tempObjects.length; j++) {
                    if (min[0][1] > tempObjects[j][1]) {
                        min = [tempObjects[j], j];
                    }
                }
                temp = tempObjects[i];
                tempObjects[i] = min[0];
                tempObjects[min[1]] = temp;
            }
            // разворот массива объектов
            j = tempObjects.length-1;
            while (j >= 0) {
                objects.push(tempObjects[j])
                j--
            }
        }

        // расстановка объектов
        while (objects.length != 0) {
            var tempObj = objects.length
            while (tempObj != 0) {
                // проверка на вместимость объекта в потенциальном контейнере
                if ((objects[0][1] <= containers[0][1][0]) && (objects[0][2] <= containers[0][1][1])) {
                    coordinates.push([objects[0][0], containers[0][0][0], containers[0][0][1]]);
                    containers.push([
                        [containers[0][0][0]+objects[0][1]+space, containers[0][0][1]], // координаты нового ПК (левый верхний угол)
                        [containers[0][1][0]-objects[0][1]-(space*2), containers[0][1][1]] // ширина/высота | размеры нового ПК
                    ]);
                    containers.push([
                        [containers[numCon][0][0], containers[numCon][0][1]+objects[numObj][2]+space], // координаты нового ПК (левый верхний угол)
                        [containers[numCon][1][0], containers[numCon][1][1]-objects[numObj][2]-(space*2)] // ширина/высота | размеры нового ПК
                    ]);
                    containers.splice(0, 1);
                    objects.splice(0, 1);

                    // проверка на пересечение объекта с потенциальным контейнером
                    for (var i = 0; i < containers.length-2; i++) {
                        var newContainers = [];
                        var isNested = [];
                        if (coordinates.at(-1)[1]+objects[0][1] > containers[0][0][0]) {
                            newContainers.push([
                                [containers[i][0][0], containers.at(-1)[0][1]+objects[i][2]],
                                [containers[i][1][0], containers.at(-1)[1][1]]
                            ]);
                            isNested.push(false);
                            newContainers.push([
                                [containers.at(-1)[0][0], containers[i][0][1]],
                                [containers.at(-1)[1][0], containers.at(-1)[1][1]]
                            ]);
                            isNested.push(false);
                            newContainers.push([
                                [containers[i][0][0], containers[i][0][1]],
                                [containers[i][1][0], containers.at(-1)[1][1]-containers[1][1]]
                            ]);
                            isNested.push(false);

                            containers.splice(i, 1);

                            // проверка на вложенность потенциальных контейнеров
                            for (var a = 0; a < newContainers; a++) {
                                for (var b = 0; b < containers; b++) {
                                    if ((newContainers[a][0][0] > containers[b][0][0]) && (newContainers[a][0][0] < (containers[b][0][0] + containers[b][1][0]))) {
                                        if ((newContainers[a][0][1] > containers[b][0][1]) && (newContainers[a][0][1] < containers[b][0][1] + containers[b][1][1])) {
                                            if (newContainers[a][1][0] < containers[b][1][0] - (newContainers[a][0][0] - containers[b][0][0])) {
                                                if (newContainers[a][1][1] < containers[b][1][1] - (newContainers[a][0][1] - containers[b][0][1])) {
                                                    isNested[a] = true;
                                    }}}}}
                                if (isNested[a] == false) {
                                    containers.push(newContainers[a]);
                                }
                            }
                        }
                    }
                    break;
                }

                // перемещение текущего объекта в конец списка
                objects.push(objects[0]);
                objects.splice(0, 1);
                tempObj--;
            }
        }

        // while (i<objects.length) {
        //     while (p<PK.length) {
        //         // проверка на вместимость объекта в ПК
        //         if (objects[i][1]<PK[p][1][0] && objects[i][2]<PK[p][1][1]) {
        //             coordinates.push([objects[i][0], PK[p][0][0]+space, PK[p][0][1]+space]);
        //             PK.push([
        //                 [PK[p][0][0]+objects[i][1], PK[p][0][1]], // координаты нового ПК (левый верхний угол)
        //                 [PK[p][1][0]-objects[i][1], PK[p][1][1]] // ширина/высота | размеры нового ПК
        //             ]);
        //             PK.push([
        //                 [PK[p][0][0], PK[p][0][1]+objects[i][2]], // координаты нового ПК (левый верхний угол)
        //                 [PK[p][1][0], PK[p][1][1]-objects[i][2]] // ширина/высота | размеры нового ПК
        //             ]);
        //             PK.splice(0, 1); // удаление старого ПК
        //
        //
        //             // проверка на пересечение объекта с контейнером
        //             let z = 0 // индекс контейнера
        //             let PK_del = [] // информация об удаленных ПК
        //             while (z<PK.length) {
        //                 if (objects[i][1]>PK[z][0][0]) {
        //                     PK_del = PK[z];
        //                     PK.splice(z, 1);
        //                 }
        //                 z++
        //             }
        //             // Генерация PK [[x, y], [x_list, 10000]]
        //             PK.push([ // 1) or 2***
        //                 [PK_del[0][0], PK.at(-1)[0][1]+objects[i][2]], // cord pk
        //                 [PK_del[1][0], PK.at(-1)[1][1]] // Шрина Высота pk размеры
        //             ]);
        //             PK.push([ // 2) or 2**
        //                 [PK.at(-1)[0][0], PK_del[0][1]], // cord pk
        //                 [PK.at(-1)[1][0], PK.at(-1)[1][1]] // Шрина Высота pk размеры
        //             ]);
        //             PK.push([ // 2*
        //                 [PK_del[0][0], PK_del[0][1]], // cord pk
        //                 [PK_del[1][0], PK.at(-1)[1][1]-PK_del[1][1]] // Шрина Высота pk размеры
        //             ]);
        //             // проверка на вложеность контейнеров
        //             let m = 0
        //             while (m<PK.length) {
        //                 let n = 0;
        //                 while (n<PK.length) {
        //                     if ((PK[n][0][0] > PK[m][0][0]) && (PK[n][0][0] < (PK[m][0][0] + PK[m][1][0]))) {
        //                         if ((PK[n][0][1] > PK[m][0][1]) && (PK[n][0][1] < PK[m][0][1] + PK[m][1][1])) {
        //                             if (PK[n][1][0] < PK[m][1][0] - (PK[n][0][0] - PK[m][0][0])) {
        //                                 if (PK[n][1][1] < PK[m][1][1] - (PK[n][0][1] - PK[m][0][1])) {
        //                                     PK.splice(n, 1)
        //                                 }
        //                             }
        //                         }
        //                     }
        //                     n++
        //                 }
        //                 m++
        //             }
        //         }
        //         PK.push(PK[0]);
        //         PK.splice(0, 1);
        //         p++
        //     }
        //     objects.push(objects[0]);
        //     objects.splice(0, 1);
        //     i++
        // }
    }
    return coordinates
}