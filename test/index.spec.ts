import {test} from '../src/trst'

describe('true', ()=>{
  it("should be true", () => {
    expect(test()).toBeTruthy()
  });
})
