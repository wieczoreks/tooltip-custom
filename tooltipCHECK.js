document.addEventListener('DOMContentLoaded', () => {
    let spans = document.querySelectorAll('span')
    
        let pageYOffset = window.pageYOffset
        const docHeight = document.documentElement.clientHeight;
        const docWidth = document.documentElement.clientWidth;
   
    for(var i=0; i< spans.length; i++){
        let span = spans[i];
        span.addEventListener('mouseover', (e) => {
        let textNode = span.getAttribute('data-tooltip')
        let tooltip = document.createElement('div')
        tooltip.className = 'tooltip';
        tooltip.appendChild(document.createTextNode(textNode));
        let firstChild = document.body.firstChild;//gets the first elem after body
        firstChild.parentNode.insertBefore(tooltip, firstChild);
        
        let padding = 5;
        let spanBox = span.getBoundingClientRect();
        let tooltipBox = tooltip.getBoundingClientRect();   
        let topPos;
        let leftPos;
        let position = span.getAttribute("data-position");
        let pageYOffset = window.pageYOffset;
        let pageXOffset = window.pageXOffset
        
           if(tooltip.getBoundingClientRect().top >= 0 ){
               console.log("tooltip.getBoundingClientRect().top >= 0")
                topPos = pageYOffset + spanBox.top + (spanBox.height + padding);
                tooltip.classList.remove('top');
                tooltip.classList.remove('right');
                tooltip.classList.remove('left');
                tooltip.classList.add('bottom');
                tooltip.setAttribute('style', 'top:'+topPos+'px;'+'left:'+leftPos+ 'px')
            }
            else if(tooltip.getBoundingClientRect().bottom <= docHeight){
                console.log("tooltip.getBoundingClientRect().bottom <= docHeight")
                    topPos = pageYOffset + spanBox.top - (tooltipBox.height + padding);
                    tooltip.classList.remove('bottom');
                    tooltip.classList.add('top');
                    tooltip.setAttribute('style', 'top:'+topPos+'px;'+'left:'+leftPos+ 'px')
                }
            else if(tooltip.getBoundingClientRect().left >= 0){ 
                topPos = pageYOffset + spanBox.top + padding;
                leftPos = pageXOffset+ spanBox.left + (spanBox.width + padding)
                tooltip.classList.remove('left');
                tooltip.classList.add('right');
                tooltip.setAttribute('style', 'top:'+topPos+'px;'+'left:'+leftPos+ 'px')
            }
            else if(tooltip.getBoundingClientRect().left <= docWidth){
                topPos = pageYOffset + spanBox.top + padding;
                leftPos = pageXOffset+ spanBox.left - (tooltipBox.width + padding);
                tooltip.classList.remove('right');
                tooltip.classList.add('left');
                tooltip.setAttribute('style', 'top:'+topPos+'px;'+'left:'+leftPos+ 'px');
            }
   
        

      });
      span.addEventListener('mouseout', (e)=>{
        document.querySelector(".tooltip").remove();
      })
    }



})