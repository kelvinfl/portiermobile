import { ArrowRight2 } from 'iconsax-react-native';
import React from 'react';
import { Button, Card, GetProps, styled, useTheme } from 'tamagui';

type CardProps = GetProps<typeof Card>;
type NavigableCardProps = CardProps & {
  children?: React.ReactNode;
  buttonOnPress?: () => void;
};

const StyledCard = styled(Card, {
  name: 'IssueCard',
  padding: '$3',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const StyledButton = styled(Button, {
  name: 'NavigationButton',
  size: '$2',
});

export function NavigableCard({ children, buttonOnPress, ...props }: NavigableCardProps) {
  const theme = useTheme();

  return (
    <StyledCard bordered {...props}>
      {children}
      <StyledButton
        theme="blue"
        icon={<ArrowRight2 size={16} color={theme.blue11.val} />}
        onPress={buttonOnPress}
      />
    </StyledCard>
  );
}
