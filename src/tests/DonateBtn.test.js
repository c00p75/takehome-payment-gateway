/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import Donation from '../components/donateBtn/DonateBtn';

it('matches snapshot', () => {
  const setShowForm = jest.fn();
  const showPaymentForm = true;
  const tree = renderer.create(
    <Donation setShowForm={setShowForm} showPaymentForm={showPaymentForm} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
