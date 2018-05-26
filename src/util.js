export const
    last2 = last => f => (current, ...rest) => {
        f(current, last, ...rest)
        last = current
    },
    flatten = devices => Object.values(devices).reduce((o, device) => {
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
    }, {}),
    diffs = (devices, last) =>
        Object.entries(devices)
            .filter(([id, device]) =>
                ((a, b) => !b || a.value !== b.value)(device, last[id])
            )
            .map(([id, device]) => device)