export function downloadBase64Url(data: string, fileName: string  ) {
  const downloadLink = document.createElement("a");
  downloadLink.href = data;
  downloadLink.download = fileName;
  downloadLink.click();
}

