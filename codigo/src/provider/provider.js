class Provider extends Helper {
    constructor(id) {
        super();
        this.id = id;
        this.photo = null;
        this.address = {
            cep: null,
            street: null,
            number: null,
            complement: {
                type: null,
                number: null
            },
            state: null,
            city: null,
            ddd: null,
            neighborhood: null,
            coordinates: {
                latitude: null,
                longitude: null
            }
        };
        this.description = null;
        this.phone = {
            is_whatsapp: false,
            number: null
        };
        this.email = null;
        this.is_gold = false;
        this.socials = {
            facebook: null,
            instagram: null,
            twitter: null,
            tiktok: null
        };
        this.services = [];
    };
};

class ProviderPageState {
    constructor() {
        this.state = null;
        this.provider = null;
    };
};

const page_state = new ProviderPageState();

const providerProfileForm = () => {
    return `
    <div class="container pt-4 profile-provider-form-area">
        <form>
            <div class="row">
                <div class="col-sm-12 profile-provider-form-img">
                    <div class="profile-provider-form-img-svg" id="profile-provider-form-img-svg" style="display: none;">
                        <svg class="profile-provider-form-img-svg-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C14.7614 18 17 15.7614 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13C7 15.7614 9.23858 18 12 18ZM12 16.0071C10.3392 16.0071 8.9929 14.6608 8.9929 13C8.9929 11.3392 10.3392 9.9929 12 9.9929C13.6608 9.9929 15.0071 11.3392 15.0071 13C15.0071 14.6608 13.6608 16.0071 12 16.0071Z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.56155 2C8.18495 2 6.985 2.93689 6.65112 4.27239L6.21922 6H4C2.34315 6 1 7.34315 1 9V19C1 20.6569 2.34315 22 4 22H20C21.6569 22 23 20.6569 23 19V9C23 7.34315 21.6569 6 20 6H17.7808L17.3489 4.27239C17.015 2.93689 15.8151 2 14.4384 2H9.56155ZM8.59141 4.75746C8.7027 4.3123 9.10268 4 9.56155 4H14.4384C14.8973 4 15.2973 4.3123 15.4086 4.75746L15.8405 6.48507C16.0631 7.37541 16.863 8 17.7808 8H20C20.5523 8 21 8.44772 21 9V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V9C3 8.44772 3.44772 8 4 8H6.21922C7.13696 8 7.93692 7.37541 8.15951 6.48507L8.59141 4.75746Z"></path>
                            </g>
                        </svg>
                    </div>
                    <img src="https://fastly.picsum.photos/id/616/400/400.jpg?hmac=Pq9Df_rY82owvzzbvzUvUqF2_OEAB7hOEEEbzPBhwcg" class="mx-auto d-block" id="profile-provider-form-picture-img" alt="aaa" style="width: 200px; height: 200px; border-radius: 50%;">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-2 profile-provider-form-id-area">
                    <label for="profile-provider-form-id" class="label-form-id" style="font-weight: 700;">ID</label>
                    <input type="text" class="form-control" id="profile-provider-form-id" aria-describedby="idHelp" disabled disabled>
                </div>
                <div class="col-sm-4 profile-provider-form-cep-area">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-cep" class="label-form-cep" style="font-weight: 700;">Cep<span class="error-message required-field" style="display: none;">*</span></label>
                        ${serviceFormSvgInfo("Campo obrigatório. O mesmo será utilizado no formulário de Serviço cada não queira cadastrar um novo.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-provider-form-cep" aria-describedby="stateHelp" onblur="getCEPInfo(event)" onclick="resetFormField('profile-provider-form-cep-helper', 'error-message', 'CEP do seu negócio.', this, 'is-invalid')" data-format="*****-***" data-mask="xxxxx-xxx" disabled>
                    <div id="profile-provider-form-cep-helper" class="form-text">CEP do seu negócio.</div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-6 profile-provider-form-state-area">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-state" class="label-form-state" style="font-weight: 700;">Estado</label>
                    </div>
                    <input type="text" class="form-control" id="profile-provider-form-state" aria-describedby="stateHelp" onclick="resetFormField('profile-provider-form-state-helper', 'error-message', '\u00A0', this, 'is-invalid')" disabled>
                    <div id="profile-provider-form-state-helper" class="form-text">\u00A0</div>
                </div>
                <div class="col-sm-6 profile-provider-form-city-area">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-city" class="label-form-city" style="font-weight: 700;">Cidade</label>
                    </div>
                    <input type="text" class="form-control" id="profile-provider-form-city" aria-describedby="cityHelp" onclick="resetFormField('profile-provider-form-city-helper', 'error-message', '\u00A0', this, 'is-invalid')"onclick="resetFormField('profile-provider-form-neighborhood-helper', 'error-message', 'Lembrando a senha tem que ser igual a anterior!', this, 'is-invalid')" disabled>
                    <div id="profile-provider-form-city-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-6 profile-provider-form-neighborhood-area">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-neighborhood" class="label-form-neighborhood" style="font-weight: 700;">Bairro</label>
                    </div>
                    <input type="text" class="form-control" id="profile-provider-form-neighborhood" aria-describedby="neighborhoodHelp" disabled>
                    <div id="profile-provider-form-neighborhood-helper" class="form-text">\u00A0</div>
                </div>
                <div class="col-sm-6 profile-provider-form-address-area">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-address" class="label-form-address" style="font-weight: 700;">Rua/Avenida</label>
                    </div>
                    <input type="text" class="form-control" id="profile-provider-form-address" aria-describedby="addressHelp" disabled>
                    <div id="profile-provider-form-address-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-4 profile-provider-form-address-number-area">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-address-number" class="label-form-address-number" style="font-weight: 700;">Numero do Local</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. O mesmo será utilizado no formulário de Serviço cada não queira cadastrar um novo.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-provider-form-address-number" aria-describedby="addressHelp" disabled>
                    <div id="profile-provider-form-address-number-helper" class="form-text">\u00A0</div>
                </div>
                <div class="col-sm-4 profile-provider-form-complement-type-area" style="display: none;">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-complement-type" class="label-form-complement-type" style="font-weight: 700;">Tipo do complemento</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. O mesmo será utilizado no formulário de Serviço cada não queira cadastrar um novo.", "right")}
                    </div>
                    <select class="form-select" id="profile-provider-form-complement-type" aria-label="Default select example">
                        <option value="Nenhum">Nenhum</option>
                        <option value="Loja">Loja</option>
                        <option value="Casa">Casa</option>
                        <option value="Apartamento">Apartamento</option>
                    </select>
                </div>
                <div class="col-sm-4 profile-provider-form-complement-type-show-area" style="display: none;">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-complement-type-show" class="label-form-complement-type" style="font-weight: 700;">Tipo do complemento</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. O mesmo será utilizado no formulário de Serviço cada não queira cadastrar um novo.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-provider-form-complement-type-show" aria-describedby="addressHelp" disabled>
                </div>
                <div class="col-sm-4 profile-provider-form-complement-number-area">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-complement-number" class="label-form-complement-number" style="font-weight: 700;">Numero do Complemento</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. O mesmo será utilizado no formulário de Serviço cada não queira cadastrar um novo.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-provider-form-complement-number" aria-describedby="addressHelp" disabled>
                    <div id="profile-provider-form-complement-number-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row pt-2">
                <div id="map" class="col-sm-12 map profile-provider-form-map-area"></div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-12 profile-provider-form-description-area">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-description" class="label-form-description" style="font-weight: 700;">Descrição<span class="error-message required-field" style="display: none;">*</span></label>
                        ${serviceFormSvgInfo("Campo obrigatório. Campo será utilizado caso não queira preencher no serviço.", "right")}
                    </div>
                    <textarea disabled class="profile-provider-form-description" id="profile-provider-form-description" rows="3" onclick="resetFormField('profile-provider-form-description-helper', 'error-message', '\u00A0', this, 'is-invalid')"></textarea>
                    <div id="profile-provider-form-description-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-6 profile-provider-form-phone-area">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-phone" class="label-form-phone" style="font-weight: 700;">Telefone</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. Caso o perfil tenha preenchido, será exibido aqui.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-provider-form-phone" aria-describedby="phoneHelp" onclick="resetFormField('profile-provider-form-phone-helper', 'error-message', 'Telefone para entrar em contato.', this, 'is-invalid')" data-format="(**) *.****-****" data-mask="(xx) x.xxxx-xxxx" disabled>
                    <div id="profile-provider-form-phone-helper" class="form-text">Telefone para entrar em contato.</div>
                </div>
                <div class="col-sm-6 d-flex justify-content-start align-items-center profile-provider-form-whatsapp-area">
                    <input class="form-check-input" type="checkbox" value="" id="profile-provider-whatsapp-phone" checked disabled disabled>
                    <div class="label-tooltip-form">
                        <label class="form-check-label" for="profile-provider-whatsapp-phone" style="padding-left: 10px; style="font-weight: 700;"">Whatsapp?</label>
                    </div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-6 profile-provider-form-email-area">
                    <div class="label-tooltip-form">
                        <label for="profile-provider-form-email" class="label-form-email" style="font-weight: 700;">E-mail</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. Caso o perfil tenha preenchido, será exibido aqui.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-provider-form-email" aria-describedby="emailHelp" disabled>
                    <div id="profile-provider-form-email-helper" class="form-text">E-mail do seu negócio.</div>
                </div>
            </div>
            <div class="row pt-4">
                <div class="col-sm-10 provider-edit-button" style="display: none;">
                <button type="button" class="btn" onclick="showEditProfileProviderForm()" style="font-weight: 700;">Editar</button>
                </div>
                <div class="col-sm-10 provider-save-button" style="display: none;">
                    <button type="button" class="btn" onclick="editProviderProfile()" style="font-weight: 700;">Salvar</button>
                </div>
            </div>
        </form>
    </div>
    `;
};

