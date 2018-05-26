import {last2} from "../util"
import chai from 'chai'
import sinon from 'sinon'
import sinonchai from 'sinon-chai'

const {expect} = chai
chai.use(sinonchai)

describe('prev', () => {
    const
        both = last2(0),
        spy = sinon.spy(),
        call = both(spy)
    it('takes an initial value and returns a callable function', () => {
        expect(both).to.be.a('function')
    })
    it('which takes a callback returning another function', () => {
        expect(call).to.be.a('function')
    })
    it('first called with (current, initial value)', () => {
        call(1)
        expect(spy).to.have.been.calledWithExactly(1, 0)
    })
    it('second called with (current, last)', () => {
        call(2)
        expect(spy).to.have.been.calledWithExactly(2, 1)
    })
})