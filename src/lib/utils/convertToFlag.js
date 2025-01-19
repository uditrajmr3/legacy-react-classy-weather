// export default function convertToFlag(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

export default function convertToFlag(countryCode) {
  console.log("Country code: ", countryCode);
  if (typeof countryCode !== "string" || countryCode.length !== 2) {
    console.warn("Invalid country code provided");
    return "🏳️";
  }

  // Regional indicator symbols are in the range 127462 (🇦) to 127487 (🇿)
  // To get there we need to start from the base and add the ASCII code for each letter
  const base = 127397;
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => base + char.charCodeAt(0));

  try {
    console.log("Flag: ", String.fromCodePoint(...codePoints));
    return String.fromCodePoint(...codePoints);
  } catch (error) {
    console.warn("Could not convert country code to flag:", error);
    return "🏳️";
  }
}

// Example usage:
// convertToFlag('US') // 🇺🇸
// convertToFlag('GB') // 🇬🇧
// convertToFlag('IN') // 🇮🇳
