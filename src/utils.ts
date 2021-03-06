export function ifCallbackIsSupplied(callback: any) {
    return callback !== undefined && typeof callback === 'function'
}