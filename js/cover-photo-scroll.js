"use strict";

var displayHelloWorld = function () {
    console.log("Hello World");
};

var locationRoller = {};
var languageRoller = {};

let languageMapping = {
    "PHP": "&lt;?php echo \"Hello World!\"; ?>",
    "Ruby": "puts \"Hello World\"",
    "Javascript": "<div class=\"top-level\">var displayHelloWorld = function () {<div>console.log(\"Hello World\");</div>};<div class=\"empty-space\"></div>displayHelloWorld();</div>",
    "Java": "<div class=\"top-level\">public class HelloWorld {<div class=\"empty-space\"></div> <div> public static void main(String[] args) { <div>System.out.println(\"Hello World\");</div>}</div><div class=\"empty-space\"></div>}</div>",
    "C#": "<div class=\"top-level\">using System;<div class=\"empty-space\"></div><div class=\"cancel-indent\">public class Hello <div class=\"cancel-indent\">{ <div>public static void Main() <div class=\"cancel-indent\">{<div>Console.WriteLine(\"Hello World!\");</div>}</div</div></div></div>}</div>",
    "SQL": "<div class=\"left-code\">SELECT G.Basic, P.Name <div>FROM Greetings as G, Places as P <div>WHERE G.Language = P.Location <div>ORDER BY P.Location;</div></div></div></div>",
    "Python": "print(\"Hello World!\")"
};

let locationMapping = {
    "North America": "<li class=\"flag bs\">Bahamas</li><li class=\"flag ca lived\">Canada</li><li class=\"flag cu\">Cuba</li><li class=\"flag ht\">Haiti</li><li class=\"flag jm\">Jamaica</li><li class=\"flag mx\">Mexico</li><li class=\"flag us lived\">United States</li></ul>",
    "South America": "<li class=\"flag ar\">Argentina</li><li class=\"flag br\">Brazil</li></ul>",
    "Antarctica": "<li class=\"flag aq\">Antarctica</li><div>Yep, I really went to Antarctica</div></ul>",
    "Africa": "<li class=\"flag bw\">Botswana</li><li class=\"flag eg\">Egypt</li><li class=\"flag ke\">Kenya</li><li class=\"flag ma\">Morocco</li><li class=\"flag na\">Namibia</li><li class=\"flag za\">South Africa</li><li class=\"flag tz\">Tanzania</li><li class=\"flag zw\">Zimbabwe</li></ul>",
    "Oceania": "<li class=\"flag au\">Australia</li><li class=\"flag nz\">New Zealand</li></ul>",
    "Asia": "<li class=\"flag cn\">China</li><li class=\"flag in\">India</li><li class=\"flag id\">Indonesia</li><li class=\"flag jp\">Japan</li><li class=\"flag sg\">Singapore</li><li class=\"flag th\">Thailand</li><li class=\"flag tr\">Turkey</li><li class=\"flag ae\">United Arab Emirates</li><li class=\"flag vn\">Vietnam</li></ul>",
    "Europe": "<li class=\"flag at\">Austria</li><li class=\"flag be\">Belgium</li><li class=\"flag hr\">Croatia</li><li class=\"flag cz\">Czech Republic</li><li class=\"flag dk\">Denmark</li><li class=\"flag ee\">Estonia</li><li class=\"flag fi\">Finland</li><li class=\"flag fr\">France</li><li class=\"flag de\">Germany</li><li class=\"flag gr\">Greece</li><li class=\"flag hu\">Hungary</li><li class=\"flag it\">Italy</li><li class=\"flag mc\">Monaco</li><li class=\"flag me\">Montenegro</li><li class=\"flag nl\">Netherlands</li><li class=\"flag ru\">Russia</li><li class=\"flag es\">Spain</li><li class=\"flag se\">Sweden</li><li class=\"flag ch\">Switzerland</li><li class=\"flag gb lived\">United Kingdom</li><li class=\"flag va\">Vatican City</li></ul>"
};

let contactMapping = {
    "LinkedIn": '<a class="linkedin" href="https://www.linkedin.com/in/scott-hofman-92a36882/"><img src="./images/In-2C-108px-TM.png"/><p>View My LinkedIn<sub>™</sub> Page</p></a>',
    'GitHub': '<a href="https://github.com/shofman"><img src="./images/GitHub-Mark-120px-plus.png"/><p>View My GitHub Page</p></a>',
    'Skype': '<a class="keep-text" href="skype:scott.hofman?add"><img src="./images/s-logo-solid.jpg"/><p>scott.hofman</p></a>',
    'Email': '<a class="keep-text" href="mailto:scott.a.hofman@gmail.com"><img src="./images/email-icon.png"/><p>scott.a.hofman@gmail.com</p></a>',
    'Phone': '<a class="keep-text" href="tel:+15874323532"><img src="./images/phone-icon.png"/><p>1-587-432-3532</p></a>'
};

