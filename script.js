// Portfolio JavaScript
console.log("Portfolio Loaded Successfully");
const professions = [

    "Mathematics Educator",

    "Science Teacher",

    "Web Developer",

    "Python Learner"

];

let professionIndex = 0;
let charIndex = 0;

const typingText = document.getElementById("typing-text");

function typeText(){

    if(charIndex < professions[professionIndex].length){

        typingText.textContent += professions[professionIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeText,80);

    }

    else{

        setTimeout(eraseText,2500);

    }

}

function eraseText(){

    if(charIndex > 0){

        typingText.textContent = professions[professionIndex].substring(0,charIndex-1);

        charIndex--;

        setTimeout(eraseText,50);

    }

    else{

        professionIndex++;

        if(professionIndex >= professions.length){

            professionIndex = 0;

        }

        setTimeout(typeText,400);

    }

}

document.addEventListener("DOMContentLoaded",function(){

    if(professions.length){

        typeText();

    }

});
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });
});

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach((el) => observer.observe(el));



/*=========================
   PROJECT CARD CLICK
=========================*/

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

    card.addEventListener("click", (event) => {

        /* Do not activate card when clicking a button */

        if (event.target.closest("a, button")) {
            return;
        }


        /* Remove active state from all cards */

        projectCards.forEach((item) => {

            item.classList.remove("card-active");

        });


        /* Activate selected card */

        card.classList.add("card-active");


        /* Remove it after a short time */

        setTimeout(() => {

            card.classList.remove("card-active");

        }, 700);

    });

});
/*==================== TOAST NOTIFICATION ====================*/

const toast = document.getElementById("toast");
const toastIcon = document.getElementById("toast-icon");
const toastMessage = document.getElementById("toast-message");
const progress = document.querySelector(".toast-progress");

function showToast(message, type = "success") {

    toastMessage.textContent = message;

    if(type === "success"){

        toast.style.borderLeftColor = "#FFD700";
        toastIcon.className = "fa-solid fa-circle-check";
        toastIcon.style.color = "#FFD700";

        progress.style.background = "#FFD700";

    }

    else{

        toast.style.borderLeftColor = "#EF4444";
        toastIcon.className = "fa-solid fa-circle-xmark";
        toastIcon.style.color = "#EF4444";

        progress.style.background = "#EF4444";

    }

    toast.classList.add("show");

    /* Restart Progress Animation */

    progress.style.transition = "none";
    progress.style.width = "100%";

    void progress.offsetWidth;

    progress.style.transition = "width 3.5s linear";
    progress.style.width = "0%";

    setTimeout(() => {

        toast.classList.remove("show");

    },3500);

}
/*==================== EMAILJS ====================*/

const contactForm = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");

if (contactForm && sendBtn) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();


        /* Disable button while sending */

        sendBtn.disabled = true;

        sendBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';


        emailjs.sendForm(
            "service_719u4fy",
            "template_cjs129o",
            this
        )


        /*================ SUCCESS =================*/

        .then(() => {

            showToast("Message sent successfully!");


            contactForm.reset();


            /* Success button state */

            sendBtn.innerHTML =
                '<i class="fa-solid fa-circle-check"></i> Message Sent!';


            sendBtn.style.background =
                "linear-gradient(135deg,#22c55e,#16a34a)";

            sendBtn.style.color = "#ffffff";


            /* Return button to normal */

            setTimeout(() => {

                sendBtn.innerHTML =
                    '<i class="fa-solid fa-paper-plane"></i> Send Message';

                sendBtn.style.background =
                    "linear-gradient(135deg,#FFD700,#FFC107)";

                sendBtn.style.color = "#121212";

            }, 2500);

        })


        /*================ ERROR =================*/

        .catch((error) => {

            console.error(error);

            showToast(
                "Failed to send message!",
                "error"
            );


            sendBtn.innerHTML =
                '<i class="fa-solid fa-circle-xmark"></i> Try Again';

        })


        /*================ FINALLY =================*/

        .finally(() => {

            /*
             * Do not immediately restore the button here.
             * Success/error states need time to be visible.
             */

            setTimeout(() => {

                sendBtn.disabled = false;

            }, 2500);

        });

    });

}
/*==================== BACK TO TOP ====================*/

const scrollTopBtn = document.getElementById("scroll-top");

if (scrollTopBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            scrollTopBtn.classList.add("show");

        } else {

            scrollTopBtn.classList.remove("show");

        }

    });

    scrollTopBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


/*==============================================================
        STEM LAB — CATEGORY FILTER + ANIMATION + RESULT
==============================================================*/

const stemFilters = document.querySelectorAll(".stem-filter");
const stemCards = document.querySelectorAll(".stem-card");
const stemFilterResult =
    document.querySelector(".stem-filter-result");


