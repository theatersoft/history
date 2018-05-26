import {flatten} from "../util"
import chai from 'chai'

const {expect} = chai

describe('flatten', () => {
    it('non object value unchanged', () => {
        const single = {
            Z: {id: 'Z', value: 1}
        }
        expect(flatten(single)).to.deep.equal(single)
    })
    it('object value flattened', () => {
        const multi = {
            Z: {id: 'Z', value: {A: 1, B: 2}}
        }
        expect(flatten(multi))
            .to.deep.equal({
            'Z.A': {id: 'Z.A', value: 1},
            'Z.B': {id: 'Z.B', value: 2}
        })
    })
})