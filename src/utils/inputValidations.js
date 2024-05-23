
export const name_validation = {
    name: 'name',
    label: 'name',
    type: 'text',
    id: 'name',
    placeholder: 'ФИО',
    validation: {
      required: {
        value: true,
        message: 'Заполните поле',
      },
      maxLength: {
        value: 30,
        message: 'Максимум 30 знаков',
      },
    },
  }
  
  
  export const password_validation = {
    name: 'password',
    label: 'password',
    type: 'password',
    id: 'password',
    placeholder: 'Пароль',
    validation: {
      required: {
        value: true,
        message: 'Заполните поле',
      },
      minLength: {
        value: 6,
        message: 'Минимум 6 символов',
      },
    },
  }
  
  export const email_validation = {
    name: 'email',
    label: 'email address',
    type: 'email',
    id: 'email',
    placeholder: 'Почта',
    validation: {
      required: {
        value: true,
        message: 'Заполните поле',
      },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'not valid',
      },
    },
  }