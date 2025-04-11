export function formatContent(content: string) {
  const decodeHtml = (html: string) => {
    const txt = window.document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const fullContent = decodeHtml(content);

  const contentPreview = fullContent.substring(0, 300) + "...";

  return { contentPreview, fullContent };
}
