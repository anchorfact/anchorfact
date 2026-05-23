// i18n Configuration — supported languages and validation rules
// Based on W3C BCP 47 language tags
const SUPPORTED_LANGUAGES = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt'];

// Per-language quality thresholds (allow lower for non-English due to source scarcity)
const LANGUAGE_THRESHOLDS = {
  en: 75,
  zh: 65,
  ja: 65,
  ko: 65,
  es: 60,
  fr: 60,
  de: 60,
  pt: 60,
};

// Valid confidence values
const VALID_CONFIDENCE = ['high', 'medium', 'low', 'disputed'];

// Valid generation methods
const VALID_GENERATION_METHODS = ['human_only', 'ai_assisted', 'ai_generated_reviewed', 'ai_generated'];

function isValidLanguage(lang) {
  return typeof lang === 'string' && SUPPORTED_LANGUAGES.includes(lang.toLowerCase());
}

function getThreshold(lang) {
  const key = (lang || 'en').toLowerCase();
  return LANGUAGE_THRESHOLDS[key] || LANGUAGE_THRESHOLDS['en'];
}

module.exports = {
  SUPPORTED_LANGUAGES,
  LANGUAGE_THRESHOLDS,
  VALID_CONFIDENCE,
  VALID_GENERATION_METHODS,
  isValidLanguage,
  getThreshold,
};
