const USER_DB = "users";
const USER_SESSION = "userSession";
const META_DATA = "metaData";

const init = () => {
    createEnvoriment();
    checkUserSession();
    resized();
};

const checkUserSession = () => {

    const app = document.getElementsByClassName("app")[0];
    const session = getFromLocalStorage(USER_SESSION);
    
    if(checkUserSessionObject(session)) {
        app.innerHTML = mainContentHTML("Dashboard");
        return true;
    };
    
    app.innerHTML = loginFormHTML();
    showLoginUserForm();

    return false;
};

const checkUserSessionObject = (session) => {
    return session && session.hasOwnProperty("id") && session.hasOwnProperty("email");
};

const createEnvoriment = () => {
    const users = getFromLocalStorage(USER_DB);
    const session = getFromLocalStorage(USER_SESSION);
    const meta_data = getFromLocalStorage(META_DATA);

    const md = {
        last_id: 0,
        provider_last_id: 0,
        service_last_id: 0,
        feedbacks_last_id: 0
    };

    if(!users) { saveToLocalStorage(USER_DB, []); };
    if(!session) { saveToLocalStorage(USER_SESSION, {}) };
    if(!meta_data) { saveToLocalStorage(META_DATA, md) };
};

const getAllUsers = () => {
    return getFromLocalStorage(USER_DB)
};

const updateMetaDataLastId = () => {
    const meta_data = getFromLocalStorage(META_DATA);

    meta_data.last_id += 1;

    saveToLocalStorage(META_DATA, meta_data); 
};

const updateMetaDataProviderLastId = () => {
    const meta_data = getFromLocalStorage(META_DATA);

    meta_data.provider_last_id += 1;

    saveToLocalStorage(META_DATA, meta_data); 
};

const updateMetaDataServiceLastId = () => {
    const meta_data = getFromLocalStorage(META_DATA);

    meta_data.service_last_id += 1;

    saveToLocalStorage(META_DATA, meta_data); 
};

const updateMetaDataFeedbacksLastId = () => {
    const meta_data = getFromLocalStorage(META_DATA);

    meta_data.feedbacks_last_id += 1;

    saveToLocalStorage(META_DATA, meta_data); 
};

const resized = (session) => {
    const main_header = document.getElementsByClassName("main-nav-container")[0];
    if(main_header) {
        main_header.innerHTML = mainHeader(window.innerWidth);
    
        const main_nav_title = document.getElementsByClassName("main-nav-title")[0];
        const main_nav_nav = document.getElementsByClassName("main-nav-nav")[0];
    
        if(main_nav_title && main_nav_nav) {
            for(const item of main_nav_title.classList) {
                if(item.startsWith("col-")) {
                    main_nav_title.classList.remove(item);
                };
            };
        
            for(const item of main_nav_nav.classList) {
                if(item.startsWith("col-")) {
                    main_nav_nav.classList.remove(item);
                };
            };
        
            if(window.innerWidth <= 1200) {
                main_nav_title.classList.add("col-sm-4");
                main_nav_nav.classList.add("col-sm-6");
            } else if(window.innerWidth <= 1580) {
                main_nav_title.classList.add("col-sm-3");
                main_nav_nav.classList.add("col-sm-7");
            } else {
                main_nav_title.classList.add("col-sm-2");
                main_nav_nav.classList.add("col-sm-8");
            };
        };
    };
};

const mainHeader = (inner_width) => {

    if(inner_width > 975) {
        return `<div class="row">
                    <div class="col-sm-2 d-flex justify-content-center align-items-center main-nav-title" onclick="showDashboard()"><a>Talent Tracker</a></div>
                    <div class="col-sm-8 d-flex justify-content-end align-items-center main-nav-nav">
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" onclick="showServiceList()">Serviços</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onclick="showMyServiceList()">Meus Negócios</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-2 d-flex justify-content-center align-items-center main-nav-options">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 40px;" onclick="showProfileUserForm()">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z" fill="#131313"></path>
                                <path d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z" fill="#131313"></path>
                            </g>
                        </svg>
                    </div>
                </div>`;
    } else {
        return `<div class="row">
                    <div class="col-sm-12 d-flex justify-content-center align-items-center main-nav-title" onclick="showDashboard()"><a>Talent Tracker</a></div>
                </div>
                <div class="row">
                    <div class="d-flex align-items-center justify-content-evenly">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 40px;" onclick="showProfileUserForm()">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z" fill="#131313"></path>
                                <path d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z" fill="#131313"></path>
                            </g>
                        </svg>
                        <nav class="navbar" onclick="showMenuOptions()">
                            <ul class="nav-menu" style="z-index: 99;">
                                <li class="nav-item nav-item-mobile">
                                    <a class="nav-link" onclick="showServiceList()">Serviços</a>
                                </li>
                                <li class="nav-item nav-item-mobile">
                                    <a class="nav-link" onclick="showMyServiceList()">Meus Negócios</a>
                                </li>
                            </ul>
                            <div class="hamburger">
                                <span class="bar"></span>
                                <span class="bar"></span>
                                <span class="bar"></span>
                            </div>
                        </nav>
                    </div>
                </div>`;
    }
};

