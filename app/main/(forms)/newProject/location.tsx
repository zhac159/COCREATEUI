import { ProjectCreateDTO } from "@/api/model";
import { LocationFormField } from "@/common/components/Form/LocationFormField";
import { ModalFormFieldWrapper } from "@/common/components/Form/ModalFormFieldWrapper";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function Location() {
  const form = useFormContext<ProjectCreateDTO>();
  const { t } = useTranslation();
  return (
    <ModalFormFieldWrapper
      keyboardShouldPersistTaps="handled"
      title={t("new-project.location")}
      description={t("new-project.location-tooltip")}
    >
      <Controller
        name="location"
        control={form.control}
        render={({ field }) => (
          <LocationFormField value={field.value} onChange={field.onChange} />
        )}
      />
    </ModalFormFieldWrapper>
  );
}
