import {get_pos2} from "@/utils/get_coordinates";

// This function draw all got images on canvas


// This function translate cm to px
export function pxInMm() {
    var diagInPx = Math.sqrt(Math.pow(window.screen.width, 2) + Math.pow(window.screen.height, 2));
    var realDiagonal = Math.ceil(diagInPx / 96);
    var realDPI = diagInPx/realDiagonal;
    var pxInCm = Math.ceil(realDPI / 2.7);
    return pxInCm / 10;
}

// This function need for getting data of image
export function readFile() {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let imageURL
        reader.onerror = () => reject(new DOMException("Problem parsing input file."))
        reader.onload = () => resolve(imageURL = reader.result)
        reader.onloadend = () => {
            var image = new Image();
            image.src = imageURL;
            console.log(inputFile.target.files[0])
            image.onload = () => {
                exportData[3].push([count.value.toString(), image.width, image.height])
                var name = inputFile.target.files[0]['name'];
                var sizeX = image.width.toString();
                var sizeY = image.height.toString();
                objects.push([count.value.toString(), image.src, name, sizeX, sizeY])
                console.log(objects)
                count.value++
            }
        }
        reader.readAsDataURL(inputFile.target.files[0])});
}