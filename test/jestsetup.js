import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
global.fetch = fetch;