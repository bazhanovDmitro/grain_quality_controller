function disableTabSelection(elementList) {
  document.activeElement.blur();
  for (let element of elementList) {
    element.setAttribute("tabindex", "-1");
  }
}

function enableTabSelection(elementList) {
  for (let element of elementList) {
    element.removeAttribute("tabindex");
  }
}

export default function switchTabSelection(enable) {
  const elementList = document.getElementsByTagName("*");

  if (enable) enableTabSelection(elementList);
  else disableTabSelection(elementList);
}
