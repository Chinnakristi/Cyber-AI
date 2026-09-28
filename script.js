/* =====================================================
   CYBER.AI
   INTERACTIONS
===================================================== */


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;


if (cursor && follower) {

    window.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

    });


    function animateFollower() {

        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;

        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(animateFollower);
    }

    animateFollower();


    const hoverElements = document.querySelectorAll(
        "a, button, .system-node, .workflow-card, .tech-item"
    );


    hoverElements.forEach(element => {

        element.addEventListener("mouseenter", () => {

            follower.style.width = "50px";
            follower.style.height = "50px";
            follower.style.borderColor = "rgba(118,243,178,.8)";

        });


        element.addEventListener("mouseleave", () => {

            follower.style.width = "32px";
            follower.style.height = "32px";
            follower.style.borderColor = "rgba(118,243,178,.45)";

        });

    });

}


/* =====================================================
   NAVBAR
===================================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.querySelector(".nav-links");


if (mobileMenu) {

    mobileMenu.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-open");

        document.body.classList.toggle("no-scroll");

    });

}


/* Close menu after navigation */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("mobile-open");

        document.body.classList.remove("no-scroll");

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");


function updateNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateNavigation
);

updateNavigation();


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealItems = document.querySelectorAll(
    ".problem-row, " +
    ".system-node, " +
    ".workflow-card, " +
    ".console-row, " +
    ".formula-item, " +
    ".tech-item, " +
    ".response-item"
);


revealItems.forEach(item => {

    item.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                entry.target.classList.add(
                    "visible"
                );


                observer.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.12
        }

    );


revealItems.forEach(item => {

    revealObserver.observe(item);

});


/* =====================================================
   STAGGERED REVEAL
===================================================== */

const revealGroups = document.querySelectorAll(
    ".system-visual, .workflow-list, .tech-list"
);


revealGroups.forEach(group => {

    const children =
        group.querySelectorAll(".reveal");

    children.forEach((child, index) => {

        child.style.transitionDelay =
            `${index * 70}ms`;

    });

});


/* =====================================================
   RISK SCORE ANIMATION
===================================================== */

const riskNumber =
    document.getElementById("riskNumber");


let riskAnimated = false;


function animateRiskScore() {

    if (riskAnimated || !riskNumber) {
        return;
    }

    riskAnimated = true;


    const target = 87;

    let current = 0;

    const duration = 1500;

    const start =
        performance.now();


    function update(time) {

        const elapsed =
            time - start;

        const progress =
            Math.min(elapsed / duration, 1);

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );

        current =
            Math.floor(target * eased);

        riskNumber.textContent =
            current;


        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }


    requestAnimationFrame(update);

}


const riskSection =
    document.querySelector(".risk-section");


if (riskSection) {

    const riskObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateRiskScore();

                        riskObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.4
            }

        );


    riskObserver.observe(riskSection);

}


/* =====================================================
   DASHBOARD KPI COUNTERS
===================================================== */

const kpis =
    document.querySelectorAll(
        ".dash-kpi strong"
    );


let countersStarted = false;


function startCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;


    kpis.forEach(element => {

        const original =
            element.textContent.trim();


        if (original === "24") {

            animateNumber(
                element,
                24,
                ""
            );

        }


        else if (original === "07") {

            animateNumber(
                element,
                7,
                "07"
            );

        }


        else if (original === "94.8%") {

            animateDecimal(
                element,
                94.8,
                "%"
            );

        }

    });

}


function animateNumber(
    element,
    target,
    mode
) {

    let current = 0;

    const duration = 1000;

    const start =
        performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - start) /
                duration,
                1
            );

        current =
            Math.floor(
                target *
                (1 -
                    Math.pow(
                        1 - progress,
                        3
                    ))
            );


        if (mode === "07") {

            element.textContent =
                String(current)
                    .padStart(2, "0");

        } else {

            element.textContent =
                current;

        }


        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }


    requestAnimationFrame(update);

}


function animateDecimal(
    element,
    target,
    suffix
) {

    let current = 0;

    const duration = 1200;

    const start =
        performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - start) /
                duration,
                1
            );

        current =
            target *
            (1 -
                Math.pow(
                    1 - progress,
                    3
                ));


        element.textContent =
            current.toFixed(1) +
            suffix;


        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }


    requestAnimationFrame(update);

}


const dashboardSection =
    document.querySelector(
        ".dashboard-section"
    );


if (dashboardSection) {

    const dashboardObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        startCounters();

                        dashboardObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.25
            }

        );


    dashboardObserver.observe(
        dashboardSection
    );

}


/* =====================================================
   AI CONSOLE BAR ANIMATION
===================================================== */

const consoleBars =
    document.querySelectorAll(
        ".console-bar i"
    );


const consoleSection =
    document.querySelector(
        ".intelligence"
    );


if (consoleSection) {

    const consoleObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    consoleBars.forEach(
                        (bar, index) => {

                            const finalWidth =
                                bar.style.width;

                            bar.style.width =
                                "0";


                            setTimeout(() => {

                                bar.style.width =
                                    finalWidth;

                            }, index * 120);

                        }
                    );


                    consoleObserver.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.3
            }

        );


    consoleObserver.observe(
        consoleSection
    );

}


/* =====================================================
   SYSTEM NODE ACTIVE EFFECT
===================================================== */

const systemNodes =
    document.querySelectorAll(
        ".system-node"
    );


systemNodes.forEach(node => {

    node.addEventListener(
        "mouseenter",
        () => {

            systemNodes.forEach(
                other => {

                    if (other !== node) {

                        other.style.opacity =
                            "0.45";

                    }

                }
            );

        }
    );


    node.addEventListener(
        "mouseleave",
        () => {

            systemNodes.forEach(
                other => {

                    other.style.opacity =
                        "1";

                }

            );

        }
    );

});


/* =====================================================
   PARALLAX HERO
===================================================== */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


if (heroVisual) {

    window.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <
                850
            ) {
                return;
            }


            const x =
                (event.clientX /
                    window.innerWidth -
                    .5) *
                10;


            const y =
                (event.clientY /
                    window.innerHeight -
                    .5) *
                10;


            heroVisual.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);