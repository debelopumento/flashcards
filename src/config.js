const maxWidth = 400;
const maxHeight = 720;
const docElement = document.documentElement;
const width = docElement.clientWidth > maxWidth
    ? maxWidth
    : docElement.clientWidth;
const height = docElement.clientHeight > maxHeight
    ? maxHeight
    : docElement.clientHeight;

export default {
    width,
    height,
};
