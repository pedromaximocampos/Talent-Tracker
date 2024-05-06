class Service extends Helper {
    constructor(id) {
        super();
        this.id = id;
        this.picture = null;
        this.title = null;
        this.description = null;
        this.email = null;
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
        this.phone = {
            is_whatsapp: false,
            number: null
        };
        this.rating = 0;
        this.socials = {
            facebook: null,
            instagram: null,
            twitter: null,
            tiktok: null
        };
        this.price = 0.00;
        this.feedbacks = [];
    };
};

class Feedbacks extends Helper {
    constructor(id, description) {
        super();
        this.id = id;
        this.description = description;
    };
};

class ServicePageState {
    constructor() {
        this.state = null;
        this.service = null;
    };
};

const page_state_service = new ServicePageState();

const doesNotHaveProviderProfile = () => {
    return `
    <div class="row pt-4 text-center">
        <p>Você não tem nenhum perfil ainda. <a class="create-new-profile-provider-text" onclick="showProfileProviderForm(true)">Deseja criar um?</a></p>
    </div>
    `;
};

const doesNotHaveAnyServices = () => {
    return `
    <div class="row pt-4 text-center">
        <p>Você tem um perfil de <span style="color: var(--orange-color); font-weight: 800;">Provedor</span> cadastrado! Vamos cadastrar algum serviço? <a class="create-new-service-text" onclick="showServiceForm(false)">Clica Aqui</a></p>
    </div>
    `;
};

const showMyServiceList = () => {
    const user = getUserSession();
    const main_content_window_area = document.getElementsByClassName("main-content-window-area")[0];
    const main_content_window_menu_title = document.getElementsByClassName("main-content-window-menu-title")[0];
    main_content_window_menu_title.textContent = "Meus Negócios";
    
    removeUrlParameter("profile");
    
    if(user.is_provider) {
        if(user.provider_profile.services.length > 0) {
            main_content_window_area.innerHTML = serviceMenuArea();
            main_content_window_area.innerHTML += servicesList();
        } else {
            main_content_window_area.innerHTML = doesNotHaveAnyServices();
        };
    } else {
        main_content_window_area.innerHTML = doesNotHaveProviderProfile();
    };
};

const serviceMenuArea = () => {
    return `
        <div class="container d-flex justify-content-end align-items-center service-menu-area">
            <button type="button" class="btn" onclick="showServiceForm(false)" style="font-weight: 700;">Criar</button>
        </div>
    `;
};

const servicesList = () => {

    const user = getUserSession();

    const main_service_accordions_area = document.createElement("div");
    main_service_accordions_area.classList.add("container");
    main_service_accordions_area.classList.add("services_accordion_area");

    const service_accordions = document.createElement("div");
    service_accordions.classList.add("accordion");
    service_accordions.id = "services_accordion_area"
    main_service_accordions_area.appendChild(service_accordions);

    const accordion_naming = "service_accordion"
    for(let i = 0; i < user.provider_profile.services.length; i++) {
        const service = user.provider_profile.services[i];

        const service_html = `
        <div class="accordion-item" id="$service_id_${service.id}">
            <h2 class="accordion-header ${accordion_naming}_header">
                <button class="accordion-button collapsed ${accordion_naming}_button" type="button" data-bs-toggle="collapse" data-bs-target="#${accordion_naming}_${i}" aria-expanded="false" aria-controls="${accordion_naming}_${i}" style="background-color: ${i % 2 == 0 ? "var(--green-ligth-color)" : "var(--green-medium-color)"};">
                    <strong>${service.title}</strong>
                </button>
            </h2>
            <div id="${accordion_naming}_${i}" class="accordion-collapse collapse ${accordion_naming}_body_area" data-bs-parent="#accordionExample">
                <div class="accordion-body ${accordion_naming}_body">
                    <ul class="list-group">
                        <li class="list-group-item" style="background-color: var(--orange-ultra-ligth-color);"><strong>E-mail:</strong> ${service.email}</li>
                        <li class="list-group-item" style="background-color: var(--orange-ultra-ligth-color);"><strong>Endereço:</strong>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" style="background-color: var(--orange-ultra-ligth-color);"><strong>CEP:</strong> ${service.address.cep}</li>
                                <li class="list-group-item" style="background-color: var(--orange-ultra-ligth-color);"><strong>Estado:</strong> ${service.address.state}</li>
                                <li class="list-group-item" style="background-color: var(--orange-ultra-ligth-color);"><strong>Cidade:</strong> ${service.address.city}</li>
                                <li class="list-group-item" style="background-color: var(--orange-ultra-ligth-color);"><strong>Endereço:</strong> ${service.address.street} - ${service.address.number} - ${service.address.complement.type} - ${service.address.complement.number} - ${service.address.neighborhood}</li>
                                <li class="list-group-item" style="background-color: var(--orange-ultra-ligth-color);"><strong>Telefone:</strong> ${service.phone.number} - Whatsapp: ${service.phone.is_whatsapp ? "Sim" : "Não"}</li>
                            </ul>
                        </li>
                        <li class="list-group-item" style="background-color: var(--orange-ultra-ligth-color);"><strong>Valor:</strong> R$ ${service.price}</li>
                        <li class="list-group-item" style="background-color: var(--orange-ultra-ligth-color);"><strong>Avaliação:</strong> ${service.phone.rating ? service.phone.rating : "Nenhuma avaliação ainda."}</li>
                        <li class="list-group-item" style="background-color: var(--orange-ultra-ligth-color);"><strong>Descrição:</strong> <p>${service.description}</p></li>
                    </ul>
                </div>
                <div class="container d-flex justify-content-end align-items-center">
                    <div class="service-edit-options" id="$service_id_${service.id}" onclick="showServiceForm(false, this.id)">
                        <svg class="svg-edit-service-box" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> <title></title>
                                <g id="Complete">
                                    <g id="edit">
                                        <g class="svg-edit-service">
                                            <path  d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                            <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="service-delete-options" id="$service_id_${service.id}" onclick="askTodeleteService(this.id)">
                        <svg class="svg-delete-service-box" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g class="svg-edit-service" id="SVGRepo_iconCarrier">
                                <path d="M10 11V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M14 11V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        `;

        service_accordions.innerHTML += service_html;
    };

    return main_service_accordions_area.outerHTML;
};

