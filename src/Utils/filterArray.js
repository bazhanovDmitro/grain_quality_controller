export default function filterArray(array, filterField, filter) {
  return array.filter((object) => object[filterField].includes(filter));
}
