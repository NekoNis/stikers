import { default as tracer } from './tracer';

// This function translate cm to px
export function pxInMm() {
    tracer.debug('pxInMm called');
    var diagInPx = Math.sqrt(Math.pow(window.screen.width, 2) + Math.pow(window.screen.height, 2));
    var realDiagonal = Math.ceil(diagInPx / 96);
    var realDPI = diagInPx/realDiagonal;
    var pxInCm = Math.ceil(realDPI / 2.7);
    return Math.ceil(pxInCm / 10);
}