const serviceForm = async () => {
    
    return `
    <div class="container pt-4 profile-service-form-area">
        <form>
            <div class="row">
                <div class="col-sm-12 profile-service-form-img">
                    <div class="profile-service-form-img-svg" id="profile-service-form-img-svg" style="display: none;">
                        <svg class="profile-service-form-img-svg-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C14.7614 18 17 15.7614 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13C7 15.7614 9.23858 18 12 18ZM12 16.0071C10.3392 16.0071 8.9929 14.6608 8.9929 13C8.9929 11.3392 10.3392 9.9929 12 9.9929C13.6608 9.9929 15.0071 11.3392 15.0071 13C15.0071 14.6608 13.6608 16.0071 12 16.0071Z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.56155 2C8.18495 2 6.985 2.93689 6.65112 4.27239L6.21922 6H4C2.34315 6 1 7.34315 1 9V19C1 20.6569 2.34315 22 4 22H20C21.6569 22 23 20.6569 23 19V9C23 7.34315 21.6569 6 20 6H17.7808L17.3489 4.27239C17.015 2.93689 15.8151 2 14.4384 2H9.56155ZM8.59141 4.75746C8.7027 4.3123 9.10268 4 9.56155 4H14.4384C14.8973 4 15.2973 4.3123 15.4086 4.75746L15.8405 6.48507C16.0631 7.37541 16.863 8 17.7808 8H20C20.5523 8 21 8.44772 21 9V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V9C3 8.44772 3.44772 8 4 8H6.21922C7.13696 8 7.93692 7.37541 8.15951 6.48507L8.59141 4.75746Z"></path>
                            </g>
                        </svg>
                    </div>
                    <img src="https://fastly.picsum.photos/id/616/400/400.jpg?hmac=Pq9Df_rY82owvzzbvzUvUqF2_OEAB7hOEEEbzPBhwcg" class="mx-auto d-block" id="profile-service-form-picture-img" alt="aaa" style="width: 200px; height: 200px; border-radius: 50%;">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-2 profile-service-form-id-area">
                    <label for="profile-service-form-id" class="label-form-id" style="font-weight: 700;">ID</label>
                    <input type="text" class="form-control" id="profile-service-form-id" aria-describedby="idHelp" disabled disabled>
                </div>
                <div class="col-sm-4 profile-service-form-cep-area">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-cep" class="label-form-cep" style="font-weight: 700;">Cep<span class="error-message required-field" style="display: none;">*</span></label>
                        ${serviceFormSvgInfo("Campo será utilizado caso não queira preencher no serviço.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-service-form-cep" aria-describedby="stateHelp" onblur="getCEPInfoService(event)" onclick="resetFormField('profile-service-form-cep-helper', 'error-message', 'CEP do seu negócio.', this, 'is-invalid')" data-format="*****-***" data-mask="xxxxx-xxx" disabled>
                    <div id="profile-service-form-cep-helper" class="form-text">CEP do seu negócio.</div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-6 profile-service-form-state-area">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-state" class="label-form-state" style="font-weight: 700;">Estado</label>
                    </div>
                    <input type="text" class="form-control" id="profile-service-form-state" aria-describedby="stateHelp" onclick="resetFormField('profile-service-form-state-helper', 'error-message', '\u00A0', this, 'is-invalid')" disabled>
                    <div id="profile-service-form-state-helper" class="form-text">\u00A0</div>
                </div>
                <div class="col-sm-6 profile-service-form-city-area">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-city" class="label-form-city" style="font-weight: 700;">Cidade</label>
                    </div>
                    <input type="text" class="form-control" id="profile-service-form-city" aria-describedby="cityHelp" onclick="resetFormField('profile-service-form-city-helper', 'error-message', '\u00A0', this, 'is-invalid')"onclick="resetFormField('profile-service-form-neighborhood-helper', 'error-message', 'Lembrando a senha tem que ser igual a anterior!', this, 'is-invalid')" disabled>
                    <div id="profile-service-form-city-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-6 profile-service-form-neighborhood-area">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-neighborhood" class="label-form-neighborhood" style="font-weight: 700;">Bairro</label>
                    </div>
                    <input type="text" class="form-control" id="profile-service-form-neighborhood" aria-describedby="neighborhoodHelp" disabled>
                    <div id="profile-service-form-neighborhood-helper" class="form-text">\u00A0</div>
                </div>
                <div class="col-sm-6 profile-service-form-address-area">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-address" class="label-form-address" style="font-weight: 700;">Rua/Avenida</label>
                    </div>
                    <input type="text" class="form-control" id="profile-service-form-address" aria-describedby="addressHelp" disabled>
                    <div id="profile-service-form-address-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-4 profile-service-form-address-number-area">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-address-number" class="label-form-address-number" style="font-weight: 700;">Numero do Local</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. Campo será utilizado caso não queira preencher no serviço.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-service-form-address-number" aria-describedby="addressHelp" disabled>
                    <div id="profile-service-form-address-number-helper" class="form-text">\u00A0</div>
                </div>
                <div class="col-sm-4 profile-service-form-complement-type-area" style="display: none;">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-complement-type" class="label-form-complement-type" style="font-weight: 700;">Tipo do complemento</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. Campo será utilizado caso não queira preencher no serviço.", "right")}
                    </div>
                    <select class="form-select" id="profile-service-form-complement-type" aria-label="Default select example">
                        <option value="Nenhum">Nenhum</option>
                        <option value="Loja">Loja</option>
                        <option value="Casa">Casa</option>
                        <option value="Apartamento">Apartamento</option>
                    </select>
                </div>
                <div class="col-sm-4 profile-service-form-complement-type-show-area" style="display: none;">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-complement-type-show" class="label-form-complement-type" style="font-weight: 700;">Tipo do complemento</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. Campo será utilizado caso não queira preencher no serviço.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-service-form-complement-type-show" aria-describedby="addressHelp" disabled>
                </div>
                <div class="col-sm-4 profile-service-form-complement-number-area">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-complement-number" class="label-form-complement-number" style="font-weight: 700;">Numero do Complemento</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. Caso não preencha será utilizado do perfil do usuário.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-service-form-complement-number" aria-describedby="addressHelp" disabled>
                    <div id="profile-service-form-complement-number-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row pt-2">
                <div id="map" class="col-sm-12 map profile-service-form-map-area"></div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-12 profile-service-form-description-area">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-description" class="label-form-description" style="font-weight: 700;">Descrição<span class="error-message required-field" style="display: none;">*</span></label>
                        ${serviceFormSvgInfo("Campo obrigatório. Campo será utilizado caso não queira preencher no serviço.", "right")}
                    </div>
                    <textarea disabled class="profile-service-form-description" id="profile-service-form-description" rows="3" onclick="resetFormField('profile-service-form-description-helper', 'error-message', '\u00A0', this, 'is-invalid')"></textarea>
                    <div id="profile-service-form-description-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-12 profile-service-form-title-area">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-title" class="label-form-title" style="font-weight: 700;">Título do serviço<span class="error-message">*</span></label>
                    </div>
                    <input type="text" class="form-control" id="profile-service-form-title" aria-describedby="titleHelp" disabled>
                    <div id="profile-service-form-title-helper" class="form-text">\u00A0</div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-6 profile-service-form-phone-area">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-phone" class="label-form-phone" style="font-weight: 700;">Telefone</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. Caso o perfil tenha preenchido, será exibido aqui.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-service-form-phone" aria-describedby="phoneHelp" onclick="resetFormField('profile-service-form-phone-helper', 'error-message', 'Telefone para entrar em contato.', this, 'is-invalid')" data-format="(**) *.****-****" data-mask="(xx) x.xxxx-xxxx" disabled>
                    <div id="profile-service-form-phone-helper" class="form-text">Telefone para entrar em contato.</div>
                </div>
                <div class="col-sm-6 d-flex justify-content-start align-items-center profile-service-form-whatsapp-area">
                    <input class="form-check-input" type="checkbox" value="" id="profile-service-whatsapp-phone" checked disabled disabled>
                    <div class="label-tooltip-form">
                        <label class="form-check-label" for="profile-service-whatsapp-phone" style="padding-left: 10px; style="font-weight: 700;"">Whatsapp?</label>
                    </div>
                </div>
            </div>
            <div class="row pt-2">
                <div class="col-sm-6 profile-service-form-email-area">
                    <div class="label-tooltip-form">
                        <label for="profile-service-form-email" class="label-form-email" style="font-weight: 700;">E-mail</label>
                        ${serviceFormSvgInfo("Campo não obrigatório. Caso o perfil tenha preenchido, será exibido aqui.", "right")}
                    </div>
                    <input type="text" class="form-control" id="profile-service-form-email" aria-describedby="emailHelp" disabled>
                    <div id="profile-service-form-email-helper" class="form-text">E-mail do seu negócio.</div>
                </div>
                <div class="col-sm-6 service-form-price-area">
                    <div class="label-tooltip-form">
                        <label for="service-form-price" class="label-form-price" style="font-weight: 700;">Valor<span class="error-message">*</span></label>
                        
                    </div>
                    <input type="text" class="form-control" id="service-form-price" aria-describedby="priceHelp" disabled>
                    <div id="service-form-price-helper" class="form-text">Especifique quanto quer cobrar pelo serviço.</div>
                </div>
            </div>
            <div class="row pt-4">
                <div class="col-sm-6">
                    <button type="button" class="btn" id="service-form-save-button" onclick="editServiceForm()" style="font-weight: 700;">Salvar</button>
                </div>
                <div class="col-sm-6 text-end" id="service-form-back-button" style="display: none;">
                    <button type="button" class="btn" onclick="showMyServiceList()" style="font-weight: 700;">Voltar</button>
                </div>
                <div class="col-sm-6 text-end" id="service-form-cancel-button" style="display: none;">
                    <button type="button" class="btn" onclick="showMyServiceList()" style="font-weight: 700;">Cancelar</button>
                </div>

                <div class="col-sm-6 text-end" id="service-form-cancel-map-button" style="display: none;">
                    <button type="button" class="btn" onclick="showServiceList()" style="font-weight: 700;">Cancelar</button>
                </div>
            </div>
        </form>
    </div>
    `;
};

