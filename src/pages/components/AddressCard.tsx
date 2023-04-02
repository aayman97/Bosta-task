import { useTranslation } from "react-i18next";

export default function AddressCard() {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("delivery-address")}</h2>
      <div className="address-card">{t("dummy-address")}</div>
    </div>
  );
}
