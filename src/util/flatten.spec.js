import {flattenValue} from "../util"
import chai from 'chai'

const {expect} = chai

describe('flatten', () => {
    it('non object value unchanged', () => {
        expect([
            {
                id: 'Z',
                value: 1
            }
        ])
            .to.deep.equal([
            {
                id: 'Z',
                value: 1
            }
        ])
    })
    it('object value flattened', () => {
        expect([
            {
                id: 'Z',
                value: {A: 1, B: 2}
            }
        ])
            .to.deep.equal([
            {
                id: 'Z.A',
                value: 1
            },
            {
                id: 'Z.B',
                value: 2
            },
        ])
    })
})