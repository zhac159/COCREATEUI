import { useState, ReactElement, cloneElement } from "react";

export type FormPageProps = {
    nextStep?: () => void;
};

export const useFormWithStep = (forms: ReactElement<FormPageProps>[]) => {
    const [index, setIndex] = useState(0);

    const nextStep = () => {
        setIndex((currentIndex) => currentIndex + 1);
    };

    const formsWithNextStep = forms.map((form) =>
        cloneElement(form, { nextStep })
    );

    return {
        form: formsWithNextStep[index]
    };
};