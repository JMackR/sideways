import { useCoordinator } from '@upward/authentication';
import { Button, Flex } from '@upward/core-ui-library';
import type { ButtonType } from '@upward/core-ui-library/button';
import { Margin, Stack } from '@upward/core-ui-library';

export const Footer = () => {
  const disabled = false;
  const { handleFooterButtonClicked, toPrevStep } = useCoordinator();

  const footerButtonType: ButtonType = disabled ? 'disabled' : 'primary';

  return (
    <Flex grow={1} direction="column">
      <Margin grow={1} marginStep={3}>
        <Stack direction="row" grow={1} childSeparationStep={2}>
          <Margin grow={1}>
            <Button
              buttonType={'inverse'}
              buttonSize="large"
              title={'Previous'}
              onPressHint={'Navigates you to start a claim.'}
              onClick={async () => toPrevStep()}
              disabled={disabled}
            />
          </Margin>
          <Margin grow={1}>
            <Button
              buttonType={footerButtonType}
              buttonSize="large"
              title={'Next'}
              onPressHint={'Navigates you to start a claim.'}
              onClick={async () => handleFooterButtonClicked()}
              disabled={disabled}
            />
          </Margin>
        </Stack>
      </Margin>
    </Flex>
  );
};
