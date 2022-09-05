window.addEventListener("load", () => {
    let loadEvent = new Event("LOCATION/PAGE_READY");
  
    window.dispatchEvent(loadEvent);
  });
  
  window.onbeforeunload = function() {
    let breakEvent = new Event("LOCATION/PATHNAME_CHANGED");
  
    window.dispatchEvent(breakEvent);
  };
  //*END*