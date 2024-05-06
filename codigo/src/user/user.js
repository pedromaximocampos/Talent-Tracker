class Helper {
    toJson() {
        const {...obj} = this;
        return obj;
    };
};
class User extends Helper {
    constructor(id, email, name, password) {
        super();
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.photo = null;
        this.phone = {
            is_whatsapp: false,
            number: null
        };
        this.is_provider = false;
        this.is_admin = false;
        this.is_gold = false;
        this.provider_profile = null;
    };
};

const saveUser = (user) => {
    saveToLocalStorage(USER_DB, user);
};

const getUserById = (id) => {
    const users = getFromLocalStorage(USER_DB);

    const user = users.find(u => u.id == id);

    return user ? user : null;
};

const getUserByEmail = (email) => {

    const users = getFromLocalStorage(USER_DB);

    const user = users.find(u => u.email == email);

    return user === -1 ? null : user;
};

const createUserSession = (user) => {
    const user_session = getFromLocalStorage(USER_SESSION);
    if(!checkUserSessionObject(user_session)) {
        const session = {
            id: user.id,
            email: user.email
        };
        saveToLocalStorage(USER_SESSION, session);
        return true;
    };
    return false;
};

const createNewUser = () => {
    const email_dom = document.getElementById("create-user-form-email");
    const name_dom = document.getElementById("create-user-form-name");
    const pass_one_dom = document.getElementById("create-user-form-password-one");
    const pass_two_dom = document.getElementById("create-user-form-password-two");

    let cannot_create = false;

    if(!email_dom.value) {
        email_dom.classList.add("is-invalid");
        cannot_create = true;
    };

    if(!name_dom.value) {
        name_dom.classList.add("is-invalid");
        cannot_create = true;
    };

    if(!pass_one_dom.value) {
        pass_one_dom.classList.add("is-invalid");
        cannot_create = true;
    };

    if(!pass_two_dom.value) {
        pass_two_dom.classList.add("is-invalid");
        cannot_create = true;
    };
    
    if(cannot_create) { return null; };

    if(pass_one_dom.value !== pass_two_dom.value) {
        pass_one_dom.classList.add("is-invalid");
        pass_two_dom.classList.add("is-invalid");

        const pass_text_dom = document.getElementById("create-user-form-password-one-helper");
        pass_text_dom.innerText = "Senhas não são iguais!"
        pass_text_dom.classList.add("error-message");

        return null;
    };

    if(getUserByEmail(email_dom.value)) {
        email_dom.classList.add("is-invalid");
        const email_text_dom = document.getElementById("emailHelp");
        email_text_dom.innerText = "E-mail já cadastrado!";
        email_text_dom.classList.add("error-message");
        return null;
    };

    const meta_data = getFromLocalStorage(META_DATA);
    const new_user = new User(meta_data.last_id, email_dom.value, name_dom.value, pass_one_dom.value);
    
    if(new_user) {
        const users = getFromLocalStorage(USER_DB);
        users.push(new_user.toJson());
        saveToLocalStorage(USER_DB, users);
        updateMetaDataLastId();

        const app = document.getElementsByClassName("app")[0];
        showLoginUserForm();

        return new_user;
    };
};

const loginUser = () => {
    const login_user_form_email_dom = document.getElementById("login-user-form-email");
    const login_user_form_password_dom = document.getElementById("login-user-form-password");

    let can_continue = true;

    if(!login_user_form_email_dom.value) {
        const emailHelp = document.getElementById("login-user-form-email-helper");
        emailHelp.classList.add("error-message");
        emailHelp.innerText = "Campo E-mail não pode ficar vazio.";
        can_continue = false;
    };

    if(!login_user_form_password_dom.value) {
        const passwordHelp = document.getElementById("login-user-form-password-helper");
        passwordHelp.classList.add("error-message");
        passwordHelp.innerText = "Campo Password não pode ficar vazio.";
    };

    if(!can_continue) { return; };

    const users = getFromLocalStorage(USER_DB);

    const user = users.find((u) => u.email == login_user_form_email_dom.value);
    if(user == undefined) {        
        const emailHelp = document.getElementById("login-user-form-email-helper");
        emailHelp.classList.add("error-message");
        emailHelp.innerText = "Usuário não encontrado."
        return false;
    };

    if(user.password != login_user_form_password_dom.value) {
        const emailHelp = document.getElementById("login-user-form-password-helper");
        console.log(emailHelp)
        emailHelp.classList.add("error-message");
        emailHelp.innerText = "Senha invalida."
        return false;
    };
    
    createUserSession(user);
    showMainContent();

    return true;
};

