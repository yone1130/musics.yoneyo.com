/*
 *
 * Yone Musics Website
 * 
 * (c) よね/Yone
 * 
 * No modification or reproduction of any kind is permitted.
 * 改変や複製を一切禁じます。
 * 
 */

'use strict';

(function () {
    class Page {
        langs = ["ja-jp", "en-us", "ko-kr"];

        constructor() {
            this.getLang();
            this.initPage();
        }

        getLang() {
            this.pageLang = localStorage.getItem("lang");

            if (this.pageLang === null) {
                const userLang = navigator.language || navigator.userLanguage;

                if (userLang.toLowerCase().includes('ja')) {
                    this.pageLang = "ja-jp";
                } else if (userLang.toLowerCase().includes('en')) {
                    this.pageLang = "en-us";
                } else if (userLang.toLowerCase().includes('ko')) {
                    this.pageLang = "ko-kr";
                } else {
                    this.pageLang = "en-us";
                }

                localStorage.setItem("lang", this.pageLang);
            }

            this.changePageLang(this.pageLang);
        }

        changePageLang(lang) {
            switch (lang) {
                case "ja-jp":
                    document.documentElement.lang = "ja-JP";
                    document.title = pageTitleLangs["ja-JP"];
                    document.body.classList.remove(...this.langs);
                    document.body.classList.add("ja-jp");
                    localStorage.setItem("lang", "ja-jp");
                    break;

                case "en-us":
                    document.documentElement.lang = "en-US";
                    document.title = pageTitleLangs["en-US"];
                    document.body.classList.remove(...this.langs);
                    document.body.classList.add("en-us");
                    localStorage.setItem("lang", "en-us");
                    break;

                case "ko-kr":
                    document.documentElement.lang = "ko-KR";
                    document.title = pageTitleLangs["ko-KR"];
                    document.body.classList.remove(...this.langs);
                    document.body.classList.add("ko-kr");
                    localStorage.setItem("lang", "ko-kr");
                    break;

                default:
                    document.documentElement.lang = "en-US";
                    document.title = pageTitleLangs["en-US"];
                    document.body.classList.remove(...this.langs);
                    document.body.classList.add("en-us");
                    localStorage.setItem("lang", "en-us");
                    break;
            }
        }

        initPage() {
            $("header").load("./common/header.html");
            $("footer").load("./common/footer.html");

            $(document).on("click", "#headerNavButton", function (event) {
                $("#headerNavButton").toggleClass("opened");
                $("#headerNav").toggleClass("opened");
            });

            $(document).on("click", "#headerLangsButton", function (event) {
                $("#headerLangsButton").toggleClass("opened");
                $("#headerLangsMenu").toggleClass("opened");
            });

            this.langs.forEach(lang => {
                $(document).on('click', `#headerLangsLists .${lang}`, () => {
                    this.changePageLang(lang);
                    $("#headerLangsButton").toggleClass("opened");
                    $("#headerLangsMenu").toggleClass("opened");
                }
                );
            }
            );

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
    }

    document.addEventListener("DOMContentLoaded", new Page());
}
)();
