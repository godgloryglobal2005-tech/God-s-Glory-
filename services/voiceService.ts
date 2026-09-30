export type VoiceGender = 'female' | 'male' | 'auto';

export interface VoiceSettings {
  gender: VoiceGender;
  voiceURI: string; // Specific chosen voice URI if any
  speechRate: number; // 0.8 to 1.5
  speechPitch: number; // 0.7 to 1.4
}

const DEFAULT_SETTINGS: VoiceSettings = {
  gender: 'female',
  voiceURI: '',
  speechRate: 1.0,
  speechPitch: 1.1,
};

const STORAGE_KEY = 'gg_tutors_voice_settings';

export const getVoiceSettings = (): VoiceSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to parse voice settings', e);
  }
  return DEFAULT_SETTINGS;
};

export const saveVoiceSettings = (settings: VoiceSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save voice settings', e);
  }
};

/**
 * Filter and categorize system voices into Female and Male voices
 */
export const categorizeVoices = (voices: SpeechSynthesisVoice[]) => {
  const femaleKeywords = [
    'female', 'zira', 'jenny', 'aria', 'samantha', 'victoria', 'karen', 'fiona', 
    'siri', 'catherine', 'moira', 'veena', 'google us english', 'google uk english female', 
    'microsoft zira', 'microsoft jenny', 'microsoft aria', 'susan', 'linda', 'hazel'
  ];

  const maleKeywords = [
    'male', 'david', 'guy', 'mark', 'george', 'james', 'daniel', 'alex', 'fred', 
    'google uk english male', 'microsoft david', 'microsoft mark', 'microsoft guy', 
    'microsoft stefan', 'microsoft paul', 'richard', 'sean'
  ];

  const femaleVoices: SpeechSynthesisVoice[] = [];
  const maleVoices: SpeechSynthesisVoice[] = [];
  const otherVoices: SpeechSynthesisVoice[] = [];

  voices.forEach(voice => {
    const nameLower = voice.name.toLowerCase();
    if (femaleKeywords.some(kw => nameLower.includes(kw))) {
      femaleVoices.push(voice);
    } else if (maleKeywords.some(kw => nameLower.includes(kw))) {
      maleVoices.push(voice);
    } else {
      otherVoices.push(voice);
    }
  });

  return { femaleVoices, maleVoices, otherVoices };
};

/**
 * Finds the best matching voice based on user preference (Female/Male/Auto or URI)
 */
export const selectVoiceByPreference = (
  voices: SpeechSynthesisVoice[],
  settings: VoiceSettings
): { voice: SpeechSynthesisVoice | null; calculatedPitch: number } => {
  if (voices.length === 0) {
    return { voice: null, calculatedPitch: 1.0 };
  }

  // 1. If explicit voiceURI chosen and exists, use it
  if (settings.voiceURI) {
    const found = voices.find(v => v.voiceURI === settings.voiceURI);
    if (found) {
      const isFemale = found.name.toLowerCase().match(/(female|zira|jenny|aria|samantha|victoria|karen)/i);
      const isMale = found.name.toLowerCase().match(/(male|david|guy|mark|george|james)/i);
      let pitch = settings.speechPitch;
      if (settings.gender === 'female' && !isFemale) pitch = Math.max(1.2, settings.speechPitch);
      if (settings.gender === 'male' && !isMale) pitch = Math.min(0.85, settings.speechPitch);
      return { voice: found, calculatedPitch: pitch };
    }
  }

  const { femaleVoices, maleVoices } = categorizeVoices(voices);

  if (settings.gender === 'female') {
    // English female voice preferred first
    const enFemale = femaleVoices.find(v => v.lang.startsWith('en')) || femaleVoices[0];
    if (enFemale) {
      return { voice: enFemale, calculatedPitch: 1.15 };
    }
    // Fallback: any English voice with pitch raised for female voice timbre
    const anyEn = voices.find(v => v.lang.startsWith('en')) || voices[0];
    return { voice: anyEn || null, calculatedPitch: 1.25 };
  }

  if (settings.gender === 'male') {
    // English male voice preferred first
    const enMale = maleVoices.find(v => v.lang.startsWith('en')) || maleVoices[0];
    if (enMale) {
      return { voice: enMale, calculatedPitch: 0.9 };
    }
    // Fallback: any English voice with pitch lowered for male voice timbre
    const anyEn = voices.find(v => v.lang.startsWith('en')) || voices[0];
    return { voice: anyEn || null, calculatedPitch: 0.85 };
  }

  // Auto/Default selection
  const enVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB') || voices[0];
  return { voice: enVoice || null, calculatedPitch: settings.speechPitch };
};
