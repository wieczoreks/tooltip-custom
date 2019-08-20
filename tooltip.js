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
        
        let padding = 5
        let spanBox = span.getBoundingClientRect();
        let tooltipBox = tooltip.getBoundingClientRect();   
        let topPos;
        let leftPos;
        let position = span.getAttribute("data-position");
        let pageYOffset = window.pageYOffset
        

        if (position === "top") {
            topPos = pageYOffset + spanBox.top - (tooltipBox.height + padding);
            leftPos = spanBox.left
            tooltip.classList.add('top')
            tooltip.setAttribute('style', 'top:'+topPos+'px;'+'left:'+leftPos+ 'px')
            
        }
        else if (position === "bottom") {
            topPos = pageYOffset + spanBox.top + (spanBox.height + padding);
            leftPos = spanBox.left
            tooltip.classList.add('bottom');
            tooltip.setAttribute('style', 'top:'+topPos+'px;'+'left:'+leftPos+ 'px')
            console.log(tooltipBox.top, tooltipBox.height,docHeight )
            // if(tooltipBox+tooltipBox.height > docHeight){
            //     console.log("TEST")
            // }
        }
        else if (position === "left") {
            topPos = pageYOffset + spanBox.top + padding;
            leftPos = spanBox.left - (tooltipBox.width + padding)
            console.log(tooltip.width)
            tooltip.classList.add('left');
            tooltip.setAttribute('style', 'top:'+topPos+'px;'+'left:'+leftPos+ 'px')
        }
        else if (position === "right") {
            topPos = pageYOffset + spanBox.top + padding;
            leftPos = spanBox.left + (spanBox.width + padding)
            tooltip.classList.add('right');
            tooltip.setAttribute('style', 'top:'+topPos+'px;'+'left:'+leftPos+ 'px')
        } 
        else {
            topPos = spanBox.top - (tooltipBox.height + padding);
            leftPos = spanBox.left
            tooltip.classList.add('top')
            tooltip.setAttribute('style', 'top:'+topPos+'px;'+'left:'+leftPos+ 'px')
        }

      });
      span.addEventListener('mouseout', (e)=>{
        document.querySelector(".tooltip").remove();
      })
    }



})