import { addOpacity } from '@/lib/utils';
import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { Button, GetProps, Image, Paragraph, styled } from 'tamagui';

type ButtonProps = GetProps<typeof Button>;

type Props = ButtonProps & {
  text: string;
  image: ImageSourcePropType;
  bgColor: string;
};

const StyledButton = styled(Button, {
  name: 'ShortcutButton',
  width: '$10',
  height: '$10',
  paddingVertical: '$2',
  flexDirection: 'column',
  alignItems: 'center',

  variants: {
    bgColor: {
      ':string': (value: string) => ({
        backgroundColor: addOpacity(value, 0.2),
        hoverStyle: {
          backgroundColor: addOpacity(value, 0.3),
        },
      }),
    },
  } as const,
});

const StyledImage = styled(Image, {
  width: '$4.5',
  height: '$4.5',
});

export function ShortcutButton({ text, image, bgColor, ...props }: Props) {
  return (
    <StyledButton bgColor={bgColor} {...props}>
      <StyledImage source={image} />
      <Paragraph>{text}</Paragraph>
    </StyledButton>
  );
}
