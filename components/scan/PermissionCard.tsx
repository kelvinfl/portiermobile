import { useTranslation } from 'react-i18next';
import { Button, Card, H5, Paragraph } from 'tamagui';
import '../../i18n';

interface PermissionCardProps {
  onRequestPermission: () => void;
}

export const PermissionCard = ({ onRequestPermission }: PermissionCardProps) => {
  const { t } = useTranslation();

  return (
    <Card bordered theme="red">
      <Card.Header padded>
        <H5>{t('permissionRequired')}</H5>
        <Paragraph>{t('permissionMessage')}</Paragraph>
      </Card.Header>
      <Card.Footer padded jc="flex-end">
        <Button themeInverse br="$10" onPress={onRequestPermission}>
          {t('allow')}
        </Button>
      </Card.Footer>
    </Card>
  );
};