const showMenuOptions = () => {
    const hamburger = document.querySelector(".hamburger");
    const nav_menu = document.querySelector(".nav-menu");
    
    hamburger.classList.toggle("active");
    if(nav_menu.style.top == "-100%" || nav_menu.style.top == "") {
        nav_menu.style.top = "90px";
    } else {
        nav_menu.style.top = "-100%";
    };

}

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);

    if(value) { return JSON.parse(value); }

    return null;
};

const getUserSession = () => {
    const user_session = getFromLocalStorage(USER_SESSION);
    const users = getFromLocalStorage(USER_DB);

    if(users && user_session) {
        const finded_user = users.find(u => u.id == user_session.id);
        if(finded_user) {
            return finded_user;
        };

        return false;
    };

    return false;
};

const loginFormHTML = () => {
    return `
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 before-main-content-talent-tracker text-center">Talent Tracker</div>
        </div>
        <div class="row">
            <div class="col-12 before-main-content">
                <div class="d-flex before-main-content-menu">
                    <div class="d-flex align-items-center justify-content-center before-main-content-title"></div>
                    <div class="d-flex align-items-center justify-content-end before-main-content-options">
                        <div class="main-content-window-menu-options-line">
                            <svg width="25" height="1" viewBox="0 0 25 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="0.5" x2="25" y2="0.5" stroke="black"/>
                            </svg>    
                        </div>
                        <div class="main-content-window-menu-options-square">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="1" width="23" height="23" stroke="black" stroke-width="2"/>
                            </svg>    
                        </div>
                        <div class="main-content-window-menu-options-x">
                            <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="-1" x2="34.5616" y2="-1" transform="matrix(0.716812 0.697267 -0.716812 0.697267 2 2)" stroke="black" stroke-width="2"/>
                                <line y1="-1" x2="34.5616" y2="-1" transform="matrix(0.716812 -0.697267 0.716812 0.697267 2.22583 27)" stroke="black" stroke-width="2"/>
                            </svg>    
                        </div>
                    </div>
                </div>
        
                <div class="container-fluid before-main-content-area"></div>
            </div>
        </div>
    </div>
    `;
};

const showBeforeContent = () => {
    const app = document.getElementsByClassName("app")[0];
    app.innerHTML = loginFormHTML();
};

const mainContentHTML = (window_title) => {
    return `
    <div class="main-content">
        <header class="container-fluid main-nav-container"></header>
    
        <main class="container-xl main-content-area">
            <div class="main-content-window">
                <div class="container-fluid d-flex justify-content-end align-items-center main-content-window-menu">
                    <div class="text-center main-content-window-menu-title">${window_title}</div>
                    <div class="d-flex main-content-window-menu-options">
                        <div class="main-content-window-menu-options-line">
                            <svg width="25" height="1" viewBox="0 0 25 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="0.5" x2="25" y2="0.5" stroke="black"/>
                            </svg>    
                        </div>
                        <div class="main-content-window-menu-options-square">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="1" width="23" height="23" stroke="black" stroke-width="2"/>
                            </svg>    
                        </div>
                        <div class="main-content-window-menu-options-x">
                            <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="-1" x2="34.5616" y2="-1" transform="matrix(0.716812 0.697267 -0.716812 0.697267 2 2)" stroke="black" stroke-width="2"/>
                                <line y1="-1" x2="34.5616" y2="-1" transform="matrix(0.716812 -0.697267 0.716812 0.697267 2.22583 27)" stroke="black" stroke-width="2"/>
                            </svg>    
                        </div>
                    </div>
                </div>
                <div class="main-content-window-area"></div>
            </div>
        </main>
    </div>
    `;
};

const showMainContent = () => {
    const app = document.getElementsByClassName("app")[0];
    app.innerHTML = mainContentHTML("Dashboard");
    resized(true);
};

const showDashboard = () => {
    
    removeAllUrlParameters()

    const main_content_window_menu_title = document.getElementsByClassName("main-content-window-menu-title")[0];
    main_content_window_menu_title.textContent = "Dashboard";

    const main_content_window_area = document.getElementsByClassName("main-content-window-area")[0];
    main_content_window_area.innerHTML = "";

};

