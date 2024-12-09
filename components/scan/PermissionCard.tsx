import { Button, Card, H5, Paragraph } from "tamagui";
import '../../i18n'; // Jika i18n.ts berada di root proyek
import { useTranslation } from "react-i18next"; // Impor hook useTranslation

interface PermissionCardProps {
  
  onRequestPermission: () => void;
}

export const PermissionCard = ({ onRequestPermission }: PermissionCardProps) => {
  const { t } = useTranslation();  // Use i18n translation hook

  return (
    <Card bordered theme="red">
      <Card.Header padded>
        <H5>{t('permissionRequired')}</H5>  {/* Translates the title */}
        <Paragraph>{t('permissionMessage')}</Paragraph>  {/* Translates the message */}
      </Card.Header>
      <Card.Footer padded jc="flex-end">
        <Button themeInverse br="$10" onPress={onRequestPermission}>
          {t('allow')}  {/* Translates the button text */}
        </Button>
      </Card.Footer>
    </Card>
  );
};