import './styles/index.scss';

const mail = document.getElementById('mail');
const fio = document.getElementById('fio');
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const agreement = document.getElementById("agreement");
const form = document.getElementById("form");
const message = document.getElementById("message")

form.addEventListener("submit", (e)  => {
    e.preventDefault()

    if(validateFields()) {
        //form.submit()
        form.classList.add("display-none")
        message.classList.remove("display-none")

        localStorage.setItem("mail", mail.value)
        localStorage.setItem("password", password.value)
        localStorage.setItem("fio", fio.value)
    }
})
const setError = (element, message) => {
    const inpurControl = element.parentElement
    const errorDisplay = inpurControl.querySelector(".form__error")

    errorDisplay.innerText = message

    if(element.attributes.getNamedItem("for")?.value !== "agreement") {
        element.classList.add("form__field_error")
    }
}

const setSuccess = (element) => {
    const inpurControl = element.parentElement
    const errorDisplay = inpurControl.querySelector(".form__error")

    errorDisplay.innerText = ""
    element.classList.remove("form__field_error")
}

const validateFields = () => {
    const mailValue = mail.value.trim();
    const fioValue = fio.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    const agreementValue = agreement.checked;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*[0-9@\-:])(?=.*[@\-:]).{8,}$/;
    let result = true;

    //Проверка почты
        /* Хорошей идеей было бы вынести эт и проверки по функциям. Например passwordValue.length < N можно вынести в функцию isMaxLengthValid или passwordValue === "" вынести в isFieldFilled и тп. */
    /* Так же можно забить функцию на несколько маленьких функций которые будут проверять конкретное поле, так код будет проще читать и тестировать в случае чего*/
    if (mailValue === "") {
        setError(mail, "Поле не должно быть пустым")
        result = false;
    }
    else if (mailValue.length > 100) {
        setError(mail, "Длина почты не может привышать 100 символов")
        result = false;
    } else {
        setSuccess(mail)
    }

    //Проверка ФИО
    if(fioValue === "") {
        setError(fio, "Поле не должно быть пустым")
        result = false;
    } else {
        setSuccess(fio)
    }

    //Проверка пароля
    if(passwordValue === "") {
        setError(password, "Поле не должно быть пустым")
        result = false;
    } else if(passwordValue.length < 8) {
        setError(password, "Пароль должен быть больше 8 символов")
        result = false;
    } else if(passwordValue.length > 30) {
        setError(password, "Пароль должен быть меньше 30 символов")
        result = false;
    } else if(!passwordPattern.test(passwordValue)) {
        setError(password, "В пароле должен быть как минимум 1 не буквенный символ (либо цифра, либо “@”, “-”, “:” и тп)")
        result = false;
    } else {
        setSuccess(password)
    }

    //Проверка подтверждения пароля
    if(confirmPasswordValue === "") {
        setError(confirmPassword, "Поле не должно быть пустым")
        result = false;
    } else if(confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, "Пароли должны совпадать")
        result = false;
    } else {
        setSuccess(confirmPassword)
    }

    //Проверка соглашения
    if (agreementValue === false) {
        setError(agreement.parentElement, "Вы обязаны подтвердить, что хотите зарегистрироваться")
        result = false;
    } else {
        setSuccess(agreement.parentElement)
    }

    return result
}
