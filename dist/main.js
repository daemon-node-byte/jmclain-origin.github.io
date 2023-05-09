"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
document.addEventListener("DOMContentLoaded", initListenerChain);
window.addEventListener("resize", () => {
    const navElement = document.getElementById("nav-links");
    applyClassForResponsiveNavbar(window.innerWidth);
    if (window.innerWidth >= 768 &&
        navElement &&
        navElement.classList.contains("is-open"))
        navElement.classList.remove("is-open");
});
function initListenerChain() {
    const emailForm = document.getElementById("email-form");
    const emailInput = document.getElementById("email-input");
    emailInput.addEventListener("input", toggleEmailSubmitButton);
    emailForm.addEventListener("submit", handleEmailFormSubmission);
    applyClassForResponsiveNavbar(window.innerWidth);
}
function applyClassForResponsiveNavbar(viewportWidth) {
    const navLinks = document.getElementById("nav-links");
    if (viewportWidth < 768) {
        navLinks.classList.remove("desktop");
        navLinks.classList.add("mobile");
    }
    else {
        navLinks.classList.remove("mobile");
        navLinks.classList.add("desktop");
    }
}
function toggleEmailSubmitButton() {
    document.getElementById("email-submit-btn").disabled =
        !EMAIL_REGEX.test(this.value);
    this.removeEventListener("input", toggleEmailSubmitButton);
}
function handleEmailFormSubmission(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const email = formData.get("email");
    (() => __awaiter(this, void 0, void 0, function* () {
        try {
            // const response = await fetch(`/api/:pathToEndpoint?email=${email}`, { ...body })
            // TODO: replace line below with a fetch like above when API is available
            const response = yield validateEmail(email);
            localStorage.setItem("email", email);
            if (!response) {
                localStorage.setItem("new_applicant", "true");
                this.classList.remove("border-b-0");
                document.getElementById("email-submit-btn").disabled = true;
                document.getElementById("email-prompt").classList.add("hidden");
                const radioForm = document.getElementById("radio-form");
                radioForm.style.opacity = "0";
                radioForm.classList.remove("hidden");
                radioForm.animate([{ opacity: "0" }, { opacity: "1" }], {
                    duration: 600,
                    fill: "forwards",
                    iterations: 1,
                });
                radioForm.addEventListener("input", toggleContinueButton);
                radioForm.addEventListener("submit", handleProgramFormSubmission);
            }
            else {
                localStorage.setItem("new_applicant", "false");
                document.getElementById("is-registered-prompt").classList.remove("hidden");
                document.getElementById("email-submit-btn").classList.add("hidden");
                document.getElementById("email-prompt").classList.add("hidden");
                document.getElementById("email-input").className =
                    document.getElementById("email-input")
                        .className + "-confirmed";
                document.getElementById("email-input").disabled =
                    true;
                document.getElementById("email-form").style.paddingBottom = "0";
            }
        }
        catch (error) {
            console.log(error);
            alert(error);
            throw new Error(error);
        }
    }))();
}
function toggleContinueButton() {
    const inputElements = this.elements;
    document.getElementById("radio-submit-btn").disabled =
        !hasRadioCollectionSelectedValue(inputElements.programForm);
}
function handleProgramFormSubmission(event) {
    event.preventDefault();
    const formData = new FormData(this);
    (() => __awaiter(this, void 0, void 0, function* () {
        const proceed = yield confirmPrompt(`proceed with data submitted? \n formData.entries \n ${JSON.stringify(formData.entries())}`);
        if (proceed) {
            // redirect to the next step ?
            window.location.reload();
        }
    }))();
}
function handleLoginRedirect() {
    return __awaiter(this, void 0, void 0, function* () {
        const confirm = yield confirmPrompt(`Do you want to go to login page?\n${localStorage.getItem("email")}`);
        if (confirm) {
            localStorage.clear();
            window.location.href = "/";
        }
    });
}
function validateEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (EMAIL_REGEX.test(email)) {
                resolve(/@asu\.edu$/i.test(email));
            }
            else {
                reject("invalid email");
            }
        });
    });
}
function confirmPrompt(confirmationPrompt) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, _reject) => __awaiter(this, void 0, void 0, function* () {
            const [value] = yield Promise.all([window.confirm(confirmationPrompt)]);
            return resolve(value);
        }));
    });
}
function hasRadioCollectionSelectedValue(radioCollection) {
    // @ts-ignore
    for (let { checked } of radioCollection) {
        if (checked) {
            return true;
        }
    }
    return false;
}
function toggleMobileNav() {
    const navLinksParent = document.getElementById("nav-links");
    const mobileMenuImg = document.getElementById("mobile-menu-img");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    if (navLinksParent) {
        if (navLinksParent.classList.contains("is-open")) {
            mobileMenuImg.src = "./public/image/hamburger%20menu%20icon.svg";
            navLinksParent.classList.remove("is-open");
            mobileMenuBtn.classList.remove("open");
        }
        else {
            mobileMenuImg.src = "./public/image/times-solid.svg";
            navLinksParent.classList.add("is-open");
            mobileMenuBtn.classList.add("open");
        }
    }
}