const serviceFormSvgInfo = (msg, place) => {
    return `
    <div class="service-form-info">
        <svg class="svg-service-form-info" data-bs-toggle="tooltip" data-bs-placement="${place}" title="${msg}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z"></path>
            </g>
        </svg>
    </div>
    `;
};

const switchProfileServiceButtonsEdition = (edit) => {
    if(edit) {
        const service_form_back_button = document.getElementById("service-form-back-button");
        service_form_back_button.style.display = "block";
        
        const service_form_cancel_button = document.getElementById("service-form-cancel-button");
        service_form_cancel_button.style.display = "none";
        
    } else {
        const service_form_back_button = document.getElementById("service-form-back-button");
        service_form_back_button.style.display = "none";
        
        const service_form_cancel_button = document.getElementById("service-form-cancel-button");
        service_form_cancel_button.style.display = "block";
    };
};

const switchServiceFormEdition = (edit) => {
    const profile_service_form_cep = document.getElementById("profile-service-form-cep");
    if(profile_service_form_cep) {
        if(edit) {
            profile_service_form_cep.removeAttribute("disabled");
        } else {
            profile_service_form_cep.setAttribute("disabled", "disabled");
        };
    };

    const profile_service_form_address_number = document.getElementById("profile-service-form-address-number");
    if(profile_service_form_address_number) {
        if(edit) {
            profile_service_form_address_number.removeAttribute("disabled");
        } else {
            profile_service_form_address_number.setAttribute("disabled", "disabled");
        };
    };

    const profile_service_form_description = document.getElementById("profile-service-form-description");
    if(profile_service_form_description) {
        if(edit) {
            profile_service_form_description.removeAttribute("disabled");
        } else {
            profile_service_form_description.setAttribute("disabled", "disabled");
        };
    };

    const profile_service_form_complement_number = document.getElementById("profile-service-form-complement-number");
    if(profile_service_form_complement_number) {
        if(edit) {
            profile_service_form_complement_number.removeAttribute("disabled");
        } else {
            profile_service_form_complement_number.setAttribute("disabled", "disabled");
        };
    };

    const profile_service_form_email = document.getElementById("profile-service-form-email");
    if(profile_service_form_email) {
        if(edit) {
            profile_service_form_email.removeAttribute("disabled");
        } else {
            profile_service_form_email.setAttribute("disabled", "disabled");
        };
    };

    const profile_service_form_title = document.getElementById("profile-service-form-title");
    if(profile_service_form_title) {
        if(edit) {
            profile_service_form_title.removeAttribute("disabled");
        } else {
            profile_service_form_title.setAttribute("disabled", "disabled");
        };
    };

    const profile_service_form_phone = document.getElementById("profile-service-form-phone");
    if(profile_service_form_phone) {
        if(edit) {
            profile_service_form_phone.removeAttribute("disabled");
        } else {
            profile_service_form_phone.setAttribute("disabled", "disabled");
        };
    };

    const profile_service_form_check_whatsapp = document.getElementById("profile-service-whatsapp-phone");
    if(profile_service_form_check_whatsapp) {
        if(edit) {
            profile_service_form_check_whatsapp.removeAttribute("disabled");
        } else {
            profile_service_form_check_whatsapp.setAttribute("disabled", "disabled");
        };
    };

    const service_form_price_dom = document.getElementById("service-form-price");
    if(service_form_price_dom) {
        if(edit) {
            service_form_price_dom.removeAttribute("disabled");
        } else {
            service_form_price_dom.setAttribute("disabled", "disabled");
        };
    };

    const profile_service_form_complement_type_area = document.getElementsByClassName("profile-service-form-complement-type-area")[0];
    const profile_service_form_complement_type_show_area = document.getElementsByClassName("profile-service-form-complement-type-show-area")[0];
    if(edit) {
        profile_service_form_complement_type_area.style.display = "inline-block";
        profile_service_form_complement_type_show_area.style.display = "none";

        const user = getUserSession();
        const profile_provider_form_complement_type = document.getElementById("profile-service-form-complement-type");
        
        if(user.provider_profile) {
            for(const field of profile_provider_form_complement_type.options) {
                if(field.value == user.provider_profile.address.complement.type) {
                    field.setAttribute("selected", "selected");
                }
            };
        };

    } else {
        profile_service_form_complement_type_area.style.display = "none";
        profile_service_form_complement_type_show_area.style.display = "inline-block";
    };
    
};

