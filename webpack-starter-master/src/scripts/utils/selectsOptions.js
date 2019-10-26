let options = document.querySelectorAll('option');
for (let option of options) {
    if (option.textContent.length > 10) {
        let text = option.textContent.substring(0, 9) + '...';
        option.textContent = text;
    }
}