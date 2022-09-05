//установка и удаление ивент листнеров
let configOfEventListeners = (function () {
    let arrOfEventsObj = [];

    return function (destroy, eventObj) {
        if (!destroy) {
            eventObj.target.addEventListener(eventObj.type, eventObj.func);

            arrOfEventsObj.push(eventObj);
        } else if (destroy == "current" && arrOfEventsObj.length != 0) {

            arrOfEventsObj.forEach((eventObjCopy) => {
                let index = arrOfEventsObj.indexOf(eventObjCopy);

                if (eventObj.type == eventObjCopy.type && eventObj.target == eventObjCopy.target && eventObj.func == eventObjCopy.func) {
                    eventObjCopy.target.removeEventListener(eventObjCopy.type, eventObjCopy.func);

                    arrOfEventsObj.splice(index, 1);
                }
            });

        } else {
            arrOfEventsObj.forEach((eventObjCopy) => {
                eventObjCopy.target.removeEventListener(eventObjCopy.type, eventObjCopy.func);
            });

            arrOfEventsObj = [];
        }
    };
})();
//**OVER**
{
  

if (document.readyState === 'loading') {
    // первый вариант, нативное выполнение js
    // навешиваем события

    configOfEventListeners(false, {target: window, type: "LOCATION/PAGE_READY", func: initPostJs});

    // configOfEventListeners(false, { target: window, type: "load", func: initPostJs });
} else {
    // второй вариант, выполнение js через реакт
    // можно не ждать события, а сразу стартовать скрипты

    initPostJs();
}




function initPostJs() {
  

    let post__content = document.querySelector("[data-id='garage-1112'] .content")
    let menu__items = document.querySelectorAll("[data-id='garage-1112'] .menu .menu__container .items__list li");

    let hero__button = Array.from(document.querySelectorAll("[data-id='garage-1112'] .hero__button"));

    menu__items.forEach((item) => {
        configOfEventListeners(false, { target: item, type: "click", func: openContent });
       
    });

    
    hero__button.forEach((item) => {
        configOfEventListeners(false, { target: item, type: "click", func: updateContent });
       
    });

    function openContent(e) {
        
        let target = e.currentTarget;

        menu__items.forEach((item) => {
            item.classList.remove("hidden")
        });
        target.classList.add("hidden");


        post__content.dataset.hero = target.dataset.id;


        post__content.classList.remove("content_opening");
        post__content.classList.add("content_opening");

        setTimeout(() => {
            post__content.classList.remove("content_opened");
            post__content.classList.add("content_opened");
            
            setTimeout(() => {
                AOS.init();
            }, 300);
        }, 600);
        zenscroll.to(post__content);
    }

    function updateContent(event){
        let target = event.currentTarget;

        let index = hero__button.indexOf(target);
        console.log(index)
        if(index < 3) {
            post__content.dataset.hero = index + 1;
        } else {
            post__content.dataset.hero = 0;
        }
        zenscroll.to(post__content);
        AOS.init();

        setTimeout(() => {
            AOS.init();
        }, 500);
    }


    // var scenes = Array.from(document.querySelectorAll('.item__wrapper__wrapper'));
    //   scenes.forEach((item) => {
    //     var parallaxInstance = new Parallax(item)
    // });
    setTimeout(() => {
        AOS.init();
    }, 500);

    AOS.init();
    
}



configOfEventListeners(false, { target: window, type: "LOCATION/PATHNAME_CHANGED", func: destroyEventListeners });

function destroyEventListeners() {

    //Удаляем все ивент листнеры со страницы
    configOfEventListeners(true, true);
    //**OVER**
};


}