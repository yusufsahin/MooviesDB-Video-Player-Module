import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import App from './App.jsx';

describe('it exists', () => {
  it('mounts the component', (done) => {
    const wrapper = mount(<App />);
    expect(wrapper.find('div')).to.have.lengthOf(1);
    done();
  })
})