stemFilters.forEach(filter => {

    filter.addEventListener("click", function () {

        /*------------------------------------------
            Active button
        ------------------------------------------*/

        stemFilters.forEach(button => {

            button.classList.remove("active");

        });
        
        this.classList.add("active");


        /*------------------------------------------
            Selected category
        ------------------------------------------*/

        const selectedCategory =
            this.textContent.trim().toLowerCase();


        let visibleCount = 0;


        /*------------------------------------------
            Filter cards
        ------------------------------------------*/

        stemCards.forEach(card => {

            const categoryElement =
                card.querySelector(".stem-category");


            /* Safety check */

            if (!categoryElement) {

                if (selectedCategory === "all") {

                    card.style.display = "";

                    visibleCount++;

                    card.classList.remove("stem-filter-show");

                    void card.offsetWidth;

                    card.classList.add("stem-filter-show");

                } else {

                    card.style.display = "none";

                    card.classList.remove("stem-filter-show");

                }

                return;

            }


            const categoryText =
                categoryElement.textContent
                    .trim()
                    .toLowerCase();


            /*--------------------------------------
                ALL
            --------------------------------------*/

            if (selectedCategory === "all") {

                card.style.display = "";

                visibleCount++;

                card.classList.remove("stem-filter-show");

                void card.offsetWidth;

                card.classList.add("stem-filter-show");

                return;

            }


            /*--------------------------------------
                CATEGORY MATCH
            --------------------------------------*/

            if (categoryText.startsWith(selectedCategory)) {

                card.style.display = "";

                visibleCount++;

                card.classList.remove("stem-filter-show");

                void card.offsetWidth;

                card.classList.add("stem-filter-show");

            } else {

                card.style.display = "none";

                card.classList.remove("stem-filter-show");

            }

        });


        /*------------------------------------------
            UPDATE RESULT INDICATOR
        ------------------------------------------*/

        if (stemFilterResult) {

            if (selectedCategory === "all") {

                stemFilterResult.innerHTML =
                    `Showing <span class="result-count">${visibleCount}</span> simulations`;

            } else {

                const displayCategory =
                    this.textContent.trim();

                stemFilterResult.innerHTML =
                    `Showing <span class="result-count">${visibleCount}</span> `
                    + `<span class="result-category">${displayCategory}</span> `
                    + `${visibleCount === 1 ? "simulation" : "simulations"}`;

            }

        }

    });

});

/*==============================================================
        CERTIFICATE STEP 3C — LIGHTBOX JAVASCRIPT
==============================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const lightbox =
        document.getElementById("certificateLightbox");

    const lightboxImage =
        document.getElementById("certificateLightboxImage");

    const closeButton =
        document.getElementById("certificateLightboxClose");


    /*----------------------------------------------------------
                    SAFETY CHECK
    ----------------------------------------------------------*/

    if (
        !lightbox ||
        !lightboxImage ||
        !closeButton
    ) {

        console.warn(
            "Certificate lightbox elements not found."
        );

        return;

    }


    const backdrop =
        lightbox.querySelector(
            ".certificate-lightbox-backdrop"
        );


    /*----------------------------------------------------------
                    OPEN CERTIFICATE
    ----------------------------------------------------------*/

    function openCertificate(imagePath, imageAlt) {

        if (!imagePath) {

            console.warn(
                "Certificate image path is missing."
            );

            return;

        }


        lightboxImage.src = imagePath;

        lightboxImage.alt =
            imageAlt || "Certificate preview";


        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "certificate-lightbox-open"
        );


        /*
         * Move focus to the close button
         */

        closeButton.focus();

    }


    /*----------------------------------------------------------
                    CLOSE CERTIFICATE
    ----------------------------------------------------------*/

    function closeCertificate() {

        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "certificate-lightbox-open"
        );


        /*
         * Clear image after closing animation
         */

        setTimeout(function () {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                lightboxImage.removeAttribute(
                    "src"
                );

            }

        }, 300);

    }


    /*----------------------------------------------------------
                    VIEW CERTIFICATE BUTTONS
    ----------------------------------------------------------*/

    const viewButtons =
        document.querySelectorAll(
            ".certificate-view-btn"
        );


    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                const imagePath =
                    button.getAttribute(
                        "data-certificate"
                    );


                /*
                 * Try to get ALT text from the
                 * certificate image inside the card.
                 */

                const card =
                    button.closest(
                        ".certificate-card"
                    );


                const image =
                    card
                        ? card.querySelector(
                            ".certificate-image img"
                          )
                        : null;


                const imageAlt =
                    image
                        ? image.getAttribute("alt")
                        : "Certificate preview";


                openCertificate(
                    imagePath,
                    imageAlt
                );

            }
        );

    });


    /*----------------------------------------------------------
                    CLOSE BUTTON
    ----------------------------------------------------------*/

    closeButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            closeCertificate();

        }
    );


    /*----------------------------------------------------------
                    BACKDROP CLICK
    ----------------------------------------------------------*/

    if (backdrop) {

        backdrop.addEventListener(
            "click",
            function () {

                closeCertificate();

            }
        );

    }


    /*----------------------------------------------------------
                    PREVENT CONTENT CLICK
    ----------------------------------------------------------*/

    const lightboxContent =
        lightbox.querySelector(
            ".certificate-lightbox-content"
        );


    if (lightboxContent) {

        lightboxContent.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /*----------------------------------------------------------
                        ESC KEY
    ----------------------------------------------------------*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains(
                    "active"
                )
            ) {

                closeCertificate();

            }

        }
    );


    /*----------------------------------------------------------
                    PREVENT IMAGE DRAGGING
    ----------------------------------------------------------*/

    lightboxImage.addEventListener(
        "dragstart",
        function (event) {

            event.preventDefault();

        }
    );


    /*----------------------------------------------------------
                    DEBUG INFORMATION
    ----------------------------------------------------------*/

    console.log(
        "Certificate lightbox initialized:",
        viewButtons.length,
        "View Certificate buttons found."
    );

});

