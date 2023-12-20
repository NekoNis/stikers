import { default as tracer } from '@/utils/tracer';

// This function translate cm to px
export function multiplyImage(height, canvasX) {
    tracer.debug('multiplyImage called');
    return canvasX / height;
}