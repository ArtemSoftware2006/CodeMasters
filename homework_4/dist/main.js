/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://homework_4/./src/styles/index.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ \"./src/styles/index.scss\");\n\n\nconst mail = document.getElementById('mail');\nconst fio = document.getElementById('fio');\nconst password = document.getElementById(\"password\");\nconst confirmPassword = document.getElementById(\"confirmPassword\");\nconst agreement = document.getElementById(\"agreement\");\nconst form = document.getElementById(\"form\");\nconst message = document.getElementById(\"message\")\n\nform.addEventListener(\"submit\", (e)  => {\n    e.preventDefault()\n\n    if(validateFields()) {\n        //form.submit()\n        form.classList.add(\"display-none\")\n        message.classList.remove(\"display-none\")\n\n        localStorage.setItem(\"mail\", mail.value)\n        localStorage.setItem(\"password\", password.value)\n        localStorage.setItem(\"fio\", fio.value)\n    }\n})\nconst setError = (element, message) => {\n    const inpurControl = element.parentElement\n    const errorDisplay = inpurControl.querySelector(\".form__error\")\n\n    errorDisplay.innerText = message\n\n    if(element.attributes.getNamedItem(\"for\")?.value !== \"agreement\") {\n        element.classList.add(\"form__field_error\")\n    }\n}\n\nconst setSuccess = (element) => {\n    const inpurControl = element.parentElement\n    const errorDisplay = inpurControl.querySelector(\".form__error\")\n\n    errorDisplay.innerText = \"\"\n    element.classList.remove(\"form__field_error\")\n}\n\nconst validateFields = () => {\n    const mailValue = mail.value.trim();\n    const fioValue = fio.value.trim();\n    const passwordValue = password.value.trim();\n    const confirmPasswordValue = confirmPassword.value.trim();\n    const agreementValue = agreement.checked;\n    const passwordPattern = /^(?=.*[A-Za-z])(?=.*[0-9@\\-:])(?=.*[@\\-:]).{8,}$/;\n    let result = true;\n\n    //Проверка почты\n    if (mailValue === \"\") {\n        setError(mail, \"Поле не должно быть пустым\")\n        result = false;\n    }\n    else if (mailValue.length > 100) {\n        setError(mail, \"Длина почты не может привышать 100 символов\")\n        result = false;\n    } else {\n        setSuccess(mail)\n    }\n\n    //Проверка ФИО\n    if(fioValue === \"\") {\n        setError(fio, \"Поле не должно быть пустым\")\n        result = false;\n    } else {\n        setSuccess(fio)\n    }\n\n    //Проверка пароля\n    if(passwordValue === \"\") {\n        setError(password, \"Поле не должно быть пустым\")\n        result = false;\n    } else if(passwordValue.length < 8) {\n        setError(password, \"Пароль должен быть больше 8 символов\")\n        result = false;\n    } else if(passwordValue.length > 30) {\n        setError(password, \"Пароль должен быть меньше 30 символов\")\n        result = false;\n    } else if(!passwordPattern.test(passwordValue)) {\n        setError(password, \"В пароле должен быть как минимум 1 не буквенный символ (либо цифра, либо “@”, “-”, “:” и тп)\")\n        result = false;\n    } else {\n        setSuccess(password)\n    }\n\n    //Проверка подтверждения пароля\n    if(confirmPasswordValue === \"\") {\n        setError(confirmPassword, \"Поле не должно быть пустым\")\n        result = false;\n    } else if(confirmPasswordValue !== passwordValue) {\n        setError(confirmPassword, \"Пароли должны совпадать\")\n        result = false;\n    } else {\n        setSuccess(confirmPassword)\n    }\n\n    //Проверка соглашения\n    if (agreementValue === false) {\n        setError(agreement.parentElement, \"Вы обязаны подтвердить, что хотите зарегистрироваться\")\n        result = false;\n    } else {\n        setSuccess(agreement.parentElement)\n    }\n\n    return result\n}\n\n//# sourceURL=webpack://homework_4/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;