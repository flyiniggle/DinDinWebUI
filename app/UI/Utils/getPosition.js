function getPosition(element) {
    let xPosition = 0;
    let yPosition = 0;
    let nextEle = element;

    while (nextEle) {
        xPosition += (nextEle.offsetLeft - nextEle.scrollLeft + nextEle.clientLeft);
        yPosition += (nextEle.offsetTop - nextEle.scrollTop + nextEle.clientTop);
        nextEle = nextEle.offsetParent;
    }

    return {x: xPosition, y: yPosition};
}

export default getPosition;