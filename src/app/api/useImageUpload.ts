import { RefObject } from "react";

export const useImageUpload = (
  content: string,
  setContent: (value: string) => void,
  contentRef: RefObject<HTMLDivElement | null>
) => {
  const insertAtCursor = (html: string) => {
    const el = contentRef.current;
    if (!el) return;

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      el.innerHTML += html;
      setContent(el.innerHTML);
      return;
    }

    const range = sel.getRangeAt(0);
    range.deleteContents();

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node: ChildNode | null = null;
    while ((node = tempDiv.firstChild)) {
      frag.appendChild(node);
    }
    range.insertNode(frag);

    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);

    setContent(el.innerHTML);
  };

  const uploadAndInsertImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://10.125.121.186:8080/api/upload/image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("이미지 업로드 실패");

      const imageUrl = await response.text();

      insertAtCursor(
        `<img src="${imageUrl}" alt="업로드 이미지" class="my-4 rounded shadow" />`
      );
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 실패");
    }
  };

  return {
    uploadAndInsertImage,
  };
};
