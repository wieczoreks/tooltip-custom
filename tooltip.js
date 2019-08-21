document.addEventListener('DOMContentLoaded', () => {
    const spans = document.querySelectorAll('span')
    const docHeight = document.documentElement.clientHeight;
    const docWidth = document.documentElement.clientWidth;
    for (var i = 0; i < spans.length; i++) {
        let span = spans[i];
        span.addEventListener('mouseover', (e) => {
            let textNode = span.getAttribute('data-tooltip')
            let tooltip = document.createElement('div')
            let animationMode = span.dataset.animation;
            tooltip.className = 'tooltip';
            switch (animationMode) {
                case 'slideInUp':
                    tooltip.classList.add('animSlideInUp');
                    break;
                case 'slideInDown':
                    tooltip.classList.add('animSlideInDown');
                    break;
                case 'slideInLeft':
                    tooltip.classList.add('animSlideInLeft');
                    break;
                case 'slideInRight':
                    tooltip.classList.add('animSlideInRight');
                    break;
                case 'fadeIn':
                    tooltip.classList.add('animFadeIn');
                    break;
                default:
                    tooltip.classList.add('animSlideInUp');
                    break;
            }
            tooltip.appendChild(document.createTextNode(textNode));
            let firstChild = document.body.firstChild;
            firstChild.parentNode.insertBefore(tooltip, firstChild);
            let padding = 5;
            let spanBox = span.getBoundingClientRect();
            let tooltipBox = tooltip.getBoundingClientRect();
            let topPos;
            let leftPos;
            let position = span.getAttribute("data-position");
            let pageYOffset = window.pageYOffset;
            let pageXOffset = window.pageXOffset
            if (position === "top") {
                topPos = pageYOffset + spanBox.top - (tooltipBox.height + padding);
                leftPos = spanBox.left
                tooltip.classList.add('top')
                tooltip.setAttribute('style', 'top:' + topPos + 'px;' + 'left:' + leftPos + 'px')
                if (tooltip.getBoundingClientRect().top <= 0) {
                    topPos = pageYOffset + spanBox.top + (spanBox.height + padding);
                    tooltip.classList.remove('top');
                    tooltip.classList.add('bottom');
                    tooltip.setAttribute('style', 'top:' + topPos + 'px;' + 'left:' + leftPos + 'px')
                }
            } else if (position === "bottom") {
                leftPos = spanBox.left;
                topPos = pageYOffset + spanBox.top + (spanBox.height + padding);
                tooltip.classList.add('bottom');
                tooltip.setAttribute('style', 'top:' + topPos + 'px;' + 'left:' + leftPos + 'px')
                if (tooltip.getBoundingClientRect().bottom >= docHeight) {
                    topPos = pageYOffset + spanBox.top - (tooltipBox.height + padding);
                    tooltip.classList.remove('bottom');
                    tooltip.classList.add('top');
                    tooltip.setAttribute('style', 'top:' + topPos + 'px;' + 'left:' + leftPos + 'px')
                }
            } else if (position === "left") {
                topPos = pageYOffset + spanBox.top + padding;
                leftPos = pageXOffset + spanBox.left - (tooltipBox.width + padding)
                tooltip.classList.add('left');
                tooltip.setAttribute('style', 'top:' + topPos + 'px;' + 'left:' + leftPos + 'px');
                if (tooltip.getBoundingClientRect().left <= 0) {

                    topPos = pageYOffset + spanBox.top + padding;
                    leftPos = pageXOffset + spanBox.left + (spanBox.width + padding)
                    tooltip.classList.remove('left');
                    tooltip.classList.add('right');
                    tooltip.setAttribute('style', 'top:' + topPos + 'px;' + 'left:' + leftPos + 'px')
                }
            } else if (position === "right") {
                topPos = pageYOffset + spanBox.top + padding;
                leftPos = pageXOffset + spanBox.left + (spanBox.width + padding)
                tooltip.classList.add('right');
                tooltip.setAttribute('style', 'top:' + topPos + 'px;' + 'left:' + leftPos + 'px');
                if (tooltip.getBoundingClientRect().left >= docWidth) {
                    topPos = pageYOffset + spanBox.top + padding;
                    leftPos = pageXOffset + spanBox.left - (tooltipBox.width + padding);
                    tooltip.classList.remove('right');
                    tooltip.classList.add('left');
                    tooltip.setAttribute('style', 'top:' + topPos + 'px;' + 'left:' + leftPos + 'px');
                }
            } else {
                topPos = spanBox.top - (tooltipBox.height + padding);
                leftPos = spanBox.left
                tooltip.classList.add('top')
                tooltip.setAttribute('style', 'top:' + topPos + 'px;' + 'left:' + leftPos + 'px')
            }

        });
        span.addEventListener('mouseout', (e) => {
            document.querySelector(".tooltip").remove();
        })
    }
})