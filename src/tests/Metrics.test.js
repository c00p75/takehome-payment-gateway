/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import Metrics from '../components/metrics/Metrics';

it('matches snapshot', () => {
  const tree = renderer.create(
    <Metrics />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