const providerProfileFormEmpty = () => {
    return `
        <div class="row text-center">
            <p>Você não tem nenhum perfil ainda. <a class="create-new-profile-provider-text" onclick="showProfileProviderForm(true)">Deseja criar um?</a></p>
        </div>
    `;
};

const switchProfileProviderEditButton = (edit) => {
    const profile_edit_button = document.getElementsByClassName("provider-edit-button")[0];
    if(profile_edit_button && edit) {
        profile_edit_button.style.display = "inline-block";
        return true;
    };

    profile_edit_button.style.display = "none";
    return false;
};

const switchProfileProviderSaveButton = (edit) => {
    const profile_save_button = document.getElementsByClassName("provider-save-button")[0];
    if(profile_save_button && edit) {
        profile_save_button.style.display = "inline-block";
        return true;
    };

    profile_save_button.style.display = "none";
    return false;

};

const showProfileProviderForm = (create_new) => {
    const user = getUserSession();
    const main_content_window_area = document.getElementsByClassName("main-content-window-area")[0];

    if(user && main_content_window_area) {

        removeUrlParameter("profile");
        setUrlParameter("profile", "provider");

        main_content_window_area.innerHTML = profilesForm();

        const main_content_window_menu_title = document.getElementsByClassName("main-content-window-menu-title")[0];
        main_content_window_menu_title.textContent = "Perfil";

        const profiles_area = document.getElementsByClassName("profiles-area")[0];
        
        if(user.is_provider || create_new) {
            profiles_area.innerHTML = providerProfileForm();

            if(create_new) {
                switchProfileProviderFormEdition(true); 
                switchProfileProviderEditButton(false);
                switchProfileProviderSaveButton(true);
                switchProfileProviderFormComplementTypeField(true);
            } else {
                switchProfileProviderEditButton(true);
                switchProfileProviderSaveButton(false);
                switchProfileProviderFormComplementTypeField(false);
                populateProviderProfile(user);
            };

        } else {
            profiles_area.innerHTML = providerProfileFormEmpty();
        };

        page_state.provider = user.provider_profile ? user.provider_profile : null;
        user.provider_profile ? loadMap(page_state.provider.address.coordinates.longitude, page_state.provider.address.coordinates.latitude, page_state.provider) : loadMap();
        addToolTipCode();
        callMask();

        return true;
    };

    logOutUser(false);

    return false;
};