const profilesForm = () => {
    return `
    <div class="container">
        <div class="row align-items-center main-profiles-area">
            <div class="col-sm-10 user-select-profile">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn" onclick="showProfileUserForm()">Usuário</button>
                    <button type="button" class="btn" onclick="showProfileProviderForm(false)">Prestador</button>
                </div>
            </div>
            <div class="col-sm-2 user-logout-profile">
                <button type="button" class="btn logout-button" onclick="logOutUser(false)" style="font-weight: 700;">Logout</button>
            </div>
        </div>
    </div>
    <div class="container profiles-area"></div>
    `;
};

const userProfileForm = () => {
    return `
    <div class="container pt-4 user-profile-form-area">
        <form>
            <div class="row">
                <div class="col-sm-12 user-profile-form-img">
                    <div class="user-profile-form-img-svg" id="user-profile-form-img-svg" style="display: none;">
                        <svg class="user-profile-form-img-svg-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C14.7614 18 17 15.7614 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13C7 15.7614 9.23858 18 12 18ZM12 16.0071C10.3392 16.0071 8.9929 14.6608 8.9929 13C8.9929 11.3392 10.3392 9.9929 12 9.9929C13.6608 9.9929 15.0071 11.3392 15.0071 13C15.0071 14.6608 13.6608 16.0071 12 16.0071Z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.56155 2C8.18495 2 6.985 2.93689 6.65112 4.27239L6.21922 6H4C2.34315 6 1 7.34315 1 9V19C1 20.6569 2.34315 22 4 22H20C21.6569 22 23 20.6569 23 19V9C23 7.34315 21.6569 6 20 6H17.7808L17.3489 4.27239C17.015 2.93689 15.8151 2 14.4384 2H9.56155ZM8.59141 4.75746C8.7027 4.3123 9.10268 4 9.56155 4H14.4384C14.8973 4 15.2973 4.3123 15.4086 4.75746L15.8405 6.48507C16.0631 7.37541 16.863 8 17.7808 8H20C20.5523 8 21 8.44772 21 9V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V9C3 8.44772 3.44772 8 4 8H6.21922C7.13696 8 7.93692 7.37541 8.15951 6.48507L8.59141 4.75746Z"></path>
                            </g>
                        </svg>
                    </div>
                    <img src="https://fastly.picsum.photos/id/616/400/400.jpg?hmac=Pq9Df_rY82owvzzbvzUvUqF2_OEAB7hOEEEbzPBhwcg" class="mx-auto d-block" id="user-profile-form-picture-img" alt="aaa" style="width: 200px; height: 200px; border-radius: 50%;">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-2 user-profile-form-id-area">
                    <label for="user-profile-form-id" class="label-form-id" style="font-weight: 700;">ID</label>
                    <input type="text" class="form-control" id="user-profile-form-id" aria-describedby="idHelp" disabled disabled>
                </div>
                <div class="col-sm-10 user-profile-form-email-area">
                    <div class="label-tooltip-form">
                        <label for="user-profile-form-email" class="label-form-email" style="font-weight: 700;">E-mail<span class="error-message required-field" style="display: none;">*</span></label>
                        ${serviceFormSvgInfo("Esse e-mail é utilizado para acessar a plataforma e também, caso não queira preencher, é utilizado nos formulários de Prestador ou Serviço.", "right")}
                    </div>
                    <input type="text" class="form-control" id="user-profile-form-email" aria-describedby="emailHelp" disabled>
                    <div id="user-profile-form-email-helper" class="form-text">Seu e-mail pessoal.</div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-6 user-profile-form-name-area">
                    <div class="label-tooltip-form">
                        <label for="user-profile-form-name" class="label-form-name" style="font-weight: 700;">Nome<span class="error-message required-field" style="display: none;">*</span></label>
                        ${serviceFormSvgInfo("Campo obrigatório. Seu perfil não pode ficar sem nome!", "right")}
                    </div>
                    <input type="text" class="form-control" id="user-profile-form-name" aria-describedby="emailHelp" disabled>
                    <div id="user-profile-form-name-helper" class="form-text">Seu nome de escolha.</div>
                </div>
                <div class="col-sm-6 user-profile-form-password-area">
                    <div class="label-tooltip-form">
                        <label for="user-profile-form-password" class="label-form-password" style="font-weight: 700;">Senha<span class="error-message required-field" style="display: none;">*</span></label>
                        ${serviceFormSvgInfo("Essa é sua senha para entrar na plataforma.", "right")}
                    </div>
                    <input type="password" class="form-control" id="user-profile-form-password" aria-describedby="priceHelp" disabled>
                    <div id="user-profile-form-password-helper" class="form-text">Sua senha pessoal.</div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-6 user-profile-form-phone-area">
                    <div class="label-tooltip-form">
                        <label for="user-profile-form-phone" class="label-form-phone" style="font-weight: 700;">Telefone</label>
                        ${serviceFormSvgInfo("Esse telefone é utilizado para caso não queira preencher nos formulários de Prestador ou Serviço, esse campo será utilizado.", "right")}
                    </div>
                    <input type="text" class="form-control" id="user-profile-form-phone" aria-describedby="phoneHelp" disabled>
                    <div id="user-profile-form-phone-helper" class="form-text">Telefone para entrar em contato.</div>
                </div>
                <div class="col-sm-6 d-flex justify-content-start align-items-center user-profile-form-whatsapp-area">
                    <input class="form-check-input" type="checkbox" value="" id="user-profile-whatsapp-phone" checked disabled disabled>
                    <div class="label-tooltip-form">
                        <label class="form-check-label" for="user-profile-whatsapp-phone" style="padding-left: 10px; style="font-weight: 700;"">Whatsapp?</label>
                    </div>
                </div>
            </div>
            <div class="row pt-4">
                <div class="col-sm-12 profile-edit-button" style="display: none;">
                    <button type="button" class="btn" onclick="showEditUserForm()" style="font-weight: 700;">Editar</button>
                </div>
                <div class="col-sm-12 profile-save-button" style="display: none;">
                    <button type="button" class="btn" onclick="editLoggedUser()" style="font-weight: 700;">Salvar</button>
                </div>
            </div>
        </form>
    </div>
    `;
};

