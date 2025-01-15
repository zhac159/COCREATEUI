export const useFormValidators = () => {
  const isDateTodayOrInFuture = (date: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate >= today;
  };

  return {
    isDateTodayOrInFuture,
  };
};