const setUrlParameter = (key, value) => {
    const url = new URL(location);
    url.searchParams.set(key, value);
    history.pushState({}, "", url);
};

const removeUrlParameter = (key) => {
    const url = new URL(location);
    url.searchParams.delete(key);
    history.pushState({}, "", url);
};

const removeAllUrlParameters = () => {
    window.history.pushState({}, "", window.location.pathname);
};

const addToolTipCode = () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
    });
};

const resetFormField = (id, cls, msg, th, value) => {
    const emailHelp = document.getElementById(id);
    emailHelp.classList.remove(cls);
    emailHelp.innerText = msg;

    if(th && value) {
        resetClass(th, value);
    };
};

const resetClass = (cls, value) => {

    cls.classList.contains(value) ? cls.classList.remove(value) : null;
};

const fetchAsync = async (url, method) => {
    const response = await fetch(url);
    return await response.json();
};

const doFormat = (x, pattern, mask) => {
    const strippedValue = x.replace(/[^0-9]/g, "");
    const chars = strippedValue.split('');
    let count = 0;

    let formatted = '';
    for (let i = 0; i < pattern.length; i++) {
        const c = pattern[i];
        if (chars[count]) {
            if (/\*/.test(c)) {
                formatted += chars[count];
                count++;
            } else {
                formatted += c;
            };
        } else if (mask) {
            if (mask.split('')[i]) {
                formatted += mask.split('')[i];
            };
        };
    };
    return formatted;
};

const callMask = () => {
    document.querySelectorAll('[data-mask]').forEach((event) => {
        const format = (elem) => {
            const val = doFormat(elem.value, elem.getAttribute('data-format'));
            elem.value = doFormat(elem.value, elem.getAttribute('data-format'), elem.getAttribute('data-mask'));
            
            if (elem.createTextRange) {
                const range = elem.createTextRange();
                range.move('character', val.length);
                range.select();
            } else if (elem.selectionStart) {
                elem.setSelectionRange(val.length, val.length);
            }
        };
    
        event.addEventListener('keyup', () => {
            format(event);
        });
        event.addEventListener('keydown', () => {
            format(event);
        });
    
        format(event);
    });
};

const isNumber = (str) => {
    return new RegExp('^[0-9]+$').test(str);
};

const loadMap = (longitude, latitude, element, can_move) => {

    const map_dom = document.getElementById("map");
    if(map_dom) { map_dom.innerHTML = ""; };

    if(longitude, latitude) {
        longitude = parseFloat(longitude);
        latitude = parseFloat(latitude);
        let baseMapLayer = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        let map = new ol.Map({
            target: 'map',
            layers: [ baseMapLayer],
            view: new ol.View({
                center: ol.proj.fromLonLat([longitude, latitude]), 
                    zoom: 15
                })
        });

        let marker = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude])),
        });
    
        marker.setStyle(new ol.style.Style({
            image: new ol.style.Icon(({
                color: '#ffcd46',
                crossOrigin: 'anonymous',
                src: 'https://raw.githubusercontent.com/itsmohitt/openlayers-tutorials/master/dot.png'
            }))
        }));
    
        let vectorSource = new ol.source.Vector({
            features: [marker]
        });
        let markerVectorLayer = new ol.layer.Vector({
            source: vectorSource,
        });
        map.addLayer(markerVectorLayer);

        if(can_move) {
            map.on('click', function(evt){

                element.address.coordinates.longitude = ol.proj.toLonLat(evt.coordinate)[0];
                element.address.coordinates.latitude = ol.proj.toLonLat(evt.coordinate)[1];
    
                marker.getGeometry().setCoordinates(evt.coordinate);
            });
        };
    } else {
        let baseMapLayer = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        let map = new ol.Map({
            target: 'map',
            layers: [ baseMapLayer],
            view: new ol.View({
                center: ol.proj.fromLonLat([-43.940933, -19.912998]), 
                    zoom: 13 //Initial Zoom Level
                })
        });
    };
};

const getCoordenateInfo = async (provider) => {
    if(provider) {
        const params = `q=${provider.address.street} ${provider.address.city} ${provider.address.neighborhood} ${provider.address.state} Brazil`
        const url = `https://nominatim.openstreetmap.org/search?${encodeURI(params)}&format=json&addressdetails=1&limit=1&polygon_svg=1`
        const coordenates = await fetchAsync(url);
        if(coordenates.length == 0) {
            const profile_provider_form_cep_helper = document.getElementById("profile-provider-form-cep-helper");
            profile_provider_form_cep_helper.innerText = "CEP inválido."
            profile_provider_form_cep_helper.classList.add("error-message")
        };
        return {
            longitude: coordenates[0].lon,
            latitude: coordenates[0].lat
        };
    };

    return null;
};