/*==============================================================
        CERTIFICATE STEP 3E — FILTER FUNCTIONALITY
==============================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const certificateSection =
        document.querySelector(".certificates-section");

    if (!certificateSection) {
        return;
    }


    /*----------------------------------------------------------
                    FILTER ELEMENTS
    ----------------------------------------------------------*/

    const filterButtons =
        certificateSection.querySelectorAll(
            ".certificate-filter"
        );

    const certificateCards =
        certificateSection.querySelectorAll(
            ".certificate-card"
        );

    const resultCount =
        certificateSection.querySelector(
            ".certificate-result-count"
        );


    /*----------------------------------------------------------
                    FILTER CERTIFICATES
    ----------------------------------------------------------*/

    function filterCertificates(selectedFilter) {

        let visibleCount = 0;


        certificateCards.forEach(function (card) {

            const provider =
                card.getAttribute("data-provider");


            /*----------------------------------------------
                    SHOW ALL CERTIFICATES
            ----------------------------------------------*/

            if (
                selectedFilter === "all" ||
                provider === selectedFilter
            ) {

                card.style.display = "";

                visibleCount++;

            }


            /*----------------------------------------------
                    HIDE NON-MATCHING CERTIFICATES
            ----------------------------------------------*/

            else {

                card.style.display = "none";

            }

        });


        /*--------------------------------------------------
                    UPDATE RESULT COUNT
        --------------------------------------------------*/

        if (resultCount) {

            resultCount.textContent =
                visibleCount;

        }

    }


    /*----------------------------------------------------------
                    FILTER BUTTON EVENTS
    ----------------------------------------------------------*/

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedFilter =
                    button.getAttribute(
                        "data-filter"
                    );


                /*------------------------------------------
                    UPDATE ACTIVE BUTTON
                ------------------------------------------*/

                filterButtons.forEach(
                    function (filterButton) {

                        filterButton.classList.remove(
                            "active"
                        );

                        filterButton.setAttribute(
                            "aria-pressed",
                            "false"
                        );

                    }
                );


                button.classList.add("active");

                button.setAttribute(
                    "aria-pressed",
                    "true"
                );


                /*------------------------------------------
                    APPLY FILTER
                ------------------------------------------*/

                filterCertificates(
                    selectedFilter
                );

            }
        );

    });


    /*----------------------------------------------------------
                INITIAL FILTER STATE
    ----------------------------------------------------------*/

    filterCertificates("all");

});



/*==============================================================
  CARDIOVASCULAR FEATURE CARD — BRIGHT, CORRECTLY ORDERED STAR TRAIN
  A large lead star followed by three smaller stars, fully inside the border.
==============================================================*/
(function(){
  function initCardStarTrain(){
    document.querySelectorAll('.cardiovascular-featured .featured-star-frame').forEach(function(frame){
      if(frame.dataset.starTrainReady==='true') return;
      var card=frame.closest('.cardiovascular-featured');
      var stars=Array.from(frame.querySelectorAll('.orbit-star'));
      if(!card || stars.length<4) return;
      frame.dataset.starTrainReady='true';
      var start=performance.now();
      var speed=0.000045; // circuit duration about 22 seconds
      function animate(now){
        if(!frame.isConnected) return;
        var w=frame.clientWidth, h=frame.clientHeight;
        if(w>30 && h>30){
          // Keep star centers far enough inside the clipped edge to avoid half-hidden glyphs.
          var pad=15, left=pad, top=pad, right=Math.max(pad+1,w-pad), bottom=Math.max(pad+1,h-pad);
          var rw=right-left, rh=bottom-top, perimeter=2*(rw+rh);
          stars.forEach(function(star,i){
            // Main star leads; following stars trail behind at evenly spaced intervals.
            var distance=((now-start)*speed*perimeter - i*(perimeter*0.026))%perimeter;
            if(distance<0) distance+=perimeter;
            var x,y,d=distance;
            if(d<rw){x=left+d;y=top;}
            else if((d-=rw)<rh){x=right;y=top+d;}
            else if((d-=rh)<rw){x=right-d;y=bottom;}
            else {d-=rw;x=left;y=bottom-d;}
            star.style.left=x+'px'; star.style.top=y+'px';
          });
        }
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initCardStarTrain);
  else initCardStarTrain();
  window.addEventListener('resize',initCardStarTrain);
})();