const showServiceForm = async (edit, service_id) => {

    const main_content_window_area = document.getElementsByClassName("main-content-window-area")[0];
    main_content_window_area.innerHTML = await serviceForm();

    if(service_id) {
        const user_session = getUserSession();

        const id = service_id.split("_")[2];
        const service = user_session.provider_profile.services.find(s => s.id == id);

        page_state_service.service = service;

        const main_content_window_menu_title = document.getElementsByClassName("main-content-window-menu-title")[0];
        main_content_window_menu_title.textContent = service.title;
        switchServiceFormEdition(!edit);
        switchProfileServiceButtonsEdition(edit);
        populateServiceProfile(service);
        
        loadMap(page_state_service.service.address.coordinates.longitude, page_state_service.service.address.coordinates.latitude, page_state_service.service, true);
        addToolTipCode();
        callMask();

        return true;
    };

    const main_content_window_menu_title = document.getElementsByClassName("main-content-window-menu-title")[0];
    main_content_window_menu_title.textContent = "Novo Serviço";
    switchServiceFormEdition(!edit);
    switchProfileServiceButtonsEdition(edit);
    loadMap(null, null, null, true);
    addToolTipCode();
    callMask();

    return true;
};

const editServiceForm = async () => {

    const user_session = getUserSession();
    if(!user_session) { logOutUser(); };

    const users = getFromLocalStorage(USER_DB);
    const meta_data = getFromLocalStorage(META_DATA);

    const profile_service_form_id_dom = document.getElementById("profile-service-form-id");
    const profile_service_form_cep_dom = document.getElementById("profile-service-form-cep");
    const profile_service_form_state_dom = document.getElementById("profile-service-form-state");
    const profile_service_form_city_dom = document.getElementById("profile-service-form-city");
    const profile_service_form_address = document.getElementById("profile-service-form-address");
    const profile_service_form_neighborhood_dom = document.getElementById("profile-service-form-neighborhood");
    const profile_service_form_address_number = document.getElementById("profile-service-form-address-number");
    const profile_service_form_complement_type = document.getElementById("profile-service-form-complement-type");
    const profile_service_form_complement_number = document.getElementById("profile-service-form-complement-number");
    const profile_service_form_description_dom = document.getElementById("profile-service-form-description");
    const profile_service_form_title_dom = document.getElementById("profile-service-form-title");
    const profile_service_form_email_dom = document.getElementById("profile-service-form-email");
    const service_form_price_dom = document.getElementById("service-form-price");
    const profile_service_form_phone_dom = document.getElementById("profile-service-form-phone");
    const profile_service_form_check_whatsapp_dom = document.getElementById("profile-service-whatsapp-phone");

    const user_already_exist = users.some(u => u.email == profile_service_form_email_dom.value);
    if(user_already_exist && profile_service_form_email_dom.value != user_session.email) {
        const profile_user_form_email_helper = document.getElementsByClassName("profile-service-form-email-helper")[0];
        profile_user_form_email_helper.textContent = "Email já cadastrado!"
        profile_user_form_email_helper.classList.add("error-message");
        return false;
    };

    let cannot_update = false;

    if(!profile_service_form_title_dom.value) {
        const error_msg = document.getElementById("profile-service-form-title-helper");
        error_msg.textContent = "Título não pode ficar vazio."
        error_msg.classList.add("error-message");
        cannot_update = true;
    };

    if(cannot_update) { return false; };

    let service = page_state_service.service;

    if(!service) { service = new Service(meta_data.service_last_id); };

    service.title = profile_service_form_title_dom.value;
    service.address.cep = profile_service_form_cep_dom.value ? profile_service_form_cep_dom.value : user_session.provider_profile.address.cep;
    service.address.street = profile_service_form_address.value ? profile_service_form_address.value : user_session.provider_profile.address.street;
    service.address.neighborhood = profile_service_form_neighborhood_dom.value ? profile_service_form_neighborhood_dom.value : user_session.provider_profile.address.neighborhood;
    service.address.city = profile_service_form_city_dom.value ? profile_service_form_city_dom.value : user_session.provider_profile.address.city;
    service.address.state = profile_service_form_state_dom.value ? profile_service_form_state_dom.value : user_session.provider_profile.address.state;
    service.address.number = profile_service_form_address_number.value ? profile_service_form_address_number.value : user_session.provider_profile.address.number;
    service.address.complement.type = profile_service_form_complement_type.value ? profile_service_form_complement_type.value : user_session.provider_profile.address.complement.type;
    service.address.complement.number = profile_service_form_complement_number.value ? profile_service_form_complement_number.value : user_session.provider_profile.address.complement.number;
    service.description = profile_service_form_description_dom.value ?profile_service_form_description_dom.value : user_session.provider_profile.description;
    const phone_value = profile_service_form_phone_dom.value.replace("(", "").replace(")", "").replace(" ", "").replace(".", "").replace("-", "");
    service.phone.number = isNumber(phone_value) ? profile_service_form_phone_dom.value : user_session.provider_profile.phone.number;
    service.phone.is_whatsapp = isNumber(phone_value) ? user_session.provider_profile.phone.is_whatsapp : profile_service_form_check_whatsapp_dom.checked;
    service.email = profile_service_form_email_dom.value ? profile_service_form_email_dom.value : user_session.provider_profile.email;
    service.price = service_form_price_dom.value ? service_form_price_dom.value : 0.00;
    service.address.coordinates.latitude = service.address.coordinates.latitude ? service.address.coordinates.latitude : user_session.provider_profile.address.coordinates.latitude;
    service.address.coordinates.longitude = service.address.coordinates.longitude ? service.address.coordinates.longitude : user_session.provider_profile.address.coordinates.longitude;

    if(service) {

        const current_user_index = users.findIndex(u => u.id == user_session.id);
        const current_user = users[current_user_index];

        if(profile_service_form_id_dom.value) {
            const current_service_index = current_user.provider_profile.services.findIndex(s => s.id == profile_service_form_id_dom.value);
            current_user.provider_profile.services[current_service_index] = service;
        } else {
            current_user.provider_profile.services.push(service.toJson());
        };

        updateMetaDataServiceLastId();
        saveToLocalStorage(USER_DB, users);

        showMyServiceList();

        return true;
    };

    return false;
};

