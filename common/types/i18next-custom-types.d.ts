import languge from '../../assets/translations/source.json';
import 'react-i18next';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            translation: typeof languge;
        };
    }
}