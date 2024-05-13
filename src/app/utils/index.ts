export function isImageOrVideoPath(msgText: string) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  const videoExtensions = [".mp4", ".avi", ".mkv", ".mov", ".wmv"];
  const fileExtension = msgText
    .substring(msgText.lastIndexOf("."))
    .toLowerCase();
  if (imageExtensions.includes(fileExtension)) {
    return "image";
  } else if (videoExtensions.includes(fileExtension)) {
    return "video";
  } else {
    return "text";
  }
}
export const openCenteredWindow = (
  url: string,
  name: string,
  width: number,
  height: number
) => {
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  window.open(
    url,
    name,
    `height=${height}px,width=${width}px,top=${top},left=${left}`
  );
};