const switchProfileEditButton = (edit) => {
    const profile_edit_button = document.getElementsByClassName("profile-edit-button")[0];
    if(profile_edit_button && edit) {
        profile_edit_button.style.display = "inline-block";
        return true;
    };

    profile_edit_button.style.display = "none";
    return false;

};

const switchProfileSaveButton = (edit) => {
    const profile_save_button = document.getElementsByClassName("profile-save-button")[0];
    if(profile_save_button && edit) {
        profile_save_button.style.display = "inline-block";
        return true;
    };

    profile_save_button.style.display = "none";
    return false;

};

const showProfileUserForm = () => {
    const user = getUserSession();
    const main_content_window_area = document.getElementsByClassName("main-content-window-area")[0];

    if(user && main_content_window_area) {
        main_content_window_area.innerHTML = profilesForm();

        const main_content_window_menu_title = document.getElementsByClassName("main-content-window-menu-title")[0];
        main_content_window_menu_title.textContent = "Perfil";

        const profiles_area = document.getElementsByClassName("profiles-area")[0];
        profiles_area.innerHTML = userProfileForm();

        switchProfileEditButton(true);
        switchProfileSaveButton(false);
        
        const profile_user_form_id_dom = document.getElementById("user-profile-form-id");
        const profile_user_form_email_dom = document.getElementById("user-profile-form-email");
        const profile_user_form_name_dom = document.getElementById("user-profile-form-name");
        const profile_user_form_password_dom = document.getElementById("user-profile-form-password");
        const profile_user_form_phone_dom = document.getElementById("user-profile-form-phone");
        const profile_user_form_whatsapp_phone_dom = document.getElementById("user-profile-whatsapp-phone");

        profile_user_form_id_dom.value = user.id;
        profile_user_form_email_dom.value = user.email;
        profile_user_form_name_dom.value = user.name;
        profile_user_form_password_dom.value = user.password;
        if(user.phone.number) {
            profile_user_form_phone_dom.removeAttribute("placeholder");
            profile_user_form_phone_dom.value = user.phone.number;
        } else {
            profile_user_form_phone_dom.setAttribute("placeholder", "Numero não cadastrado.")
        }
        profile_user_form_whatsapp_phone_dom.checked = user.phone.is_whatsapp;

        setUrlParameter("profile", "user");
        addToolTipCode();

        return true;
    };

    logOutUser(false);

    return false;
};

