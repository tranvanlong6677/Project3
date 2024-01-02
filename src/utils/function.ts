import { format } from "date-fns";

export const formatDate = (dateString?: string) => {
  const dateObject = new Date(dateString as string);
  const formattedDate = format(dateObject, "dd/MM/yyyy").toString();
  return formattedDate;
};
