import { ProjectCreateDTO } from "@/api/model";
import { LocationFormField } from "@/common/components/Form/LocationFormField";
import { ModalFormFieldWrapper } from "@/common/components/Form/ModalFormFieldWrapper";
import { useFormContext } from "react-hook-form";

export default function Location() {
  const form = useFormContext<ProjectCreateDTO>();

  return (
    <ModalFormFieldWrapper
      keyboardShouldPersistTaps="handled"
    >
      <LocationFormField />
    </ModalFormFieldWrapper>
  );
}
