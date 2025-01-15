import { postApiProjectBody } from "@/api/zod/coCreateAPI";
import { useFormValidators } from "@/common/hooks/useFormValidators";
  import { useTranslation } from "react-i18next";

export const useGetCreateProjectFormSchema = () => {
  const { t } = useTranslation();

  //TODO
  // const coins = useAuthStore((state) => state.auth.coins);

  const coins = 0;

  const { isDateTodayOrInFuture } = useFormValidators();

  const createProjectFormSchema = postApiProjectBody
    .extend({})
    .refine((data) => isDateTodayOrInFuture(data.date), {
      message: t("new-project.errors.past-date"),
      path: ["date"],
    })
    .superRefine((data, ctx) => {
      data.projectRoles.forEach((role, index) => {
        if (role.cost <= 0) {
          ctx.addIssue({
            code: "custom",
            message: t("new-project.errors.order-positive"),
            path: ["projectRoles", index, "cost"],
          });
        }
      });
    })
    .refine(
      (data) => {
        const totalCost = data.projectRoles.reduce(
          (sum, role) => sum + role.cost,
          0
        );
        return totalCost <= coins;
      },
      {
        message: t("new-project.errors.insufficient-credits"),
        path: ["glob"],
      }
    )

  return {
    createProjectFormSchema,
  };
};
