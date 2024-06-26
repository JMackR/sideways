import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite/no-important';
import { createSerializer } from 'jest-aphrodite-react/no-important';
import renderer from 'react-test-renderer';
import { SelectableRow } from '../selectable-row';
import { SelectableRowProps } from '../selectable-row-props';
import { NoIcon } from '../../../../cft-storybook-web/src/stories/widgets/quote-text/quote.text.stories';

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }));

jest.mock('@loop/assets', () => ({
  Arrow: () => <div>ActionClear</div>,
}));

jest.mock('../../../controls/basic-controls/image/svgs/svg.tsx');

jest.mock('@loop/hooks', () => ({
  useSelectable: () => ({
    setSelected: jest.fn(),
    select: jest.fn(),
    deselect: jest.fn(),
    isSelected: jest.fn(),
    multiSelect: false,
  }),
}));

describe('Selectable Row Multi=False', () => {
  let props: SelectableRowProps;
  describe('has content', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        selectId: '2',
      };
    });
    it('should render table header', () => {
      const { getByText } = render(<SelectableRow {...props} />);
      const selectableRow = getByText(props.mainContent as string);
      expect(selectableRow).toBeDefined();
    });
  });

  describe('on click', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        selectId: '2',
        onDidSelect: jest.fn(),
      };
    });

    it('should call onDidSelect', () => {
      const { getByText } = render(<SelectableRow {...props} />);
      const selectableRow = getByText(props.mainContent as string);
      fireEvent.click(selectableRow);
      expect(props.onDidSelect).toHaveBeenCalledWith('2');
      expect(props.onDidSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('has icon', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        selectId: '3',
        noIcon: false,
      };
    });

    it('should render svg', () => {
      const { getByText } = render(<SelectableRow {...props} />);
      const selectableRow = getByText('SVG');
      expect(selectableRow).toBeDefined();
    });
  });

  describe('has icon row is disabled', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        selectId: '3',
        noIcon: false,
        disabled: true,
      };
    });

    it('should render svg', () => {
      const { getByText } = render(<SelectableRow {...props} />);
      const selectableRow = getByText('SVG');
      expect(selectableRow).toBeDefined();
    });
  });

  describe('has no icon', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        selectId: '3',
        noIcon: true,
      };
    });

    it('should render svg', () => {
      const { queryByText } = render(<SelectableRow {...props} />);
      const selectableRow = queryByText('SVG');
      expect(selectableRow).toBeNull();
    });
  });

  describe('has no icon row is disabled', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        selectId: '3',
        noIcon: true,
        disabled: true,
      };
    });

    it('should render svg', () => {
      const { queryByText } = render(<SelectableRow {...props} />);
      const selectableRow = queryByText('SVG');
      expect(selectableRow).toBeNull();
    });
  });
});

describe('Selectable Row snapshot Tests', () => {
  let props: SelectableRowProps;

  describe('has icon', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        selectId: '2',
        noIcon: false,
      };
    });
    it('SelectableRow creates properly', () => {
      const tree = renderer.create(<SelectableRow {...props} />);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('no icon', () => {
    beforeEach(() => {
      props = {
        mainContent: 'text1',
        selectId: '2',
        noIcon: true,
      };
    });
    it('SelectableRow creates properly', () => {
      const tree = renderer.create(<SelectableRow {...props} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