const switchProfileProviderFormEdition = (edit) => {
    
    const profile_provider_form_cep = document.getElementById("profile-provider-form-cep");
    if(profile_provider_form_cep) {
        if(edit) {
            profile_provider_form_cep.removeAttribute("disabled");
        } else {
            profile_provider_form_cep.setAttribute("disabled", "disabled");
        };
    };

    const profile_provider_form_address_number = document.getElementById("profile-provider-form-address-number");
    if(profile_provider_form_address_number) {
        if(edit) {
            profile_provider_form_address_number.removeAttribute("disabled");
        } else {
            profile_provider_form_address_number.setAttribute("disabled", "disabled");
        };
    };

    const profile_provider_form_description = document.getElementById("profile-provider-form-description");
    if(profile_provider_form_description) {
        if(edit) {
            profile_provider_form_description.removeAttribute("disabled");
        } else {
            profile_provider_form_description.setAttribute("disabled", "disabled");
        };
    };

    const profile_provider_form_complement_number = document.getElementById("profile-provider-form-complement-number");
    if(profile_provider_form_complement_number) {
        if(edit) {
            profile_provider_form_complement_number.removeAttribute("disabled");
        } else {
            profile_provider_form_complement_number.setAttribute("disabled", "disabled");
        };
    };

    const profile_provider_form_email = document.getElementById("profile-provider-form-email");
    if(profile_provider_form_email) {
        if(edit) {
            profile_provider_form_email.removeAttribute("disabled");
        } else {
            profile_provider_form_email.setAttribute("disabled", "disabled");
        };
    };

    const profile_provider_form_phone = document.getElementById("profile-provider-form-phone");
    if(profile_provider_form_phone) {
        if(edit) {
            profile_provider_form_phone.removeAttribute("disabled");
        } else {
            profile_provider_form_phone.setAttribute("disabled", "disabled");
        };
    };

    const profile_provider_form_check_whatsapp = document.getElementById("profile-provider-whatsapp-phone");
    if(profile_provider_form_check_whatsapp) {
        if(edit) {
            profile_provider_form_check_whatsapp.removeAttribute("disabled");
        } else {
            profile_provider_form_check_whatsapp.setAttribute("disabled", "disabled");
        };
    };

    switchProfileProviderFormComplementTypeField(edit);

    const required_field = document.getElementsByClassName("required-field");
    for(const item of required_field) {
        item.style.display = "inline-block";
    };

    if(page_state.provider) {
        loadMap(page_state.provider.address.coordinates.longitude, page_state.provider.address.coordinates.latitude, page_state.provider, true);
    } else {
        loadMap(null, null, null, true);
    };

};

