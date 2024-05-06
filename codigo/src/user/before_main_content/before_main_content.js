const createNewUserForm = () => {
    return `
    <div class="container pt-4 create-user-form-area">
        <form class="create-user-form">
            <div class="row justify-content-center">
                <div class="col-10 create-user-form-email-area">
                    <div class="label-tooltip-form">
                        <label for="create-user-form-email" class="label-form-email" style="font-weight: 700;">E-mail<span class="error-message">*</span></label>
                    </div>
                    <input type="text" class="form-control" id="create-user-form-email" aria-describedby="emailHelp" onclick="resetFormField('create-user-form-email-helper', 'error-message', 'Pode ficar tranquilo, seus dados são nossa prioridade!', this, 'is-invalid')">
                    <div id="create-user-form-email-helper" class="form-text">Pode ficar tranquilo, seus dados são nossa prioridade!</div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-10 create-user-form-name-area">
                    <div class="label-tooltip-form">
                        <label for="create-user-form-name" class="label-form-name" style="font-weight: 700;">Seu nome<span class="error-message">*</span></label>
                    </div>
                    <input type="text" class="form-control" id="create-user-form-name" aria-describedby="emailHelp" onclick="resetFormField('create-user-form-name-helper', 'error-message', '\u00A0', this, 'is-invalid')">
                    <div id="create-user-form-name-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-10 create-form-form-password-area">
                    <label for="create-user-form-password-one" class="label-form-password" style="font-weight: 700;">Sua senha<span class="error-message">*</span></label>
                    <input type="password" class="form-control" id="create-user-form-password-one" aria-describedby="passwordHelp" onclick="resetFormField('create-user-form-password-one-helper', 'error-message', '\u00A0', this, 'is-invalid')">
                    <div id="create-user-form-password-one-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-10 create-form-form-password-area">
                    <label for="create-user-form-password-two" class="label-form-password" style="font-weight: 700;">Valida ai!<span class="error-message">*</span></label>
                    <input type="password" class="form-control" id="create-user-form-password-two" aria-describedby="passwordHelp" onclick="resetFormField('create-user-form-password-two-helper', 'error-message', 'Lembrando a senha tem que ser igual a anterior!', this, 'is-invalid')">
                    <div id="create-user-form-password-two-helper" class="form-text">Lembrando a senha tem que ser igual a anterior!</div>
                </div>
            </div>
            <div class="row pt-4 justify-content-center">
                <div class="col-sm-5 new-user-button">
                    <button type="button" class="btn create-new-user" onclick="createNewUser()" style="font-weight: 700;">Criar</button>
                </div>
                <div class="col-sm-5 mb-4 back-to-login-button">
                    <button type="button" class="btn" onclick="showLoginUserForm()" style="font-weight: 700;">Tem conta?</button>
                </div>
            </div>
        </form>
    </div>
    `;
};

const loginUserForm = () => {
    
    return  `
    <div class="container pt-4 login-user-form-area">
        <form class="login-user-form">
            <div class="row justify-content-center">
                <div class="col-10 login-user-form-email-area">
                    <div class="label-tooltip-form">
                        <label for="login-user-form-email" class="label-form-email" style="font-weight: 700;">E-mail<span class="error-message">*</span></label>
                    </div>
                    <input type="text" class="form-control" id="login-user-form-email" aria-describedby="emailHelp" onclick="resetFormField('login-user-form-email-helper', 'error-message', '\u00A0')">
                    <div id="login-user-form-email-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-10 login-form-form-password-area">
                    <label for="login-user-form-password" class="label-form-password" style="font-weight: 700;">Sua senha<span class="error-message">*</span></label>
                    <input type="password" class="form-control" id="login-user-form-password" aria-describedby="passwordHelp" onclick="resetFormField('login-user-form-password-helper', 'error-message', '\u00A0')">
                    <div id="login-user-form-password-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row pt-4 justify-content-center">
                <div class="col-10">
                    <button type="button" class="btn" onclick="loginUser()" style="font-weight: 700;">Login</button>
                </div>
            </div>
        </form>
    </div>
    <div class="row">
        <div class="col-12 d-flex justify-content-center align-items-end does-not-have-account">
            <p>Não tem conta??? <a class="go-to-crete" onclick="showCreateUserForm()">Clica Aqui!</a></p>
        </div>
    </div>
    `;
};

const showCreateUserForm = () => {
    const before_main_content_title = document.getElementsByClassName("before-main-content-title")[0];
    before_main_content_title.innerText = "Novo Usuário";
    const before_main_content_area = document.getElementsByClassName("before-main-content-area")[0];
    before_main_content_area.innerHTML = createNewUserForm();
};

const showLoginUserForm = () => {
    const before_main_content_title = document.getElementsByClassName("before-main-content-title")[0];
    before_main_content_title.innerText = "Login";
    const before_main_content_area = document.getElementsByClassName("before-main-content-area")[0];
    before_main_content_area.innerHTML = loginUserForm();
};