const showEditUserForm = () => {
    switchProfileEditButton(false);
    switchProfileSaveButton(true);
    switchProfileUserFormEdition(true);
};

const switchProfileUserFormEdition = (edit) => {

    const profile_user_form_email_dom = document.getElementById("user-profile-form-email");
    if(profile_user_form_email_dom) {
        if(edit) {
            profile_user_form_email_dom.removeAttribute("disabled");
        } else {
            profile_user_form_email_dom.setAttribute("disabled", "disabled");
        };
    };
    const profile_user_form_name_dom = document.getElementById("user-profile-form-name");
    if(profile_user_form_name_dom) {
        if(edit) {
            profile_user_form_name_dom.removeAttribute("disabled");
        } else {
            profile_user_form_name_dom.setAttribute("disabled", "disabled");
        };
    };
    const profile_user_form_password_dom = document.getElementById("user-profile-form-password");
    if(profile_user_form_password_dom) {
        if(edit) {
            profile_user_form_password_dom.removeAttribute("disabled");
        } else {
            profile_user_form_password_dom.setAttribute("disabled", "disabled");
        };
    };
    const profile_user_form_phone_dom = document.getElementById("user-profile-form-phone");
    if(profile_user_form_phone_dom) {
        if(edit) {
            profile_user_form_phone_dom.removeAttribute("disabled");
        } else {
            profile_user_form_phone_dom.setAttribute("disabled", "disabled");
        };
    };
    const profile_user_form_whatsapp_phone_dom = document.getElementById("user-profile-whatsapp-phone");
    if(profile_user_form_whatsapp_phone_dom) {
        if(edit) {
            profile_user_form_whatsapp_phone_dom.removeAttribute("disabled");
        } else {
            profile_user_form_whatsapp_phone_dom.setAttribute("disabled", "disabled");
        };
    };

    const required_field = document.getElementsByClassName("required-field");
    for(const item of required_field) {
        item.style.display = "inline-block";
    };
};