const populateProviderProfile = (user) => {
    
    const profile_provider_form_id_dom = document.getElementById("profile-provider-form-id");
    const profile_provider_form_cep_dom = document.getElementById("profile-provider-form-cep");
    const profile_provider_form_state_dom = document.getElementById("profile-provider-form-state");
    const profile_provider_form_city_dom = document.getElementById("profile-provider-form-city");
    const profile_provider_form_neighborhood_dom = document.getElementById("profile-provider-form-neighborhood");
    const profile_provider_form_address_number = document.getElementById("profile-provider-form-address-number");
    const profile_provider_form_address_dom = document.getElementById("profile-provider-form-address");
    const profile_provider_form_complement_type_show = document.getElementById("profile-provider-form-complement-type-show");
    const profile_provider_form_complement_number = document.getElementById("profile-provider-form-complement-number");
    const profile_provider_form_description_dom = document.getElementById("profile-provider-form-description");
    const profile_provider_form_email_dom = document.getElementById("profile-provider-form-email");
    const profile_provider_form_phone_dom = document.getElementById("profile-provider-form-phone");
    const profile_provider_form_check_whatsapp_dom = document.getElementById("profile-provider-whatsapp-phone");

    profile_provider_form_cep_dom.value = user.provider_profile.address.cep;
    profile_provider_form_id_dom.value = user.provider_profile.id;
    profile_provider_form_state_dom.value = user.provider_profile.address.state;
    profile_provider_form_city_dom.value = user.provider_profile.address.city;
    profile_provider_form_neighborhood_dom.value = user.provider_profile.address.neighborhood;
    profile_provider_form_address_number.value = user.provider_profile.address.number;
    profile_provider_form_address_dom.value = user.provider_profile.address.street;
    profile_provider_form_complement_type_show.value = user.provider_profile.address.complement.type;
    profile_provider_form_complement_number.value = user.provider_profile.address.complement.number;
    profile_provider_form_description_dom.value = user.provider_profile.description;
    profile_provider_form_email_dom.value = user.provider_profile.email;
    profile_provider_form_phone_dom.value = user.provider_profile.phone.number;
    profile_provider_form_check_whatsapp_dom.checked = user.provider_profile.phone.is_whatsapp;
};

