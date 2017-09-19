var dribbble = (function() {
  // layout switch buttons
  var multiSwitch = document.getElementById("multi-switch");
  var singleSwitch = document.getElementById("single-switch");
  var layoutStyle = "single";

  // view content
  var viewContent = document.getElementById("viewContent");
  // artwork elements
  var artworkInfoAry = document.getElementsByClassName("artwork-info");
  var artworkUsernameAry = document.getElementsByClassName("artwork-username");
  var artworkCoverAry = document.getElementsByClassName("artwork-cover");

  // layout switch icons
  var multiSwitchIcon = document.getElementById("multi-switch-icon");
  var singleSwitchIcon = document.getElementById("single-switch-icon");

  function layoutHandler(layoutStyle) {
    if(layoutStyle == "multi") {
      multiSwitchIcon.style.backgroundColor = "#ef0083";
      singleSwitchIcon.style.backgroundColor = "#666666";
      viewContent.classList.remove("single-display");
      viewContent.classList.add("multi-display");
      for(var i = 0 ; i < artworkInfoAry.length ; i++) {
        artworkInfoAry[i].style.display = "none";
        artworkUsernameAry[i].style.display = "none";
        artworkCoverAry[i].style.height = "100%";
      }
      layoutStyle = "multi";
    }
    else if(layoutStyle == "single") {
      singleSwitchIcon.style.backgroundColor = "#ef0083";
      multiSwitchIcon.style.backgroundColor = "#666666";
      viewContent.classList.add("single-display");
      viewContent.classList.remove("multi-display");
      for(var i = 0 ; i < artworkInfoAry.length ; i++) {
        artworkInfoAry[i].style.display = "flex";
        artworkUsernameAry[i].style.display = "flex";
        artworkCoverAry[i].style.height = "70%";
      }
      layoutStyle = "single";
    }
  }


  function initialize() {
    multiSwitch.addEventListener("click", function() {
      layoutStyle = "multi";
      layoutHandler(layoutStyle);
    });
    singleSwitch.addEventListener("click", function() {
      layoutStyle = "single";
      layoutHandler(layoutStyle);
    });
  }

  return {
    init: initialize
  }
}());

dribbble.init();
