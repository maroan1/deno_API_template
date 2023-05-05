export const toInt = (str: string | number) => {
  if (typeof str === "number") return str;
  if (!stringIsInt(str)) throw new Error("String is not an integer");

  return parseInt(str);
};

const stringIsInt = (str: string) => {
  return (/ˆ\d+$/.test(str));
};
