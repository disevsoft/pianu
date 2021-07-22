export async function GetMaxZIndex(){
    var elements:any = document.getElementsByTagName("*");
    var highest_index = 0;

    for (var i = 0; i < elements.length - 1; i++) {
      let currentZIndex = parseInt(elements[i].style.zIndex);
        if (currentZIndex > highest_index) {
            highest_index = currentZIndex;
        }
    }
    return Math.max(highest_index, 100);
  }