const editLoggedUser = () => {

    const users = getFromLocalStorage(USER_DB);
    const user_session = getUserSession();

    if(!users && !user_session) {
        logOutUser();
        return false;
    };

    const profile_user_form_email_dom = document.getElementById("user-profile-form-email");
    const profile_user_form_name_dom = document.getElementById("user-profile-form-name");
    const profile_user_form_password_dom = document.getElementById("user-profile-form-password");
    const profile_user_form_phone_dom = document.getElementById("user-profile-form-phone");
    const profile_user_form_whatsapp_phone_dom = document.getElementById("user-profile-whatsapp-phone");

    let cannot_update = false;

    if(!profile_user_form_email_dom.value) {
        const profile_user_form_email_helper = document.getElementById("profile-user-form-email-helper");
        profile_user_form_email_helper.textContent = "Email não pode ficar vazio."
        profile_user_form_email_helper.classList.add("error-message");
        cannot_update = true;
    };
    
    if(!profile_user_form_name_dom.value) {
        const profile_user_form_name_helper = document.getElementById("user-profile-form-name-helper");
        profile_user_form_name_helper.textContent = "Nome não pode ficar vazio."
        profile_user_form_name_helper.classList.add("error-message");
        cannot_update = true;
    };

    if(!profile_user_form_password_dom.value) {
        const profile_user_form_password_helper = document.getElementById("profile-user-form-password-helper");
        profile_user_form_password_helper.textContent = "Senha não pode ficar vazio."
        profile_user_form_password_helper.classList.add("error-message");
        cannot_update = true;
    };

    

    if(cannot_update) { return false; };

    const user_already_exist = users.some(u => u.email == profile_user_form_email_dom.value);
    if(user_already_exist && profile_user_form_email_dom.value != user_session.email) {
        const profile_user_form_email_helper = document.getElementsByClassName("profile-user-form-email-helper")[0];
        profile_user_form_email_helper.textContent = "Email já cadastrado!"
        profile_user_form_email_helper.classList.add("error-message");
        return false;
    };
    
    const user = user_session;
    user.email = profile_user_form_email_dom.value;
    user.name = profile_user_form_name_dom.value;
    user.password = profile_user_form_password_dom.value;

    if(user) {

        user.phone.number = profile_user_form_phone_dom.value ? profile_user_form_phone_dom.value : null;
        user.phone.is_whatsapp = profile_user_form_whatsapp_phone_dom.checked ? profile_user_form_whatsapp_phone_dom.checked : false;
        
        const current_user_index = users.findIndex(u => u.id == user.id);
        users[current_user_index] = user;

        saveToLocalStorage(USER_DB, users);
        saveToLocalStorage(USER_SESSION, user_session);

        switchProfileEditButton(true);
        switchProfileSaveButton(false);
        switchProfileUserFormEdition(false);
        showProfileUserForm();

        const required_field = document.getElementsByClassName("required-field");
        for(const item of required_field) {
            item.style.display = "none";
        };
    };

    return false;
};

const resetEditEmailField = () => {
    const profile_user_form_email_helper = document.getElementsByClassName("profile-user-form-email-helper")[0];
    if(profile_user_form_email_helper.classList.contains("error-message")) {
        profile_user_form_email_helper.textContent = "\u00A0"
        profile_user_form_email_helper.classList.remove("error-message");
        return true;
    };

    return false;
};

const resetEditNameField = () => {
    const profile_user_form_name_helper = document.getElementsByClassName("user-profile-form-name-helper")[0];
    if(profile_user_form_name_helper.classList.contains("error-message")) {
        profile_user_form_name_helper.textContent = "\u00A0"
        profile_user_form_name_helper.classList.remove("error-message");
        return true;
    };

    return false;
};

const resetEditPasswordField = () => {
    const profile_user_form_password_helper = document.getElementsByClassName("profile-user-form-password-helper")[0];
    if(profile_user_form_password_helper.classList.contains("error-message")) {
        profile_user_form_password_helper.textContent = "\u00A0"
        profile_user_form_password_helper.classList.remove("error-message");
        return true;
    };

    return false;
};

const logOutUser = (logout) => {

    if(!logout) {

        const main_content_window_area = document.getElementsByClassName("main-content-window-area")[0];
        main_content_window_area.innerHTML = `
        <div class="container logout-question">
            <div class="row">
                <div class="col-12 text-center want-to-delete" style="font-weight: 800; font-size: 1.2rem;">Deseja realmente sair?</div>
            </div>
            <div class="row pt-2 d-flex justify-content-center">
                <div class="col-1">
                    <button type="button" class="btn logout-button-yes" onclick="logOutUser(true)">Sim</button>
                </div>
                <div class="col-1">
                    <button type="button" class="btn logout-button-no" onclick="returnToProfile()">Não</button>
                </div>
            </div>
        </div>
        `;
        return false;
    };

    saveToLocalStorage(USER_SESSION, {});
    removeAllUrlParameters();
    const app = document.getElementsByClassName("app")[0];
    app.innerHTML = loginFormHTML();
    showLoginUserForm();
    return true;
};

const returnToProfile = () => {
    const url = new URL(location);

    let state = "user"
    url.searchParams.forEach(u => { if(u == "provider") { state = "provider"; }; });

    if(state == "user") {
        showProfileUserForm();
    } else {
        showProfileProviderForm();
    };
};