const getCEPInfoService = async () => {
    const profile_service_form_cep_dom = document.getElementById("profile-service-form-cep");
    const profile_service_form_state_dom = document.getElementById("profile-service-form-state");
    const profile_service_form_city_dom = document.getElementById("profile-service-form-city");
    const profile_service_form_neighborhood_dom = document.getElementById("profile-service-form-neighborhood");
    const profile_service_form_address_dom = document.getElementById("profile-service-form-address");
    const profile_service_form_complement_type = document.getElementById("profile-service-form-complement-type");
    const profile_service_form_complement_number = document.getElementById("profile-service-form-complement-number");
    const profile_service_form_address_number = document.getElementById("profile-service-form-address-number");

    let service = page_state_service.service;
    const clean_cep = profile_service_form_cep_dom.value.replace("-", "");
    if(isNumber(clean_cep)) {
        
        const address = await fetchAsync(`https://viacep.com.br/ws/${clean_cep}/json/`);

        if(service) {
            service.address.cep = address.cep
            service.address.state = address.uf;
            service.address.city = address.localidade;
            service.address.neighborhood = address.bairro;
            service.address.street = address.logradouro;
            service.address.coordinates = await getCoordenateInfo(service);
            
        } else {

            const user_session = getUserSession();
            const meta_data = getFromLocalStorage(META_DATA);
            service = new Service(meta_data.service_last_id);
            service.address.cep = address.cep
            service.address.state = address.uf;
            service.address.city = address.localidade;
            service.address.neighborhood = address.bairro;
            service.address.street = address.logradouro;
            service.address.coordinates = user_session.provider_profile.address.coordinates;

        };

    } else {
        const user_session = getUserSession();
        if(service) {
            service.address.cep = user_session.provider_profile.address.cep;
            service.address.state = user_session.provider_profile.address.state;
            service.address.city = user_session.provider_profile.address.city;
            service.address.neighborhood = user_session.provider_profile.address.neighborhood;
            service.address.street = user_session.provider_profile.address.street;
            service.address.coordinates = user_session.provider_profile.address.coordinates;
            service.address.complement = user_session.provider_profile.address.complement;
            
        } else {
            const meta_data = getFromLocalStorage(META_DATA);
            service = new Service(meta_data.service_last_id);
            service.address.cep = user_session.provider_profile.address.cep;
            service.address.state = user_session.provider_profile.address.state;
            service.address.city = user_session.provider_profile.address.city;
            service.address.neighborhood = user_session.provider_profile.address.neighborhood;
            service.address.street = user_session.provider_profile.address.street;
            service.address.number = user_session.provider_profile.address.number;
            service.address.complement = user_session.provider_profile.address.complement;
            service.address.coordinates = user_session.provider_profile.address.coordinates;
        };
    };

    profile_service_form_address_number.value = service.address.number;
    profile_service_form_complement_number.value = service.address.complement.number;
    profile_service_form_complement_type.value = service.address.complement.type;
    profile_service_form_cep_dom.value = service.address.cep;
    profile_service_form_state_dom.value = service.address.state;
    profile_service_form_city_dom.value = service.address.city;
    profile_service_form_neighborhood_dom.value = service.address.neighborhood;
    profile_service_form_address_dom.value = service.address.street;
    
    page_state_service.service = service;
    loadMap(page_state_service.service.address.coordinates.longitude, page_state_service.service.address.coordinates.latitude, page_state_service.service, true);
};

