export default function clearNormValues(normsArray) {
  const recreatedNormsArray = normsArray.map((norm) => {
    const fieldsToCheck = {};
    Object.keys(norm.fieldsToCheck).forEach((key) => (fieldsToCheck[key] = ""));

    return {
      ...norm,
      fieldsToCheck: fieldsToCheck,
    };
  });

  return recreatedNormsArray;
}
