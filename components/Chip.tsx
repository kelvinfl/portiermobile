import { Colors } from "@/constants/Colors";
import { addOpacity } from "@/lib/utils";
import { Status } from "@/types";
import React from "react";
import { FontSizeTokens, GetProps, Paragraph, Stack, styled } from "tamagui";

type StackProps = GetProps<typeof Stack>;

type Props = StackProps & {
  status: Status;
  text: string | number;
  textSize?: FontSizeTokens;
};

const ChipWrapper = styled(Stack, {
  name: "Chip",
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",

  variants: {
    status: {
      success: {
        backgroundColor: addOpacity(Colors.success, 0.2),
      },
      pending: {
        backgroundColor: addOpacity(Colors.warning, 0.2),
      },
      failed: {
        backgroundColor: addOpacity(Colors.danger, 0.2),
      },
      default: {
        backgroundColor: addOpacity(Colors.info, 0.2),
      },
    },
  } as const,
});

const StyledParagraph = styled(Paragraph, {
  name: "ChipText",

  variants: {
    status: {
      success: { color: Colors.success },
      pending: { color: Colors.warning },
      failed: { color: Colors.danger },
      default: { color: Colors.info },
    },
  } as const,
});

export const Chip = ({ status, text, textSize = "$2", ...props }: Props) => {
  let color = Colors.info;

  switch (status) {
    case "success":
      color = Colors.success;
      break;
    case "pending":
      color = Colors.warning;
      break;
    case "failed":
      color = Colors.danger;
      break;
    default:
      color = Colors.info;
      break;
  }

  return (
    <ChipWrapper status={status || "default"} {...props}>
      <StyledParagraph
        status={status || "default"}
        size={textSize}
        color={color}
      >
        {text}
      </StyledParagraph>
    </ChipWrapper>
  );
};
