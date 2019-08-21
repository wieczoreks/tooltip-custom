class Tooltip {
    constructor(obj){
        this.docHeight = document.documentElement.clientHeight;
        this.docWidth = document.documentElement.clientWidth;
        this.elem = obj.element
        this.offset = obj.offset;
        this.width = obj.width;
        this.backgroundColor = obj.backgroundColor;
        this.color = obj.color;
        this.padding = obj.padding;
        this.fontSize = obj.fontSize;
        this.borderRadius = obj.borderRadius;
        this.fontFamily = obj.fontFamily;
        this.textAlign = obj.textAlign;
        this.tooltipBeforeColor = obj.tooltipBeforeColor;
    }
    getElems = () => {
        let elems = document.querySelectorAll(this.elem)
        return elems;
    }
    getElemAttr = (elem) => {
        return { 
            tooltipText: elem.dataset.tooltip,
            tooltipAnimMode: elem.dataset.animation,
            tooltipPosition: elem.dataset.position
        }
    }
   
    setElemStyle = (elem) => { 
        let str = `color:${this.color};width:${this.width};background-color:${this.backgroundColor};padding:${this.padding}px;font-size:${this.fontSize}px;border-radius:${this.borderRadius}px;font-family:${this.fontFamily};text-align:${this.textAlign}`
        elem.setAttribute('style',str);
        
        return elem
    }
    addAnimModeClass = (animMode, tooltip) => {   
        switch (animMode) {
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
        return tooltip

    }
    createTooltip = (elem) => {
        let tooltip = document.createElement('div'); 
        tooltip.classList.add('tooltip');
        let animationMode = this.getElemAttr(elem).tooltipAnimMode;
        tooltip = this.addAnimModeClass(animationMode, tooltip);
        let textNode = this.getElemAttr(elem).tooltipText;
        tooltip.appendChild(document.createTextNode(textNode));
        tooltip = this.setElemStyle(tooltip)
        
        return tooltip
    }
    positionTooltip = (tooltip) => {
        let firstChild = document.body.firstChild;
        firstChild.parentNode.insertBefore(tooltip, firstChild);
    }
    getBox = (el) => {
        return el.getBoundingClientRect()
    }
    setTopPosition = (tooltip, tooltipBox, elBox) => {
        let topPos = window.pageYOffset + elBox.top - (tooltipBox.height + this.offset);
        let leftPos = window.pageXOffset + elBox.left
        let attr = tooltip.getAttribute('style')
        tooltip.classList.add('top');
        tooltip.setAttribute('style', `${attr};top:${topPos}px; left:${leftPos}px;`);        
    }
    setBottomPosition = (tooltip,elBox) => {
        let leftPos = window.pageXOffset+ elBox.left;
        let topPos = window.pageYOffset + elBox.top + (elBox.height + this.offset);
        let attr = tooltip.getAttribute('style');
        tooltip.classList.add('bottom');
        tooltip.setAttribute('style', `${attr};top:${topPos}px; left:${leftPos}px;`)   
    }
    setLeftPosition = (tooltip, tooltipBox, elBox) => {
        let topPos = window.pageYOffset + elBox.top;
        let leftPos = window.pageXOffset + elBox.left - (tooltipBox.width + this.offset)
        let attr = tooltip.getAttribute('style')
        tooltip.classList.add('left');
        tooltip.setAttribute('style', `${attr};top:${topPos}px; left:${leftPos}px;`)   
    }
    setRightPosition = (tooltip, elBox) => {
        let topPos = window.pageYOffset + elBox.top;
        let leftPos = window.pageXOffset + elBox.left + (elBox.width + this.offset);
        let attr = tooltip.getAttribute('style');
        tooltip.classList.add('right');
        tooltip.setAttribute('style', `${attr};top:${topPos}px; left:${leftPos}px;`)   
    }

    init = () => {
        document.addEventListener('DOMContentLoaded', () => {
            const elems = this.getElems()
            for (var i = 0; i < elems.length; i++) {
                let elem = elems[i];
                elem.addEventListener('mouseover', (e) => { 
                    let tooltip = this.createTooltip(elem);    
                    this.positionTooltip(tooltip);
                    let elemBox = this.getBox(elem);
                    let tooltipBox = this.getBox(tooltip);
                    let position = this.getElemAttr(elem).tooltipPosition
                    if (position === "top") {
                        this.setTopPosition(tooltip, tooltipBox, elemBox)
                        if (this.getBox(tooltip).top <= 0) {
                            tooltip.classList.remove('top');
                            this.setBottomPosition (tooltip, elemBox)
                        }
                    } else if (position === "bottom") {
                        this.setBottomPosition (tooltip, elemBox)
                        if (this.getBox(tooltip).bottom >= this.docHeight) {
                            tooltip.classList.remove('bottom');
                            this.setTopPosition(tooltip, tooltipBox, elemBox)
                        }
                    } else if (position === "left") {
                        this.setLeftPosition(tooltip, tooltipBox, elemBox)
                        if (this.getBox(tooltip).left <= 0) {
                            this.setRightPosition(tooltip, elemBox)
                            tooltip.classList.remove('left');  
                        }
                    } else if (position === "right") {
                        this.setRightPosition(tooltip, elemBox)
                        if (this.getBox(tooltip).left >= this.docWidth) {  
                            tooltip.classList.remove('right');
                            this.setLeftPosition(tooltip, tooltipBox, elemBox)
                        }
                    } else {
                        this.setTopPosition(tooltip, tooltipBox, elemBox)
                    }
                });
                elem.addEventListener('mouseout', (e) => {
                    document.querySelector(".tooltip").remove();
                })
            }
        })
    }
}


