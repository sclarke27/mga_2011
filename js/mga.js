/**
 * Global page controller for morning glory jewelry. 
 * All page specific JS should live here.
 */
MGA = {
    
    mMainMenuDivID : "mainMenu", //ID of the div that contains the menu
    
    /**
     * page initalization function. 
     */
    Init : function () {
        this.Menu.load(this.mMainMenuDivID);
        var prodDiv = document.getElementById('prodContent');
        var tempContent = prodDiv.innerHTML;
        for(var i=1; i<=7; i++) {
            prodDiv.innerHTML += tempContent;
        }
    },
    
    /**
     * left menu controller
     */
    Menu : {
        //menu memeber vars
        mItems : ['VICTORIAN','EDWARDIAN','BRIDGE','BAKELITE','COSTUME','ANTIQUES'], //list of menu items (catagories)
        mSelectedItem : null, //currently selected menu item
        mIsAnimating : false, //boolean to prevent firing off too many animations if user is click happy
        mIsLoaded : false, //boolean set once menu is loaded properly
        mMainDivObj : null, //holds the DOM object for main div containing the menu
        mMenuDivs : [], //placholder for array of divs that will be changing size (doesnt include header divs)
        mMenuSpeed : 0.3, //speed of menu transitions in seconds
        
        /**
         * cache DOM objects and do anything else to prep the menu
         */
        load : function (mainDiv) {
            this.mMainDivObj = (typeof mainDiv === "object") ? mainDiv : document.getElementById(mainDiv);
            this.mIsLoaded = (this.mMainDivObj) ? true : false;
                var divList = this.mMainDivObj.getElementsByTagName("div");
                for(var div in divList) {
                    var divObj = divList[div];
                    if (typeof divObj === "object" && divObj.getAttribute("menuItem")) {
                        divObj.setAttribute('defaultheight',divObj.offsetHeight);
                        divObj.setAttribute('itemtype',this.mItems[divObj.getAttribute("menuItem")]);
                        divObj.style.overflow = "hidden";
                        if (divObj.getAttribute("menuItem") == 0) {
                            this.mSelectedItem = 0;
                            divObj.style.height = divObj.offsetHeight + "px";
                        } else {
                            divObj.style.height = "0px";
                        }
                        this.mMenuDivs.push(divObj);
                        
                    }
                }
                console.debug(this.mMenuDivs);
        },
        
        /**
         * 
         * @param {Object} listItem
         */
        open : function(listItem) {
            var anims = new Parallel();
            if(this.mIsLoaded) {
                for(var div in this.mMenuDivs){
                    var divObj = this.mMenuDivs[div];
                    if(divObj.getAttribute('itemtype') == listItem) {
                        anims.addChild(new Tween(divObj.style,'height', Tween.regularEaseInOut, 0, Number(divObj.getAttribute('defaultheight')), this.mMenuSpeed,'px'));
                    } else {
                        if (divObj.offsetHeight != 0) {
                            anims.addChild(new Tween(divObj.style, 'height', Tween.regularEaseInOut, divObj.offsetHeight, 0, this.mMenuSpeed, 'px'));
                        }
                    }
                }
                anims.onMotionFinished = function () {
                    MGA.Menu.mIsAnimating = false;
                };
                MGA.Menu.mIsAnimating = true;
                anims.start();
            }
        }
        
    }
    
}
