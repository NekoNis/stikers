import { default as tracer } from './tracer';

function quickSortPK(arr) {
    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
        if (pivot[0][0] > arr[i][0][0]) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
    }
    return quickSortPK(left).concat([pivot], quickSortPK(right));
}

function quickSortObj(arr) {
    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
        if (pivot[1] > arr[i][1]) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
    }
    return quickSortObj(left).concat([pivot], quickSortObj(right));
}

export function get_pos1 (space, x_list, y_list, obj) {
    tracer.debug('get_pos1 called');
    var objects = obj;
    let coordinates = [];
    let PK = [[[0, 0], [x_list, 20000]]];
    if (y_list === 0) {
        let p = 0;
        let k = 0;
        // quickSortObj(objects)
        while (p<objects.length) {
            let chex_push = false
            while (k<PK.length) {
                if (objects[p][1]<PK[0][1][0] && objects[p][2]<PK[0][1][1]) {
                    // ---------------
                    coordinates.push([objects[p][0], (PK[0][0][1]+space), (PK[0][0][0]+space)]);
                    PK.push([
                        [PK[0][0][0], PK[0][0][1]+objects[p][2]+space], // cord pk
                        [PK[0][1][0], PK[0][1][1]-(objects[p][2]+space)] // Шрина Высота pk размеры
                    ]);
                    PK.push([
                        [PK[0][0][0]+objects[p][1]+space, PK[0][0][1]], // cord pk
                        [PK[0][1][0]-(objects[p][1]+space), PK[0][1][1]] // Шрина Высота pk размеры
                    ]);
                    PK.splice(0, 1); // удалили раб pk
                    // ---------------

                    // Проверка на пересечение объекта контейнеров
                    let z = 0
                    let PK_del = [] // инфа о удалёных конейнирах
                    console.log('ttt')
                    let chek_pos
                    while (z<PK.length) { // зачитска пересечений контейнеров
                        let x_r = coordinates[coordinates.length-1][1]+objects[p][1];
                        let y_r = coordinates[coordinates.length-1][2];
                        let x = coordinates[coordinates.length-1][1];
                        if (((x_r > PK[z][0][0]) && (x_r<(PK[z][0][0]+PK[z][1][0]))) &&
                            ((y_r < (PK[z][0][1]+PK[z][1][1])) && (y_r > PK[z][0][1]))) {
                                if (x < PK[z][0][0]) {
                                    chek_pos = true
                                } else {chek_pos = false}
                                PK_del = PK[z];
                                PK.splice(z, 1);
                                break
                        }
                        z++
                    }
                    // Проверка на пересечение объекта контейнеров

                    // ----------------
                    if (PK_del.length != 0) {
                        if (chek_pos) {
                            console.log('PK_del_sss')
                            // Генерация PK [[x, y], [x_list, 10000]]
                            // PK.push([ // 1) or 2***
                            //     [PK_del[0][0], (coordinates[coordinates.length - 1][2] + objects[0][2])], // cord pk
                            //     [PK_del[1][0], PK[PK.length - 2][1][1]] // Шрина Высота pk размеры
                            // ]);
                            PK.push([ // 2) or 2**
                                [coordinates[coordinates.length - 1][1] + objects[p][1]+space, PK_del[0][1]], // cord pk
                                [x_list - coordinates[coordinates.length - 1][1] + objects[p][1], PK[PK.length - 2][1][1]] // Шрина Высота pk размеры
                            ]);
                            PK.push([ // 2*
                                [PK_del[0][0], PK_del[0][1]], // cord pk
                                [PK_del[1][0], coordinates[coordinates.length - 1][2] - PK_del[0][1]] // Шрина Высота pk размеры
                            ]);
                        } else {
                            console.log('PK_del_ppp')
                            console.log(coordinates[coordinates.length - 1][1]-PK_del[0][0])
                            PK.push([
                                [PK_del[0][0], PK_del[0][1]], // cord pk
                                [coordinates[coordinates.length - 1][1]-PK_del[0][0], PK_del[1][1]] // Шрина Высота pk размеры
                            ]);
                            PK.push([
                                [PK_del[0][0]+objects[p][1]+space, PK_del[0][1]], // cord pk
                                [PK_del[1][0]-objects[p][1], PK_del[1][1]] // Шрина Высота pk размеры
                            ]);
                        }
                    }
                    // ----------------

                    // проверка на вложеность контейнеров
                    let m = 0
                    while (m<PK.length) {
                        let n = 0;
                        while (n<PK.length) {
                            if (((PK[n][0][0] > PK[m][0][0]) && ((PK[n][0][0]+PK[n][1][0]) < (PK[m][0][0]+PK[m][1][0]))) && // x
                                (((PK[n][0][1]) >= (PK[m][0][1])) && ((PK[n][0][1]+PK[n][1][1]) <= (PK[m][0][1]+PK[m][1][1]))) // y
                            ) {
                                console.log('+')
                                PK.splice(n, 1)
                            }
                            n++
                        }
                        m++
                    }
                    // проверка на вложеность контейнеров
                    p++;
                    chex_push = true
                    PK = quickSortPK(PK)
                    break
                }
                PK.push(PK[0]);
                PK.splice(0, 1);
                k++
            }
            if (!chex_push) {
                p++;
            }
        }
    }
    console.log(coordinates)
    return coordinates
}