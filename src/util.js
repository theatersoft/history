export const last2 = (last) => f => (next, ...rest) => {
    f(next, last, ...rest)
    last = next
}

export const flatten = devices => Object.values(devices).reduce((o, device) => {
    const
        {id, value} = device,
        set = (o, v) => o[v.id] = v
    if (typeof value === 'object')
        Object.entries(value)
            .forEach(([k, value]) =>
                set(o, {id: `${id}.${k}`, value}))
    else
        set(o, device)
    return o
}, {})