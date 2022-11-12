export function copyElementToClipboard(el: HTMLElement) {
  if (!el) return false;
  const range = document.createRange();
  const selection = window.getSelection()!;
  selection.removeAllRanges();
  try {
    range.selectNodeContents(el);
    selection.addRange(range);
  } catch (e) {
    range.selectNode(el);
    selection.addRange(range);
  }
  console.log("here", selection);
  document.execCommand("Copy");
  return true;
}