window.onload = function () {
    function calcOffsetTop(elt) {
        var rect = elt.getBoundingClientRect();
        var bodyElt = document.body;
        return rect.top + bodyElt.scrollTop;
    }

    var setupCoverPhotoTransition = function (element, shouldCancelDemo) {
        var coverPhotoPosition = calcOffsetTop(element);
        var coverPhotoHeight = element.offsetHeight;

        var fadeImageOut = function(element, elementOffsetHeight, elementHeight) {
            var opacity = 1 - ((lastScrollTop - elementOffsetHeight + 100) / elementHeight);
            setCoverPhotoOpacity(element, opacity);
        };
        var setCoverPhotoOpacity = function (element, opacity) {
            element.style.opacity = opacity;
        };

        var requestAnimation = window.requestAnimationFrame;
        var lastScrollTop = getScrollTop();

        function getScrollTop() {
            var backupBodyElement = (document.documentElement || document.body.parentNode || document.body);
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : backupBodyElement.scrollTop;
            return scrollTop;
        }

        function isInViewport(element){
          if(element.offsetTop<window.innerHeight && 
               element.offsetTop>-element.offsetHeight
             && element.offsetLeft>-element.offsetWidth
             && element.offsetLeft<window.innerWidth){
              return true;
            } else {
              return false;
            }
        }
        if (requestAnimation) {
            loop();
        }

        function loop() {
            var scrollTop = getScrollTop();
            if (lastScrollTop === scrollTop) {
                requestAnimation(loop);
                return;
            } else {
                if (scrollTop > coverPhotoPosition && !(scrollTop > coverPhotoPosition + coverPhotoHeight)) {
                    lastScrollTop = scrollTop;
                    fadeImageOut(element, coverPhotoPosition, coverPhotoHeight);
                    requestAnimation(loop);
                    return;
                } else if (scrollTop < coverPhotoPosition) {
                    setCoverPhotoOpacity(element, 1);
                    var viewportHeight = window.innerHeight;
                    if (shouldCancelDemo && scrollTop + viewportHeight > coverPhotoPosition + 200) {
                        locationRoller.cancelDemo();
                    }
                    requestAnimation(loop);
                    return;
                }

                if (getScrollTop() > coverPhotoPosition + coverPhotoHeight) {
                    setCoverPhotoOpacity(element, 0);
                    requestAnimation(loop);
                    return;
                }
                requestAnimation(loop);
                return;
            }
        }

        function updatePhotoPosition() {
            coverPhotoHeight = element.offsetHeight;
            coverPhotoPosition = calcOffsetTop(element);
        }

        return {
            updatePhotoPosition: updatePhotoPosition
        }
    };

    var setupRoller = function (baseElement, demoRollerOptions, displayElement, displayMapping, callback) {
        var demoCount = 0;
        var heightAdjustmentTimeout;
        var opacityTimeout;
        function changeLanguage() {
            if (shapeElement) {
                shapeElement.style.transform = "rotateX(" + angle + "deg)";
            }
            if (displayElement) {
                displayElement.style.opacity = 0;
                opacityTimeout = setTimeout(function(){
                    displayElement.innerHTML = displayMapping[itemElements[elementSelected].getAttribute("data-item")];
                    if (callback) {
                        callback();
                        heightAdjustmentTimeout = setTimeout(function(){
                            displayElement.style.opacity = 1;
                            callForNewMap();
                        }, 500);
                    } else {
                        displayElement.style.opacity = 1;
                    }
                }, 300);
            }
        }

        var angle = 0;
        var elementSelected = 0;
        var shapeElement = baseElement.getElementsByClassName("shape")[0];
        var stageElement = baseElement.getElementsByClassName("stage")[0];
        var itemElements = baseElement.getElementsByClassName("item");
        var angleDelta = 360 / itemElements.length;
        var lastItemElementIndex = itemElements.length - 1;

        var cancelDemo = function () {
            if (demoScroll) {
                clearInterval(demoScroll);
            }
        };

        var updateWheelAngle = function (event) {
            var change = event.deltaY > 0 ? 1 : -1;
            angle += change * angleDelta;
            updateElementSelected(-change);
        };

        var updateClickAngle = function (event) {
            var offsetTop = calcOffsetTop(shapeElement);
            var clickLocation = event.pageY - offsetTop;
            var change = clickLocation > 0 ? 1 : -1;
            if (change == 1 && 0 > clickLocation + 20) {
                return;
            }
            if (change == -1 && 0 < clickLocation - 20) {
                return;
            }
            angle += change * angleDelta;
            updateElementSelected(-change);
        };

        var updateElementSelected = function (changeValue) {
            elementSelected += changeValue;
            if (elementSelected < 0) {
                elementSelected = lastItemElementIndex;
            }
            if (elementSelected > lastItemElementIndex) {
                elementSelected = 0;
            }
        };

        var updateSpinner = function() {
            window.requestAnimationFrame(changeLanguage);
            cancelDemo();
            if (heightAdjustmentTimeout) {
                clearTimeout(heightAdjustmentTimeout);
            }
            if (opacityTimeout) {
                clearTimeout(opacityTimeout);
            }
        };

        if (stageElement) {
            stageElement.addEventListener("wheel", function(event) {
                updateWheelAngle(event);
                updateSpinner();
                event.preventDefault();
            });
        }

        if (shapeElement) {
            shapeElement.style.display = "block";
            shapeElement.addEventListener("click", function(event) {
                updateClickAngle(event);
                updateSpinner();
                event.preventDefault();
            });
        }

        var demoScrollbar = function () {
            var fakeEvent = {deltaY: 10};
            updateWheelAngle(fakeEvent);
            window.requestAnimationFrame(changeLanguage);

            demoCount++;
            if (demoCount > (itemElements.length * 2 - 1)) {
                cancelDemo();
            }
        };

        var setupRollerAppearance = function (elements) {
            var baseAngle = 0;
            var zTranslateValue = (elements.length - 2) * 20 + 10;
            if (elements.length <= 5) {
                zTranslateValue = 75;
            }
            for (let i=0; i<elements.length; i++) {
                // Order of operations matters here - rotate then translate
                elements[i].style.transform = "rotateX(" + baseAngle + "deg) translateZ(" + zTranslateValue + "px)";
                baseAngle += angleDelta;
            }
        };
        setupRollerAppearance(itemElements);
        changeLanguage();

        if (demoRollerOptions.demo === true) {
            var demoScroll = setInterval(demoScrollbar, demoRollerOptions.speed);
        }

        var getSelectedElement = function () {
            return itemElements[elementSelected].getAttribute("data-item");
        };

        return {
            getSelectedElement: getSelectedElement,
            cancelDemo: cancelDemo
        };
    };

    var adjustHeightOfDisplayElement = function () {
        locationWrapper.style.height = (displayLocations.offsetHeight + displayLocationsHeader.offsetHeight) + "px";
        calgaryPhoto.updatePhotoPosition();
    };

    window.onresize = function () {
        adjustHeightOfDisplayElement();
    };


    setupCoverPhotoTransition(document.getElementsByClassName("cover-photo-image")[0], false);
    let calgaryPhoto = setupCoverPhotoTransition(document.getElementsByClassName("cover-photo-image")[1], true);

    let codeDisplay = document.getElementsByClassName("display-code")[0];
    let locationsDisplay = document.getElementsByClassName("country-list")[0];
    let contactDisplay = document.getElementsByClassName("display-contact-details")[0];

    console.log("displayHelloWorld is available - just in case you wanted to check...");
    let langaugeRollerElement = document.getElementById("languages");
    let locationRollerElement = document.getElementById("locations");
    let contactRollerElement = document.getElementById("contact");
    let locationWrapper = document.getElementsByClassName("location-display-wrapper")[0];
    let displayLocations = locationWrapper.getElementsByClassName("display-locations")[0];
    let displayLocationsHeader = locationWrapper.getElementsByClassName("header")[0];
    let languageRollerOptions = {demo: true, speed: 2200};
    let locationRollerOptions = {demo: true, speed: 3000};
    let contactRollerOptions = {demo: false};
    languageRoller = setupRoller(langaugeRollerElement, languageRollerOptions, codeDisplay, languageMapping);
    setupRoller(contactRollerElement, contactRollerOptions, contactDisplay, contactMapping);
    if (!locationRoller.getSelectedElement) {
        locationRoller = setupRoller(locationRollerElement, locationRollerOptions, locationsDisplay, locationMapping, adjustHeightOfDisplayElement);
    }
}
function showContactPage() {
    locationRoller.cancelDemo();
    languageRoller.cancelDemo();
    document.getElementById("contact").scrollIntoView()
}