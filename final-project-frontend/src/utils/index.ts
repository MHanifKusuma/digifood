const pad = (num: string, totalChars: number) => {
  const pad = "0";
  num = num + "";
  while (num.length < totalChars) {
    num = pad + num;
  }
  return num;
};

const changeColor = (color?: string, ratio?: number, darker?: boolean) => {
  // Trim trailing/leading whitespace
  color = color?.replace(/^\s*|\s*$/, "");

  // Expand three-digit hex
  color = color?.replace(
    /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
    "#$1$1$2$2$3$3"
  );

  // Calculate ratio
  const difference = Math.round(ratio ? ratio * 256 : 256) * (darker ? -1 : 1);
  // Determine if input is RGB(A)
  const rgb = color?.match(
    new RegExp(
      "^rgba?\\(\\s*" +
        "(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])" +
        "\\s*,\\s*" +
        "(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])" +
        "\\s*,\\s*" +
        "(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])" +
        "(?:\\s*,\\s*" +
        "(0|1|0?\\.\\d+))?" +
        "\\s*\\)$",
      "i"
    )
  );
  const alpha = !!rgb && rgb[4] != null ? rgb[4] : null;
  // Convert hex to decimal
  const decimal = rgb
    ? [rgb[1], rgb[2], rgb[3]]
    : color
        ?.replace(
          /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
          (...args) => {
            return (
              parseInt(args[1], 16) +
              "," +
              parseInt(args[2], 16) +
              "," +
              parseInt(args[3], 16)
            );
          }
        )
        .split(/,/);

  // Return RGB(A)
  return rgb
    ? "rgb" +
        (alpha !== null ? "a" : "") +
        "(" +
        Math[darker ? "max" : "min"](
          parseInt(decimal ? decimal[0] : "", 10) + difference,
          darker ? 0 : 255
        ) +
        ", " +
        Math[darker ? "max" : "min"](
          parseInt(decimal ? decimal[1] : "", 10) + difference,
          darker ? 0 : 255
        ) +
        ", " +
        Math[darker ? "max" : "min"](
          parseInt(decimal ? decimal[2] : "", 10) + difference,
          darker ? 0 : 255
        ) +
        (alpha !== null ? ", " + alpha : "") +
        ")"
    : // Return hex
      [
        "#",
        pad(
          Math[darker ? "max" : "min"](
            parseInt(decimal ? decimal[0] : "", 10) + difference,
            darker ? 0 : 255
          ).toString(16),
          2
        ),
        pad(
          Math[darker ? "max" : "min"](
            parseInt(decimal ? decimal[1] : "", 10) + difference,
            darker ? 0 : 255
          ).toString(16),
          2
        ),
        pad(
          Math[darker ? "max" : "min"](
            parseInt(decimal ? decimal[2] : "", 10) + difference,
            darker ? 0 : 255
          ).toString(16),
          2
        ),
      ].join("");
};

export const lighterColor = (color: string, ratio: number) => {
  return changeColor(color, ratio, false);
};

export const darkerColor = (color?: string, ratio?: number) => {
  return changeColor(color, ratio, true);
};
