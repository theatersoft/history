import {diffs, flatten, last2} from "../util"
import chai from 'chai'

const {expect} = chai

describe('filter', () => {
    const
        first = {
            A: {id: 'A', value: 1}
        },
        second = {
            A: {id: 'A', value: 2}
        },
        pipe = (f, g) => x => g(f(x)),
        filter = pipe(flatten, last2({})(diffs))

    it('first call returns all', () => {
        expect(filter(first)).to.deep.equal([{id: 'A', value: 1}])
    })
    it('next call same value returns none', () => {
        expect(filter(first)).to.deep.equal([])
    })
    it('next call different value returns change', () => {
        expect(filter(second)).to.deep.equal([{id: 'A', value: 2}])
    })
})