const showEditProfileProviderForm = () => {
    switchProfileProviderEditButton(false);
    switchProfileProviderSaveButton(true);
    switchProfileProviderFormEdition(true);
};

const editProviderProfile = async () => {

    const users = getFromLocalStorage(USER_DB);
    let user_session = getUserSession();

    const profile_provider_form_cep_dom = document.getElementById("profile-provider-form-cep");
    const profile_provider_form_id_dom = document.getElementById("profile-provider-form-id");
    const profile_provider_form_state_dom = document.getElementById("profile-provider-form-state");
    const profile_provider_form_city_dom = document.getElementById("profile-provider-form-city");
    const profile_provider_form_neighborhood_dom = document.getElementById("profile-provider-form-neighborhood");
    const profile_provider_form_address_number = document.getElementById("profile-provider-form-address-number");
    const profile_provider_form_complement_type = document.getElementById("profile-provider-form-complement-type");
    const profile_provider_form_complement_number = document.getElementById("profile-provider-form-complement-number");
    const profile_provider_form_description_dom = document.getElementById("profile-provider-form-description");
    const profile_provider_form_email_dom = document.getElementById("profile-provider-form-email");
    const profile_provider_form_phone_dom = document.getElementById("profile-provider-form-phone");
    const profile_provider_form_check_whatsapp_dom = document.getElementById("profile-provider-whatsapp-phone");

    let cannot_update = false;

    if(!profile_provider_form_cep_dom.value) {
        const error_msg = document.getElementById("profile-provider-form-cep-helper");
        error_msg.textContent = "CEP não pode ficar vazio."
        error_msg.classList.add("error-message");
        cannot_update = true;
    };

    const phone_value = profile_provider_form_phone_dom.value.replace("(", "").replace(")", "").replace(" ", "").replace(".", "").replace("-", "");
    if(!user_session.phone.number && !isNumber(phone_value)) {
        const error_msg = document.getElementById("profile-provider-form-phone-helper");
        error_msg.textContent = "Perfil não está preenchido, telefone não pode ficar vazio."
        error_msg.classList.add("error-message");
        cannot_update = true;
    };

    if(!profile_provider_form_description_dom.value) {
        const error_msg = document.getElementById("profile-provider-form-description-helper");
        error_msg.textContent = "Descrição não pode ficar vazio."
        error_msg.classList.add("error-message");
        cannot_update = true;
    };

    if(cannot_update) { return false; };

    const user_already_exist = users.some(u => u.email == profile_provider_form_email_dom.value);
    if(user_already_exist && profile_provider_form_email_dom.value != user_session.email) {
        const profile_user_form_email_helper = document.getElementById("profile-provider-form-email-helper");
        profile_user_form_email_helper.textContent = "Email já cadastrado!"
        profile_user_form_email_helper.classList.add("error-message");
        return false;
    };

    let provider = page_state.provider;

    if(!page_state.provider) {
        provider = user_session.provider_profile;
    };

    if(provider) {

        provider.address.number = profile_provider_form_address_number.value;
        provider.address.complement.type = profile_provider_form_complement_type.value;
        provider.address.complement.number = profile_provider_form_complement_number.value;
        provider.description = profile_provider_form_description_dom.value;
        provider.phone.number = profile_provider_form_phone_dom.value ? profile_provider_form_phone_dom.value : user_session.phone;
        provider.phone.is_whatsapp = profile_provider_form_check_whatsapp_dom.checked;
        provider.email = profile_provider_form_email_dom.value ? profile_provider_form_email_dom.value : user_session.email;

        const current_user_index = users.findIndex(u => u.id == user_session.id);
        users[current_user_index].provider_profile = provider;
        users[current_user_index].is_provider = true;

        saveToLocalStorage(USER_DB, users);
        if(!profile_provider_form_id_dom.value || profile_provider_form_id_dom.value == " " || profile_provider_form_id_dom.value == null || profile_provider_form_id_dom.value == undefined) {
            updateMetaDataProviderLastId();
        };

        switchProfileProviderEditButton(true);
        switchProfileProviderSaveButton(false);
        switchProfileProviderFormEdition(false);

        for(const field of profile_provider_form_complement_type.options) {
            field.removeAttribute("selected");
        };

        const required_field = document.getElementsByClassName("required-field");
        for(const item of required_field) {
            item.style.display = "none";
        };

        populateProviderProfile(users[current_user_index]);
    };

    return false;
};

