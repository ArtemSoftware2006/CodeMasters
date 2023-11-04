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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ \"./src/styles/index.scss\");\n\r\n\r\nconst mail = document.getElementById('mail');\r\nconst fio = document.getElementById('fio');\r\nconst password = document.getElementById(\"password\");\r\nconst confirmPassword = document.getElementById(\"confirmPassword\");\r\nconst agreement = document.getElementById(\"agreement\");\r\nconst form = document.getElementById(\"form\");\r\nconst message = document.getElementById(\"message\")\r\n\r\nform.addEventListener(\"submit\", (e)  => {\r\n    e.preventDefault()\r\n\r\n    if(validateFields()) {\r\n        //form.submit()\r\n        form.classList.add(\"display-none\")\r\n        message.classList.remove(\"display-none\")\r\n\r\n        localStorage.setItem(\"mail\", mail.value)\r\n        localStorage.setItem(\"password\", password.value)\r\n        localStorage.setItem(\"fio\", fio.value)\r\n    }\r\n})\r\nconst setError = (element, message) => {\r\n    const inpurControl = element.parentElement\r\n    const errorDisplay = inpurControl.querySelector(\".form__error\")\r\n\r\n    errorDisplay.innerText = message\r\n\r\n    if(element.attributes.getNamedItem(\"for\")?.value !== \"agreement\") {\r\n        element.classList.add(\"form__field_error\")\r\n    }\r\n}\r\n\r\nconst setSuccess = (element) => {\r\n    const inpurControl = element.parentElement\r\n    const errorDisplay = inpurControl.querySelector(\".form__error\")\r\n\r\n    errorDisplay.innerText = \"\"\r\n    element.classList.remove(\"form__field_error\")\r\n}\r\n\r\nconst validateFields = () => {\r\n    const mailValue = mail.value.trim();\r\n    const fioValue = fio.value.trim();\r\n    const passwordValue = password.value.trim();\r\n    const confirmPasswordValue = confirmPassword.value.trim();\r\n    const agreementValue = agreement.checked;\r\n    const passwordPattern = /^(?=.*[A-Za-z])(?=.*[0-9@\\-:])(?=.*[@\\-:]).{8,}$/;\r\n    let result = true;\r\n\r\n    //Проверка почты\r\n    if (mailValue === \"\") {\r\n        setError(mail, \"Поле не должно быть пустым\")\r\n        result = false;\r\n    }\r\n    else if (mailValue.length > 100) {\r\n        setError(mail, \"Длина почты не может привышать 100 символов\")\r\n        result = false;\r\n    } else {\r\n        setSuccess(mail)\r\n    }\r\n\r\n    //Проверка ФИО\r\n    if(fioValue === \"\") {\r\n        setError(fio, \"Поле не должно быть пустым\")\r\n        result = false;\r\n    } else {\r\n        setSuccess(fio)\r\n    }\r\n\r\n    //Проверка пароля\r\n    if(passwordValue === \"\") {\r\n        setError(password, \"Поле не должно быть пустым\")\r\n        result = false;\r\n    } else if(passwordValue.length < 8) {\r\n        setError(password, \"Пароль должен быть больше 8 символов\")\r\n        result = false;\r\n    } else if(passwordValue.length > 30) {\r\n        setError(password, \"Пароль должен быть меньше 30 символов\")\r\n        result = false;\r\n    } else if(!passwordPattern.test(passwordValue)) {\r\n        setError(password, \"В пароле должен быть как минимум 1 не буквенный символ (либо цифра, либо “@”, “-”, “:” и тп)\")\r\n        result = false;\r\n    } else {\r\n        setSuccess(password)\r\n    }\r\n\r\n    //Проверка подтверждения пароля\r\n    if(confirmPasswordValue === \"\") {\r\n        setError(confirmPassword, \"Поле не должно быть пустым\")\r\n        result = false;\r\n    } else if(confirmPasswordValue !== passwordValue) {\r\n        setError(confirmPassword, \"Пароли должны совпадать\")\r\n        result = false;\r\n    } else {\r\n        setSuccess(confirmPassword)\r\n    }\r\n\r\n    //Проверка соглашения\r\n    if (agreementValue === false) {\r\n        setError(agreement.parentElement, \"Вы обязаны подтвердить, что хотите зарегистрироваться\")\r\n        result = false;\r\n    } else {\r\n        setSuccess(agreement.parentElement)\r\n    }\r\n\r\n    return result\r\n}\n\n//# sourceURL=webpack://homework_4/./src/index.js?");

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