import * as base from '@theatersoft/bus'

let tag = 'HISTORY'
const format = (...args) => ([tag, ...args])

export const setTag = name => {tag = name.toUpperCase()}

export const log = (...args) => base.log(...format(...args))
export const error = (...args) => base.error(...format(...args))