const populateServiceProfile = (service) => {
    const profile_service_form_id_dom = document.getElementById("profile-service-form-id");
    const profile_service_form_cep_dom = document.getElementById("profile-service-form-cep");
    const profile_service_form_state_dom = document.getElementById("profile-service-form-state");
    const profile_service_form_city_dom = document.getElementById("profile-service-form-city");
    const profile_service_form_address = document.getElementById("profile-service-form-address");
    const profile_service_form_neighborhood_dom = document.getElementById("profile-service-form-neighborhood");
    const profile_service_form_address_number = document.getElementById("profile-service-form-address-number");
    const profile_service_form_complement_type = document.getElementById("profile-service-form-complement-type");
    const profile_service_form_complement_number = document.getElementById("profile-service-form-complement-number");
    const profile_service_form_description_dom = document.getElementById("profile-service-form-description");
    const profile_service_form_title_dom = document.getElementById("profile-service-form-title");
    const profile_service_form_email_dom = document.getElementById("profile-service-form-email");
    const service_form_price_dom = document.getElementById("service-form-price");
    const profile_service_form_phone_dom = document.getElementById("profile-service-form-phone");
    const profile_service_form_check_whatsapp_dom = document.getElementById("profile-service-whatsapp-phone");

    profile_service_form_id_dom.value = service.id;
    profile_service_form_cep_dom.value = service.address.cep;
    profile_service_form_state_dom.value = service.address.state;
    profile_service_form_city_dom.value = service.address.city;
    profile_service_form_address.value = service.address.street;
    profile_service_form_neighborhood_dom.value = service.address.neighborhood;
    profile_service_form_address_number.value = service.address.number;
    profile_service_form_complement_type.value = service.address.complement.type;
    profile_service_form_complement_number.value = service.address.complement.number;
    profile_service_form_description_dom.value = service.description;
    profile_service_form_title_dom.value = service.title;
    profile_service_form_email_dom.value = service.email;
    service_form_price_dom.value = service.price;
    profile_service_form_phone_dom.value = service.phone.number;
    profile_service_form_check_whatsapp_dom.checked = service.phone.is_whatsapp;
};

