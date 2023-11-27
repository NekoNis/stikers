import { default as tracer } from './tracer';

// This function translate mm to px
export function convertPxToMm(variable) {
    tracer.debug('pxInMm called');
    const maxHeightInMm = 297;
    const canvasHeightInPx = 602;
    let pxInMm = 96 / 25.4;
    let maxHeightInPx = maxHeightInMm * pxInMm;
    let factorVar = variable / pxInMm
    let variableCm = variable / factorVar * 50;
    let factor = maxHeightInPx / canvasHeightInPx;
    return Math.ceil(variableCm / factor);
}