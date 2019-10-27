export function truncate(item, maxLength) {
    if (item && item.textContent && item.textContent.length > maxLength) {
        item.textContent = item.textContent.substring(0, maxLength-1) + '...';
    }
}

