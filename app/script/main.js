var socket = io();
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
      multiSwitchIcon.style.backgroundColor = "#d60c60";
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
      singleSwitchIcon.style.backgroundColor = "#d60c60";
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


  var artworkGenerator = {
    artworkObj: null,
    artwork: null,
    dispatchData: function(msg) {
      // create artwork elements for every projects
      for(let project in msg.data) {
        console.log(project);
        artworkGenerator.artwork = document.createElement("div");
        artworkGenerator.artwork.classList.add("artwork");
        artworkGenerator.artworkObj = msg.data[project];
        artworkGenerator.createUsername(artworkGenerator.artworkObj.user);
      }
    },
    createUsername: function(user) {
      // create child elements of artworkUsername
      var artworkUsername = document.createElement("div");
      var userPic = document.createElement("div");
      var userAccount = document.createElement("input");
      // add class
      artworkUsername.classList.add("artwork-username");
      userPic.classList.add("artwork-username-pic");
      userAccount.classList.add("artwork-username-account");
      // write in data
      userPic.style.backgroundImage = user.pic;
      userAccount.value = user.account;
      // append children
      artworkUsername.appendChild(userPic);
      artworkUsername.appendChild(userAccount);
      artworkGenerator.artwork.appendChild(artworkUsername);
      // create next element
      artworkGenerator.createCover(artworkGenerator.artworkObj.cover);
    },
    createCover: function(cover) {
      var artworkCover = document.createElement("div");
      artworkCover.classList.add("artwork-cover");
      artworkCover.style.backgroundImage = cover.pic;
      artworkGenerator.artwork.appendChild(artworkCover);
      artworkGenerator.createInfo(artworkGenerator.artworkObj.info);
    },
    createInfo: function(info) {
      var artworkInfo = document.createElement("div");
      for(let name in info) {
        // create child elements of artworkInfo
        let infoElement = document.createElement("div");
        let infoElementIcon = document.createElement("div");
        let infoElementCount = document.createElement("input");
        // add class
        artworkInfo.classList.add("artwork-info");
        infoElement.classList.add("artwork-info-element");
        infoElementIcon.classList.add("artwork-info-element-icon", "artwork-info-element-"+ name);
        infoElementCount.classList.add("artwork-info-element-count");
        // write in data
        infoElementCount.value = info[name];
        // append children
        infoElement.appendChild(infoElementIcon);
        infoElement.appendChild(infoElementCount);
        artworkInfo.appendChild(infoElement);
      }

      artworkGenerator.artwork.appendChild(artworkInfo);
      // integrate all children of artwork
      artworkGenerator.integrate();
    },
    integrate: function() {
      viewContent.appendChild(artworkGenerator.artwork);
      // clear native artwork elements
      artworkGenerator.clear();
    },
    clear: function() {
      artworkGenerator.artwork = null;
      artworkGenerator.artworkObj = null;
    }
  };

  function opensocket() {
    socket.on("artworksData", function(msg) {
      artworkGenerator.dispatchData(msg);
    });
  }

  function getArtworks() {
    socket.emit("getArtworks");
  }

  function initialize() {
    // open socket and send artworks request
    opensocket();
    getArtworks();
    // layout switch handler
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
