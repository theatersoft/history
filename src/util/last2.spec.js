import {last2} from "../util"
import chai from 'chai'
import sinon from 'sinon'
import sinonchai from 'sinon-chai'

const {expect} = chai
chai.use(sinonchai)

describe('prev', () => {
    const
        both = last2(),
        spy = sinon.spy(),
        call = both(spy)
    it('creates a callable function', () => {
        expect(both).to.be.a('function')
        expect(call).to.be.a('function')
    })
    it('should return (current value, undefined) when first called', () => {
        call(1)
        expect(spy).to.have.been.calledWithExactly(1, undefined)
    })
    it('should return (current value, previous value) when next called', () => {
        call(2)
        expect(spy).to.have.been.calledWithExactly(2, 1)
    })
})