import { default as tracer } from '@/utils/tracer';

function quickSortPK(arr) {
    tracer.debug('quickSortPK called');
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


function SortPK(arr) {
    let tempPK = [];
    let tempX = 0;
    for (let i = 0; i < arr.length; i++) {
        tempX = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[tempX][0][0] > arr[j][0][0]) {
                tempX = j;
            }
        }
        tempPK = arr[tempX];
        arr[tempX] = arr[i];
        arr[i] = tempPK;
    }
    return arr
}

function del_negative(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i][1][1]<0 || arr[i][1][0]<0) {
            console.log('psafafasfsaf')
            arr.splice(i, 0)
        }
    }
    return arr
}
export function quickSortObj(arr) {

    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
        if (pivot[1] < arr[i][1]) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
    }
    return quickSortObj(left).concat([pivot], quickSortObj(right));
}



export function get_pos1 (space, x_list, y_list, objs) {
    // var objs = Object.create(objstt)
    tracer.debug('get_pos1 called');
    let coordinates = [];
    let PK = [[[0, 0], [10000, x_list]]];
    if (y_list === 0) {
        let p = 0;
        objs = quickSortObj(objs)
        let i = 0;
        let fs = 0;
        while (i<objs.length) {
            let chex_push = false
            console.log('rrrrrr')
            fs++
            while (p<PK.length) {
                if (objs[i][1]+space<PK[0][1][0] && objs[i][2]+space<PK[0][1][1]) {
                    // ---------------
                    coordinates.push([objs[i][0], PK[0][0][0]+space, PK[0][0][1]+space]);
                    PK.push([ // ++
                        [PK[0][0][0], PK[0][0][1]+objs[i][2]+space],  // cord pk
                        [PK[0][1][0], PK[0][1][1]-(objs[i][2]+space)] // Шрина Высота pk размеры
                    ]);
                    PK.push([ // ++
                        [PK[0][0][0]+objs[i][1]+space, PK[0][0][1]],  // cord pk
                        [PK[0][1][0]-(objs[i][1]+space), PK[0][1][1]] // Шрина Высота pk размеры
                    ]);
                    PK.splice(0, 1); // удалили раб pk
                    // ---------------

                    // Проверка на пересечение объекта контейнеров (вроде тут всё ок )
                    let z = 0
                    let PK_del = [] // инфа о удалёных конейнирах
                    let chek_pos = false
                    while (z<PK.length) { // зачитска пересечений контейнеров
                        let x_r_h = coordinates.at(-1)[1]+objs[i][1];
                        let y_r_h = coordinates.at(-1)[2];
                        // let x_r_l = coordinates.at(-1)[1]+objs[i][1];
                        let y_r_l = coordinates.at(-1)[1]+objs[i][2];
                        if (((x_r_h > PK[z][0][0]) && (x_r_h < (PK[z][0][0]+PK[z][1][0]))) &&
                            ((y_r_h > PK[z][0][1]) && (y_r_h < (PK[z][0][1]+PK[z][1][1])))) {
                                PK_del = PK[z];
                                PK.splice(z, 1);
                                console.log('sfsfs')
                                break
                        }
                        if (((x_r_h > PK[z][0][0]) && (x_r_h < (PK[z][0][0]+PK[z][1][0]))) &&
                            ((y_r_l > PK[z][0][1]) && (y_r_l < (PK[z][0][1]+PK[z][1][1])))) {
                                chek_pos = true
                                PK_del = PK[z];
                                PK.splice(z, 1);
                                console.log('sfsfs')
                                break
                        }
                        z++
                    }
                    console.log('выход sfsfs')
                    // Проверка на пересечение объекта контейнеров

                    // ----------------
                    if (PK_del.length != 0) {
                        if (!chek_pos) {
                            // Генерация PK [[x, y], [x_list, 10000]]
                            // PK.push([ // 1) or 2***
                            //     [PK_del[0][0], (coordinates[coordinates.length - 1][2] + objects[0][2])], // cord pk
                            //     [PK_del[1][0], PK[PK.length - 2][1][1]] // Шрина Высота pk размеры
                            // ]);
                            PK.push([ // 2) or 2**
                                [coordinates[coordinates.length - 1][1] + objs[i][1]+space, PK_del[0][1]], // cord pk
                                [x_list - coordinates[coordinates.length - 1][1] + objs[i][1], PK[PK.length - 2][1][1]] // Шрина Высота pk размеры
                            ]);
                            PK.push([ // 2*
                                [PK_del[0][0], PK_del[0][1]], // cord pk
                                [PK_del[1][0], coordinates[coordinates.length - 1][2] - PK_del[0][1]] // Шрина Высота pk размеры
                            ]);
                        } else {
                            PK.push([
                                [PK_del[0][0], PK_del[0][1]], // cord pk
                                [PK_del[0][0] - coordinates[coordinates.length - 1][1], PK_del[1][1]] // Шрина Высота pk размеры
                            ]);
                            PK.push([
                                [PK_del[0][0]+objs[i][1]+space, PK_del[0][1]], // cord pk
                                [PK_del[1][0]-objs[i][1], PK_del[1][1]] // Шрина Высота pk размеры
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

                    // Проверка на пересечение контейнеров
                    let z1 = 0
                    let z2 = 0
                    PK_del = [] // инфа о удалёных конейнирах
                    chek_pos = false
                    while (z1<PK.length) {
                        while (z2<PK.length) {
                            let x_r_h = PK[z2][0][0] + PK[z2][1][0];
                            let y_r_h = PK[z2][0][1];
                            // let x_r_l = coordinates.at(-1)[1]+objs[i][1];
                            let y_r_l = PK[z2][0][1] + PK[z2][1][1];
                            if (((x_r_h > PK[z1][0][0]) && (x_r_h < (PK[z1][0][0] + PK[z1][1][0]))) &&
                                ((y_r_h > PK[z1][0][1]) && (y_r_h < (PK[z1][0][1] + PK[z1][1][1])))) {
                                PK_del = PK[z1];
                                PK_del.push(PK[z2])
                                PK.splice(z1, 1);
                                break
                            }
                            if (((x_r_h > PK[z1][0][0]) && (x_r_h < (PK[z1][0][0] + PK[z1][1][0]))) &&
                                ((y_r_l > PK[z1][0][1]) && (y_r_l < (PK[z1][0][1] + PK[z1][1][1])))) {
                                chek_pos = true
                                PK_del = PK[z1];
                                PK_del.push(PK[z2])
                                PK.splice(z1, 1);
                                break
                            }
                        z2++
                        }
                    z1++
                    }
                    // Проверка на пересечение объекта контейнеров
                    //----------------
                    if (PK_del.length != 0) {
                        if (!chek_pos) {
                            console.log('PK_del_sss')
                            PK.push([ // 2) or 2**
                                [coordinates[coordinates.length - 1][1] + objs[i][1]+space, PK_del[0][1]], // cord pk
                                [x_list - coordinates[coordinates.length - 1][1] + objs[i][1], PK[PK.length - 2][1][1]] // Шрина Высота pk размеры
                            ]);
                            PK.push([ // 2*
                                [PK_del[0][0], PK_del[0][1]], // cord pk
                                [PK_del[1][0], coordinates[coordinates.length - 1][2] - PK_del[0][1]] // Шрина Высота pk размеры
                            ]);
                        } else {
                            console.log('PK_del_ppp')
                            console.log(coordinates[coordinates.length - 1][1], PK_del[0][0])
                            PK.push([
                                [PK_del[0][0], PK_del[0][1]], // cord pk
                                [PK_del[0][0] - coordinates[coordinates.length - 1][1], PK_del[1][1]] // Шрина Высота pk размеры
                            ]);
                            PK.push([
                                [PK_del[0][0]+objs[i][1]+space, PK_del[0][1]], // cord pk
                                [PK_del[1][0]-objs[i][1], PK_del[1][1]] // Шрина Высота pk размеры
                            ]);
                        }
                    }
                    // ----------------

                    i++
                    chex_push = true
                    // PK = del_negative(PK)
                    PK = SortPK(PK)
                    break
                }
                PK.push(PK[0]);
                PK.splice(0, 1);
                p++
            }
            if (!chex_push) {
                objs.push(objs[i]);
                objs.splice(i, 1);
            }
            if (fs===1000) {
                break
            }
        }
    }
    console.log('Конец')
    return coordinates
}