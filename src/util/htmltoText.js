import { htmlToText } from "html-to-text";

export const convertHtmlToText = (htmlContent) => {
  const normalText = htmlToText(htmlContent, {
    wordwrap: 130,
    preserveNewlines: true,
  });
  return normalText;
};
