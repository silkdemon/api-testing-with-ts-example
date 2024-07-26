export const basePage = "url";

export const getErrorMessageFromMap = (sourceItems: Map<string, string>) => {
  const result = [...sourceItems].map(([key, value]) => {
    return `\n${key}: \n${value}`;
  });

  return result;
};
