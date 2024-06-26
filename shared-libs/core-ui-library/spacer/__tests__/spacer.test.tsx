// import React from 'react';
// import { render } from '@testing-library/react-native';
// import { View } from 'react-native';
// import { Spacer } from '..';
// import { Text } from '../..';

// xdescribe('Spacer Snapshot Tests', () => {
//   test('Spacer renders horizontal space correctly', () => {
//     const tree = render(
//       <View style={{ flexDirection: 'row' }}>
//         <Text>Example String 1</Text>
//         <Spacer sizeStep={2} direction="row" />
//         <Text>Example String 2</Text>
//       </View>,
//     );
//     expect(tree).toMatchSnapshot();
//   });
//   test('Spacer renders vertical space correctly', () => {
//     const tree = render(
//       <View style={{ flexDirection: 'column' }}>
//         <Text>Example String 1</Text>
//         <Spacer sizeStep={2} direction="column" />
//         <Text>Example String 2</Text>
//       </View>,
//     );
//     expect(tree).toMatchSnapshot();
//   });
// });
import React from 'react';
import { render } from '@testing-library/react-native';
import { Spacer } from '../spacer';
import { View } from 'react-native';

describe('Spacer component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Spacer direction="row" />);
    const spacer = getByTestId('spacer-component');
    expect(spacer).toBeDefined();
    expect(spacer.props.style).toEqual({ width: 6, height: undefined });
  });

  it('renders correctly with sizeStep prop', () => {
    const { getByTestId } = render(<Spacer direction="column" sizeStep={2} />);
    const spacer = getByTestId('spacer-component');
    expect(spacer).toBeDefined();
    expect(spacer.props.style).toEqual({ height: 12, width: undefined });
  });
});
