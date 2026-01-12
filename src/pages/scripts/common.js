/*!
 *
 * Yone Musics Website
 *
 * Copyright (C) よね/Yone
 *
 */

class Page {
    /**
     * @param {{
     *     pageTitleLangs: Object<string, string>,
     *     headerRoot: HTMLElement?,
     *     footerRoot: HTMLElement?,
     * }}
     */
    constructor({
        pageTitleLangs,
        headerRoot,
        footerRoot,
    }) {
        this.#pageTitleLangs = pageTitleLangs;
        this.#headerRoot = headerRoot;
        this.#footerRoot = footerRoot;
    }

    /**
     * @returns {Promise<void>}
     */
    async initialize() {
        this.#getClientLanguage();
        this.#changePageLanguage(this.pageLang);
        this.#initPage();
    }

    /**
     * @type {Object<string, string>}
     */
    #pageTitleLangs = {};

    /**
     * @type {HTMLElement?}
     */
    #headerRoot = null;

    /**
     * @type {HTMLElement?}
     */
    #footerRoot = null;

    /**
     * @type {string[]}
     */
    static #languages = ["ja-jp", "en-us", "ko-kr"];

    /**
     * @type {string}
     */
    static #defaultLanguage = "en-us";

    /**
     * @type {Object<string, string>}
     */
    static #languagesMap = {
        "ja": "ja-jp",
        "en": "en-us",
        "ko": "ko-kr",
    };

    /**
     * @returns {void}
     */
    #getClientLanguage() {
        this.pageLang = localStorage.getItem("lang");

        if (this.pageLang !== null) {
            return;
        }

        const userLang = (
            navigator.language || navigator.userLanguage
        ).toLowerCase();

        this.pageLang = Page.#languagesMap[userLang] || Page.#defaultLanguage;

        localStorage.setItem("lang", this.pageLang);
    }

    /**
     * @param {string} language
     * @returns {void}
     */
    #changePageLanguage(language) {
        this.pageLang = Page.#languages.includes(language) ? language : Page.#defaultLanguage;
        const bcp47 = this.pageLang.replace(/-([a-z]+)$/, (_, p1) => `-${p1.toUpperCase()}`);
        document.documentElement.lang = bcp47;
        document.title = this.#pageTitleLangs[bcp47];
        document.body.classList.remove(...Page.#languages);
        document.body.classList.add(this.pageLang);
        localStorage.setItem("lang", this.pageLang);
    }

    /**
     * @returns {void}
     */
    #initPage() {
        if (this.#headerRoot instanceof HTMLElement) {
            this.#headerRoot.innerHTML = Page.headerHTML;
        }

        if (this.#footerRoot instanceof HTMLElement) {
            this.#footerRoot.innerHTML = Page.footerHTML;
        }

        const headerNavButton = document.getElementById("headerNavButton");
        const headerLangsButton = document.getElementById("headerLangsButton");
        const headerLangsMenu = document.getElementById("headerLangsMenu");
        const headerLangsLists = document.getElementById("headerLangsLists");
        const downloadAgree = document.getElementById("downloadAgree");
        const downloadAgreeCheckbox = document.getElementById("downloadAgreeCheckbox");
        const downloadButton = document.getElementById("downloadButton");

        if (headerNavButton instanceof HTMLElement) {
            headerNavButton.addEventListener("click", () => {
                headerNavButton.classList.toggle("opened");
                document.getElementById("headerNav").classList.toggle("opened");
            });
        }

        if (headerLangsButton instanceof HTMLElement) {
            headerLangsButton.addEventListener("click", () => {
                headerLangsButton.classList.toggle("opened");
                document.getElementById("headerLangsMenu").classList.toggle("opened");
            });
        }

        if (headerLangsLists instanceof HTMLElement) {
            Page.#languages.forEach((selectedLanguage) => {
                document.querySelector(`#headerLangsLists .${selectedLanguage}`).addEventListener("click", () => {
                    this.#changePageLanguage(selectedLanguage);
                    headerLangsButton.classList.toggle("opened");
                    headerLangsMenu.classList.toggle("opened");
                });
            });
        }

        if (downloadAgree instanceof HTMLElement) {
            downloadAgree.addEventListener("click", () => {
                if (downloadAgreeCheckbox.checked === true) {
                    downloadButton.disabled = false;
                } else {
                    downloadButton.disabled = true;
                }
            });
        }

        if (downloadButton instanceof HTMLElement) {
            downloadButton.addEventListener("click", () => {
                const dlPath = downloadButton.getAttribute("href");
                open(dlPath, "_blank");
            });
        }
    }

    /**
     * @returns {string}
     */
    static get headerHTML() {
        return (`
            <div id="headerLogo">
                <div class="wrapper">
                    <div class="logo">
                        <div id="headerIcon">
                            <img lang="ja-JP" class="ja-jp" src="https://cdn.yoneyo.com/images/yone_logos/yone_icon.png"
                                alt="よね/Yone のアイコン" width="43" height="43">
                            <img lang="en-US" class="en-us" src="https://cdn.yoneyo.com/images/yone_logos/yone_icon.png"
                                alt="Yone's Icon" width="43" height="43">
                            <img lang="ko-KR" class="ko-kr" src="https://cdn.yoneyo.com/images/yone_logos/yone_icon.png"
                                alt="요네/Yone 의 아이콘" width="43" height="43">
                        </div>

                        <div id="headerTitle">
                            <h2 lang="ja-JP" class="ja-jp">よね/Yone Musics</h2>
                            <h2 lang="en-US" class="en-us">Yone Musics</h2>
                            <h2 lang="ko-KR" class="ko-kr">요네/Yone Musics</h2>
                        </div>
                    </div>

                    <button id="headerLangsButton">
                        <span class="material-symbols-outlined"> language </span>
                        <span> Language </span>
                    </button>
                </div>
            </div>

            <nav id="headerNav">
                <div class="wrapper">
                    <ul id="headerNavLists">
                        <li>
                            <a href="/">
                                <span lang="ja-JP" class="ja-jp">ホーム</span>
                                <span lang="en-US" class="en-us">Home</span>
                                <span lang="ko-KR" class="ko-kr">홈</span>
                            </a>
                        </li>

                        <li>
                            <a href="/releases">
                                <span lang="ja-JP" class="ja-jp">楽曲一覧</span>
                                <span lang="en-US" class="en-us">Musics List</span>
                                <span lang="ko-KR" class="ko-kr">음악 목록</span>
                            </a>
                        </li>

                        <li>
                            <a href="/license">
                                <span lang="ja-JP" class="ja-jp">利用ライセンス</span>
                                <span lang="en-US" class="en-us">License to Use</span>
                                <span lang="ko-KR" class="ko-kr">이용 라이센스</span>
                            </a>
                        </li>

                        <li>
                            <a href="https://www.yoneyo.com/#contact" target="_blank" rel="noopener noreferrer">
                                <span lang="ja-JP" class="ja-jp">お問い合わせ</span>
                                <span lang="en-US" class="en-us">Contact Me</span>
                                <span lang="ko-KR" class="ko-kr">문의하기</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <button id="headerNavButton">
                <span class="material-symbols-outlined open"> menu </span>
                <span class="material-symbols-outlined close"> close </span>
            </button>

            <div id="headerLangsMenu">
                <div class="wrapper">
                    <ul id="headerLangsLists">
                        <li class="ja-jp">
                            <span>日本語</span>
                        </li>

                        <li class="en-us">
                            <span>English (US)</span>
                        </li>

                        <li class="ko-kr">
                            <span>한국어</span>
                        </li>
                    </ul>
                </div>
            </div>
        `);
    }

    /**
     * @returns {string}
     */
    static get footerHTML() {
        return (`
            <div class="wrapper">
                <span id="footerCopyright">© よね/Yone</span>
            </div>
        `);
    }
};

/**
 * @type {Object<string, string>}
 */
const _pageTitleLangs = window.pageTitleLangs ?? pageTitleLangs;

/**
 * @type {Page}
 */
const page = new Page({
    pageTitleLangs: _pageTitleLangs,
    headerRoot: document.querySelector("header"),
    footerRoot: document.querySelector("footer"),
});

await page.initialize();
