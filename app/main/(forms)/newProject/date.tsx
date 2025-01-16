import { ProjectUpdateDTO } from "@/api/model";
import { DateFormField } from "@/common/components/Form/DateFormField";
import { ModalFormFieldWrapper } from "@/common/components/Form/ModalFormFieldWrapper";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function Date() {
  const form = useFormContext<ProjectUpdateDTO>();
  const { t } = useTranslation();

  return (
    <ModalFormFieldWrapper
      title={t("new-project.date")}
      description={t("new-project.date-tooltip")}
    >
      <Controller
        name="date"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <DateFormField
            onChange={field.onChange}
            value={field.value}
            error={error?.message}
          />
        )}
      />
    </ModalFormFieldWrapper>
  );
}
