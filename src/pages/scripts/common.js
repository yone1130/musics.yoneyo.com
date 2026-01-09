/*!
 *
 * Yone Musics Website
 *
 * Copyright (C) よね/Yone
 *
 * No modification or reproduction of any kind is permitted.
 * 改変や複製を一切禁じます。
 *
 */

class Page {
    /**
     * @param {{ pageTitleLangs: Object<string, string> }}
     */
    constructor({ pageTitleLangs }) {
        this.#pageTitleLangs = pageTitleLangs;
    }

    /**
     * @returns {Promise<void>}
     */
    async initialize() {
        this.#getClientLang();
        this.#changePageLang(this.pageLang);
        this.#initPage();
    }

    get #langs() {
        return ["ja-jp", "en-us", "ko-kr"];
    }

    /**
     * @type {Object<string, string>}
     */
    #pageTitleLangs = {};

    #getClientLang() {
        const langsMap = {
            ja: "ja-jp",
            en: "en-us",
            ko: "ko-kr",
        };

        const defaultLang = "en-us";

        this.pageLang = localStorage.getItem("lang");

        if (this.pageLang !== null) {
            return;
        }

        const userLang = (
            navigator.language || navigator.userLanguage
        ).toLowerCase();

        this.pageLang = langsMap[userLang] || defaultLang;

        localStorage.setItem("lang", this.pageLang);
    }

    #changePageLang(lang) {
        switch (lang) {
            case "ja-jp":
                document.documentElement.lang = "ja-JP";
                document.title = this.#pageTitleLangs["ja-JP"];
                document.body.classList.remove(...this.#langs);
                document.body.classList.add("ja-jp");
                localStorage.setItem("lang", "ja-jp");
                break;

            case "en-us":
                document.documentElement.lang = "en-US";
                document.title = this.#pageTitleLangs["en-US"];
                document.body.classList.remove(...this.#langs);
                document.body.classList.add("en-us");
                localStorage.setItem("lang", "en-us");
                break;

            case "ko-kr":
                document.documentElement.lang = "ko-KR";
                document.title = this.#pageTitleLangs["ko-KR"];
                document.body.classList.remove(...this.#langs);
                document.body.classList.add("ko-kr");
                localStorage.setItem("lang", "ko-kr");
                break;

            default:
                document.documentElement.lang = "en-US";
                document.title = this.#pageTitleLangs["en-US"];
                document.body.classList.remove(...this.#langs);
                document.body.classList.add("en-us");
                localStorage.setItem("lang", "en-us");
                break;
        }
    }

    #initPage() {
        $("header").load("/components/header.html");
        $("footer").load("/components/footer.html");

        $(document).on("click", "#headerNavButton", function (event) {
            $("#headerNavButton").toggleClass("opened");
            $("#headerNav").toggleClass("opened");
        });

        $(document).on("click", "#headerLangsButton", function (event) {
            $("#headerLangsButton").toggleClass("opened");
            $("#headerLangsMenu").toggleClass("opened");
        });

        this.#langs.forEach((lang) => {
            $(document).on("click", `#headerLangsLists .${lang}`, () => {
                this.#changePageLang(lang);
                $("#headerLangsButton").toggleClass("opened");
                $("#headerLangsMenu").toggleClass("opened");
            });
        });

        $(document).on("click", "#downloadAgree", function () {
            if ($("#downloadAgreeCheckbox").prop("checked") === true) {
                $("#downloadButton").prop("disabled", false);
            } else {
                $("#downloadButton").prop("disabled", true);
            }
        });

        $(document).on("click", "#downloadButton", function () {
            const dlPath = $("#downloadButton").attr("href");
            open(dlPath, "_blank");
        });
    }
};

/**
 * @type {Object<string, string>}
 */
const _pageTitleLangs = window.pageTitleLangs ?? pageTitleLangs;

/**
 * @type {Page}
 */
const page = new Page({ pageTitleLangs: _pageTitleLangs });

await page.initialize();
