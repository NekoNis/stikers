import { default as tracer } from '@/utils/tracer';

// This function translate mm to px
export function getSizeX(sizeX, sizeYOld, sizeYNew, factor) {
    tracer.debug('getSizeX called');
    return Math.ceil(sizeX * factor / (sizeX * factor / sizeYNew) / (sizeYOld * factor / sizeX * factor));
}