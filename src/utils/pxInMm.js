import { default as tracer } from '@/utils/tracer';

export function convertPxToMm(variable, canvasHeightInPx, factorMM) {
    tracer.debug('pxInMm called');
    const maxHeightInMm = 297;
    let pxInMm = 96 / 25.4;
    let maxHeightInPx = maxHeightInMm * pxInMm;
    let factorVar = variable / pxInMm
    let variableCm = variable / factorVar * factorMM;
    let factor = maxHeightInPx / canvasHeightInPx;
    console.log(maxHeightInPx, factorVar, variableCm, factor, '-', variable)
    return Math.ceil(variableCm / factor);
}