const askTodeleteService = (service_id) => {
    const users = getFromLocalStorage(USER_DB);
    const user_session = getUserSession();
    const id = service_id.split("_")[2];
    const service_to_delete = users.find(u => u.id == user_session.id).provider_profile.services.find(s => s.id == id);


    const main_content_window_area = document.getElementsByClassName("main-content-window-area")[0];
    main_content_window_area.innerHTML = `
    <div class="container logout-question">
        <div class="row">
            <div class="col-12 text-center want-to-delete" style="font-weight: 800; font-size: 1.2rem;">Deseja realmente deletar esse serviço? <p>Serviço: ${service_to_delete.title}</p></div>
        </div>
        <div class="row pt-2 d-flex justify-content-center">
            <div class="col-1">
                <button type="button" class="btn logout-button-yes" onclick="deleteService('${id}')">Sim</button>
            </div>
            <div class="col-1">
                <button type="button" class="btn logout-button-no" onclick="showServiceForm(false, '${id}')">Não</button>
            </div>
        </div>
    </div>
    `;
    return false;
};

const deleteService = (id) => {
    users = getFromLocalStorage(USER_DB);
    user_session = getUserSession();
    
    const current_user_index = users.findIndex(u => u.id == user_session.id);
    users[current_user_index].provider_profile.services = users[current_user_index].provider_profile.services.filter(s => s.id != id);

    saveToLocalStorage(USER_DB, users);
    showMyServiceList();

};

