import * as data from "../helpers/default_data.json"
import * as result from "../locators/result_page.json"
import * as recovery from "../locators/recovery_password_page.json"
import * as main from "../locators/main_page.json"


describe('Автотесты на форму логина и пароля', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/') // Заходим на сайт
    });

    afterEach('Конец теста', function () {
        cy.get(result.close).should('be.visible'); // Наличие кнопки крестик и что он виден пользователю 
    });

    it('Верный логин и пароль', function () {
         
         cy.get(main.email).type(data.login); // Вводим правильный логин
         cy.get(main.password).type(data.password); // Вводим правильный пароль
         cy.get(main.login_button).click(); // Находим и нажимаем конопку "Войти"
         cy.get(result.message).contains('Авторизация прошла успешно'); // Находим нужный текст 
         cy.get(result.message).should('be.visible'); // Текст виден пользователю

     })

     it('Востановление пароля', function () {

        cy.get(main.fogot_pass_btn).click(); // Находим и нажимаем конопку "Забыли пароль"
        cy.get(recovery.close).should('be.visible'); // Наличие кнопки крестик на стр. "Восст. пароль" и что он виден пользователю 
        cy.get(recovery.email).type(data.login); // Вводим верный логин
        cy.get(recovery.send_button).click(); // Находим и нажимаем кнопку "Отправить код"
        cy.get(result.message).contains('Успешно отправили пароль на e-mail'); // Находим нужный текст 
        cy.get(result.message).should('be.visible'); // Текст виден пользователю

    })

    it('Верный логин и неверный пароль', function () {

        cy.get(main.email).type(data.login); // Вводим верный логин
        cy.get(main.password).type(data.wrong_password); // Вводим неверный пароль
        cy.get(main.login_button).click(); // Находим и нажимаем конопку "Войти"
        cy.get(result.message).contains('Такого логина или пароля нет'); // Находим нужный текст 
        cy.get(result.message).should('be.visible'); // Текст виден пользователю

    })

    it('Неверный логин и верный пароль', function () {

        cy.get(main.email).type(data.wrong_login); // Вводим неверный логин
        cy.get(main.password).type(data.password); // Вводим верный пароль
        cy.get(main.login_button).click(); // Находим и нажимаем конопку "Войти"
        cy.get(result.message).contains('Такого логина или пароля нет'); // Находим нужный текст 
        cy.get(result.message).should('be.visible'); // Текст виден пользователю

    })

    it('Ошибка валидации, в логине нет @', function () {

        cy.get(main.email).type(data.no_dog); // Вводим логин без @
        cy.get(main.password).type(data.password); // Вводим верный пароль
        cy.get(main.login_button).click(); // Находим и нажимаем конопку "Войти"
        cy.get(result.message).contains('Нужно исправить проблему валидации'); // Находим нужный текст 
        cy.get(result.message).should('be.visible'); // Текст виден пользователю

    })

    it('Проверка на строчные буквы в логине', function () {

        cy.get(main.email).type(data.uppercase_login); // Вводим логин c заглавными буквами
        cy.get(main.password).type(data.password); // Вводим верный пароль
        cy.get(main.login_button).click(); // Находим и нажимаем конопку "Войти"
        cy.get(result.message).contains('Авторизация прошла успешно'); // Находим нужный текст 
        cy.get(result.message).should('be.visible'); // Текст виден пользователю

    })
 }) 

