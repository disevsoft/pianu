export function getMaxZIndex(){
    const elements:any = document.getElementsByTagName("*");
    let highest_index = 0;

    for (let i = 0; i < elements.length - 1; i++) {
      const currentZIndex = parseInt(elements[i].style.zIndex);
        if (currentZIndex > highest_index) {
            highest_index = currentZIndex;
        }
    }
    return Math.max(highest_index, 100);
  }