const showServiceList = () => {

    const all_users = getAllUsers();

    const main_content_window_menu_title = document.getElementsByClassName("main-content-window-menu-title")[0];
    main_content_window_menu_title.textContent = "Serviços";

    const main_content_window_area = document.getElementsByClassName("main-content-window-area")[0];
    main_content_window_area.innerHTML = `
        <div class="services_area d-flex justify-content-center align-items-center">
            <div class="col-12">
                <div id="services_map" class="map"></div>
            </div>
        </div>
    `;

    for(const user of all_users) {
        if(user.provider_profile) {
            for(const service  of user.provider_profile.services) {
                const services_area = document.getElementsByClassName("services_area")[0];
                services_area.innerHTML += `
                    <div id="service_id_${service.id}_user_id_${user.id}" class="popup_${service.id} service_title" onclick="testOne(this.id)">${service.title}</div>
                `;
            };
        };
    };

    const baseMapLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    const view  = new ol.View({
        center: ol.proj.fromLonLat([-43.96237537264824, -19.85855291802163]), 
        zoom: 13 //Initial Zoom Level
    });

    const map = new ol.Map({
        target: 'services_map'
    });

    map.addLayer(baseMapLayer);
    map.setView(view);

    for(const user of all_users) {
        if(user.provider_profile) {
            for(const service  of user.provider_profile.services) {
    
                const coordinates = [service.address.coordinates.longitude, service.address.coordinates.latitude];
            
                const marker = new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat(coordinates)),
                });
            
                marker.setStyle(new ol.style.Style({
                    image: new ol.style.Icon(({
                        color: '#ffcd46',
                        crossOrigin: 'anonymous',
                        src: 'https://raw.githubusercontent.com/itsmohitt/openlayers-tutorials/master/dot.png'
                    }))
                }));
            
                const vectorSource = new ol.source.Vector({
                    features: [marker]
                });
                const markerVectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                });
            
                map.addLayer(markerVectorLayer);
    
                var popup = new ol.Overlay({
                    element: document.getElementsByClassName(`popup_${service.id}`)[0]
                });
    
                popup.setPosition(ol.proj.fromLonLat(coordinates));
                map.addOverlay(popup);
    
            };
        };
    };
};

const showServiceProfile = async (service) => {

    const main_content_window_menu_title = document.getElementsByClassName("main-content-window-menu-title")[0];
    main_content_window_menu_title.innerText = service.title

    const main_content_window_area = document.getElementsByClassName("main-content-window-area")[0];
    main_content_window_area.innerHTML = await serviceForm();

    const service_form_save_button = document.getElementById("service-form-save-button");
    service_form_save_button.style.display = "none";

    const service_form_cancel_map_button = document.getElementById("service-form-cancel-map-button");
    service_form_cancel_map_button.style.display = "block";

    populateServiceProfile(service);
    loadMap(service.address.coordinates.longitude, service.address.coordinates.latitude, service, false);

    
};

const testOne = (ids) => {
    const splited_str = ids.split("_"); 
    const service_id = splited_str[2];
    const user_id = splited_str[5];

    const user = getUserById(user_id);

    const service = user.provider_profile.services.find(s => s.id == service_id);

    showServiceProfile(service);
};