const resetEditStateFieldProvider = () => {
    const helper = document.getElementsByClassName("profile-provider-form-state-helper")[0];
    if(helper.classList.contains("error-message")) {
        helper.textContent = "\u00A0"
        helper.classList.remove("error-message");
        return true;
    };

    return false;
};

const resetEditCityFieldProvider = () => {
    const helper = document.getElementsByClassName("profile-provider-form-city-helper")[0];
    if(helper.classList.contains("error-message")) {
        helper.textContent = "\u00A0"
        helper.classList.remove("error-message");
        return true;
    };

    return false;
};

const resetEditDescriptionFieldProvider = () => {
    const helper = document.getElementsByClassName("profile-provider-form-description-helper")[0];
    if(helper.classList.contains("error-message")) {
        helper.textContent = "\u00A0"
        helper.classList.remove("error-message");
        return true;
    };

    return false;
};

const getCEPInfo = async (event) => {
    const profile_provider_form_cep_dom = document.getElementById("profile-provider-form-cep");

    if(profile_provider_form_cep_dom.value) {
        const new_value = profile_provider_form_cep_dom.value.replace("-", "");
        if(isNumber(new_value)) {
            const address = await fetchAsync(`https://viacep.com.br/ws/${new_value}/json/`);
            const meta_data = getFromLocalStorage(META_DATA);
            const provider = new Provider(meta_data.provider_last_id);
            provider.address.cep = address.cep;
            provider.address.street = address.logradouro;
            provider.address.neighborhood = address.bairro;
            provider.address.city = address.localidade;
            provider.address.state = address.uf;
            provider.address.ddd = address.ddd;
            
            provider.address.coordinates = await getCoordenateInfo(provider);
            loadMap(provider.address.coordinates.longitude, provider.address.coordinates.latitude, provider, true);

            page_state.provider = provider;

            const profile_provider_form_state_dom = document.getElementById("profile-provider-form-state");
            const profile_provider_form_city_dom = document.getElementById("profile-provider-form-city");
            const profile_provider_form_neighborhood_dom = document.getElementById("profile-provider-form-neighborhood");
            const profile_provider_form_address_dom = document.getElementById("profile-provider-form-address");
        
            profile_provider_form_state_dom.value = provider.address.state;
            profile_provider_form_city_dom.value = provider.address.city;
            profile_provider_form_neighborhood_dom.value = provider.address.neighborhood;
            profile_provider_form_address_dom.value = provider.address.street;

        };
    };
};

const switchProfileProviderFormComplementTypeField = (edit) => {
    const profile_provider_form_complement_type_area = document.getElementsByClassName("profile-provider-form-complement-type-area")[0];
    const profile_provider_form_complement_type_show_area = document.getElementsByClassName("profile-provider-form-complement-type-show-area")[0];
    if(edit) {
        profile_provider_form_complement_type_area.style.display = "inline-block";
        profile_provider_form_complement_type_show_area.style.display = "none";

        const user = getUserSession();
        const profile_provider_form_complement_type = document.getElementById("profile-provider-form-complement-type");
        
        if(user.provider_profile) {
            for(const field of profile_provider_form_complement_type.options) {
                if(field.value == user.provider_profile.address.complement.type) {
                    field.setAttribute("selected", "selected");
                }
            };
        };

    } else {
        profile_provider_form_complement_type_area.style.display = "none";
        profile_provider_form_complement_type_show_area.style.display = "inline-block";
    };
};
