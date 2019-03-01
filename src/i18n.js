import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import locale from 'element-ui/lib/locale';
import Cookies from 'js-cookie';

Vue.use(VueI18n);

export default () => {
    const messages = {
        en: {
            cmsg: {
                hello: 'hello world'
            },
            ...enLocale
        },
        cn: {
            cmsg: {
                hello: 'こんにちは、世界'
            },
            ...zhLocale
        }
    }
    var lang = Cookies.get("lang") || "cn";
    let i18n = new VueI18n({
        locale: lang,
        messages
    });
    locale.i18n((key, value) => i18n.t(key, value));
    return i18n;
};