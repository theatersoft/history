export const last2 = (last) => f => (next, ...rest) => {
    f(next, last, ...rest)
    last = next
}

export const flattenValue = o =>
    o