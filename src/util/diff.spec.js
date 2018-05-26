import {diffs} from "../util"
import chai from 'chai'

const {expect} = chai

describe('diff', () => {
    const
        first = {
            A: {id: 'A', value: 1}
        },
        second = {
            A: {id: 'A', value: 2}
        }
    it('unchanged value filtered', () => {
        expect(diffs(first, first)).to.deep.equal([])
    })
    it('changed value returned', () => {
        expect(diffs(second, first)).to.deep.equal([
            {id: 'A', value: 2}
        ])
    })
})