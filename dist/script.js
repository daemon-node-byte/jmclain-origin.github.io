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
function hideEmailConfirmationView(input, button, promptEle) {
    input.className = input.className + '-confirmed';
    input.disabled = true;
    button.classList.add('hidden');
    promptEle.classList.add('hidden');
}
function showLoginView(container) {
    container.classList.remove('hidden');
}
function showValidAuthView(input, inputBtn, emailForm, radioForm, prompt) {
    input.className = input.className.replace('-confirmed', '');
    inputBtn.classList.remove('hidden');
    emailForm.classList.remove('border-b-0');
    radioForm.classList.remove('hidden');
    prompt.classList.add('hidden');
    // const radioBtn = document.getElementById('radio-submit-btn') as HTMLButtonElement;
}
function loginAction() {
    return __awaiter(this, void 0, void 0, function* () {
        const loginEmail = localStorage.getItem('userEmail');
        const proceed = yield confirmAuthWithEmail(loginEmail);
        if (!proceed)
            return;
        else {
            const emailButton = document.getElementById('email-submit-btn');
            const emailFormElement = document.getElementById('email-form');
            const emailInputElement = document.getElementById('email-input');
            const radioFormElement = document.getElementById('radio-form');
            const promptConfirmLogin = document.getElementById('is-registered-prompt');
            emailInputElement.className = emailInputElement.className.replace('-confirmed', '');
            emailButton.classList.remove('hidden');
            emailFormElement.classList.remove('border-b-0');
            radioFormElement.classList.remove('hidden');
            promptConfirmLogin.classList.add('hidden');
        }
    });
}
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed', event);
    // page elements
    const emailInputElement = document.getElementById('email-input');
    const emailFormElement = document.getElementById('email-form');
    const emailButton = document.getElementById('email-submit-btn');
    const emailPrompt = document.getElementById('email-prompt');
    const promptConfirmLogin = document.getElementById('is-registered-prompt');
    const radioFormElement = document.getElementById('radio-form');
    // event listeners for UX flow
    emailInputElement.addEventListener('input', function (_event) {
        const btnElement = document.getElementById('email-submit-btn');
        btnElement.disabled = this.value.length <= 0;
    });
    emailFormElement.addEventListener('submit', function (event) {
        event.preventDefault();
        localStorage.setItem('userEmail', emailInputElement.value);
        // redirect to login page (update DOM UI)
        hideEmailConfirmationView(emailInputElement, emailButton, emailPrompt);
        showLoginView(promptConfirmLogin);
    });
});
// mocking Authentication API service using window prompts
function confirmAuthWithEmail(email) {
    return new Promise((resolve, reject) => {
        const confirmed = window.confirm(`login as ${email}?`);
        return confirmed ? resolve(true) : reject(false);
    });
}
