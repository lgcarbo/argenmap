export const SHOW_PROVINCE_RESULT = 'SHOW_PROVINCE_RESULT'
export const HIDE_PROVINCE_RESULT = 'HIDE_PROVINCE_RESULT';

export function showProvinceResult(index) {
    return { type: SHOW_PROVINCE_RESULT, index };
}

export function hideProvinceResult(index) {
    return { type: HIDE_PROVINCE_RESULT, index };
}
