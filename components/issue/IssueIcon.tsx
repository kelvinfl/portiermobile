import { Colors } from "@/constants/Colors";
import { Issue } from "@/types/issue";
import { ReceiveSquare2, TransmitSqaure2 } from "iconsax-react-native";

type Props = Omit<Issue, "issueId" | "roomKey" | "name" | "description">;

export function IssueIcon({ status, type }: Props) {
  let color: string = Colors.info;
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
  }

  let icon = <TransmitSqaure2 color={color} />;
  switch (type) {
    case "receive":
      icon = <ReceiveSquare2 color={color} transform={[{ scaleX: -1 }]} />;
      break;
  }

  return icon;
}
