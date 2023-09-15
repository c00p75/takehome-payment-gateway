/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import Mission from '../components/mission/Mission';

it('matches snapshot', () => {
  const setShowForm = jest.fn();
  const showPaymentForm = true;
  const tree = renderer.create(
    <Mission setShowForm={setShowForm} showPaymentForm={showPaymentForm} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
