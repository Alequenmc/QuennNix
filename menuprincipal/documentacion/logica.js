function copyCode() {
    const codeBlock = document.querySelector('pre code');
    const textArea = document.createElement('textarea');
    textArea.value = codeBlock.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Código copiado al portapapeles!');
}



















