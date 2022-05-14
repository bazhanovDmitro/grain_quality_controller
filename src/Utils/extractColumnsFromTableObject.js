export default function extractColumnsFromTableObject(array) {
  if (array.length > 0) {
    const keys = Object.keys(array[0]);

    // columns
    return keys.map((key) => {
      const rows = array.map((obj) => obj[key]); // column
      return { header: key, rows: rows };
    });
  }
  return [];
}
