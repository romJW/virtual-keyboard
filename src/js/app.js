import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();


const Keyboard= {

        elements: {
        main: null,
        keysContainer: null,
        keys:[]
        },

        eventHandlers:{
            oninput:null,
            onclose:null
        },

        properties:{
            value:"",
            capsLock: false
        },
    

    init() {

        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard","keyboard-hidden");

        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);


        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

  _createKeys(){
 const fragment = document.createDocumentFragment();

 const keyLayout = [
 {en:"`", ru:"ё"}, {en:"1", ru:"1"}, {en:"2", ru:"2"}, {en:"3", ru:"3"}, {en:"4", ru:"4"}, {en:"5", ru:"5"}, {en:"6", ru:"6"}, {en:"7", ru:"7"}, {en:"8", ru:"8"}, {en:"9", ru:"9"}, {en:"0", ru:"0"}, {en:"backspace", ru:"backspace"},
 {en:"tab", ru:"tab"}, {en:"q", ru:"й"}, {en:"w", ru:"ц"}, {en:"e", ru:"у"}, {en:"r", ru:"к"}, {en:"t", ru:"e"}, {en:"y", ru:"н"}, {en:"u", ru:"г"}, {en:"i", ru:"ш"}, {en:"o", ru:"щ"}, {en:"p", ru:"з"},{en:"[", ru:"x"}, {en:"]", ru:"ъ"}, {en:`"\"`, ru:"|"}, {en:"del", ru:"del"},
 {en:"caps", ru:"caps"}, {en:"a", ru:"ф"}, {en:"s", ru:"ы"}, {en:"d", ru:"в"}, {en:"f", ru:"а"}, {en:"g", ru:"п"}, {en:"h", ru:"р"}, {en:"j", ru:"о"}, {en:"k", ru:"л"}, {en:"l", ru:"д"}, {en:"enter", ru:"enter"},
 {en:"shiftl", ru:"shift"}, {en:"z", ru:"я"}, {en:"x", ru:"ч"}, {en:"c", ru:"с"}, {en:"v", ru:"м"}, {en:"b", ru:"и"}, {en:"n", ru:"т"}, {en:"m", ru:"ь"}, {en:"," , ru:"б"} , {en:".", ru:"ю"}, {en:"/", ru:"."},{en:"PgUp", ru:"PgUp"}, {en:"shift", ru:"shift"},
 {en:"ctrl", ru:"ctrl"},{en:"win", ru:"win"},{en:"alt", ru:"alt"}, {en:"space", ru:"space"}, {en:"alt", ru:"alt"}, {en:"ctrl", ru:"ctrl"}, {en:"PgL", ru:"PgL"}, {en:"PgD", ru:"PgD"}, {en:"PgR", ru:"PgR"}
];
// creates html for an icon
 const createIconHTML = (icon_name) => {
    return `<i class="material-icons">${icon_name}</i>`;
 };

    keyLayout.forEach (key => {
        const keyElement = document.createElement("buton");
        const insertLineBreak = ["backspace", "del", "enter", "shift"].indexOf(key.en) !== -1;


        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");

        
        if (key.en =="backspace") { 
                keyElement.classList.add("keyboard__key-wide");
                keyElement.innerHTML = createIconHTML("backspace");

                keyElement.addEventListener("click", ()=> { 
                 this.properties.value = this.properties.value.substring(0, this.properties.value.length -1);
                 this._triggerEvent("oninput");
        });
    }
   else if (key.en =="del") { 
        keyElement.classList.add("keyboard__key");
        keyElement.innerHTML = createIconHTML("delete");

        keyElement.addEventListener("click", ()=> { 
         this.properties.value = this.properties.value.substring(0, this.properties.value.length);
         this._triggerEvent("oninput");
});
}

    else if (key.en =="caps") { 
            keyElement.classList.add("keyboard__key-wide", "keyboard__key-active");
            keyElement.innerHTML = createIconHTML("key_capslock");

            keyElement.addEventListener("click", ()=> { 
             this._toggleCapsLock();
             keyElement.classlist.toggle("keyboard__key-activatable", this.properties.capsLock);
             
    });
}

    else if  (key.en =="enter") { 
        keyElement.classList.add("keyboard__key-middle");
        keyElement.innerHTML = createIconHTML("keyboard_return");

        keyElement.addEventListener("click", ()=> { 
         this.properties.value +="\n";
         this._triggerEvent("oninput");
});
    }

    else if (key.en =="space") { 
        keyElement.classList.add("keyboard__key-extra-wide");
        keyElement.innerHTML = createIconHTML("space_bar");

        keyElement.addEventListener("click", ()=> { 
         this.properties.value +=" ";
         this._triggerEvent("oninput");
});
    }

    else if (key.en =="tab") { 
        keyElement.classList.add("keyboard__key-medium");
        keyElement.innerHTML = "tab";

        keyElement.addEventListener("click", ()=> { 
         this.properties.value +="   ";
         this._triggerEvent("oninput");
});
    }
else if (key.en =="PgUp") { 
    keyElement.classList.add("keyboard__key");
    keyElement.innerHTML = createIconHTML("arrow_upward");

}
else if (key.en =="PgR") { 
    keyElement.classList.add("keyboard__key");
    keyElement.innerHTML = createIconHTML("east");

}
else if (key.en =="PgL") { 
    keyElement.classList.add("keyboard__key");
    keyElement.innerHTML = createIconHTML("west");

}
else if (key.en =="PgD") { 
    keyElement.classList.add("keyboard__key");
    keyElement.innerHTML = createIconHTML("arrow_downward");

}
    else {
        keyElement.textContent = key.en.toLowerCase();

        
        keyElement.addEventListener("click", ()=> { 
            this.properties.value += this.properties.capsLock  ? key.en.toUpperCase() : key.en.toLowerCase();
            this._triggerEvent('oninput');
    
        })
    
        
    }
     
    fragment.appendChild(keyElement);

    if (insertLineBreak){
        fragment.appendChild(document.createElement('br'));
    }
});

return fragment;
  },


  _triggerEvent(handlerName){
    if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
  },
 
  _toggleCapsLock(){
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
            key.textContent = (this.properties.capsLock & !["del", "shift", "shiftl", "ctrl", 'alt', 'win', 'tab'].includes(key.textContent)) ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
    }
  },

  open(initialValue, oninput, onclose){
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard-hidden");
  },

  close() {
      this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard-hidden");

  }
  };


  window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});