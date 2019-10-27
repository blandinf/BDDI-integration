import { truncate } from "./utils";

const options = document.querySelectorAll('option');
for (let option of options) {
    truncate(option, 10);
}

