import React, { useEffect, useState, useMemo } from 'react';
import { Subject, AudienceLevel, ALL_SUBJECTS } from '../types';
import UploadIcon from './icons/UploadIcon';
import { TutorPersona } from '../services/tutorPersonaService';
import { curriculumData } from '../services/curriculumService';
import { 
  getUniversityCatalogForSubject, 
  UniversityCourse, 
  CourseModule 
} from '../services/universityCourseService';
import {
  COUNTRIES,
  getActiveCountryCode,
  setActiveCountryCode,
  getCountryByCode,
  getRealWorldChildTopics,
  getRealWorldHighSchoolTopics,
  RealWorldCurriculum
} from '../services/countryCurriculumService';
import { getCurrentUser, updateUserProfile } from '../services/authService';

interface InputFormProps {
  subject: Subject;
  setSubject: (subject: Subject) => void;
  audienceLevel: AudienceLevel;
  setAudienceLevel: (level: AudienceLevel) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  imagePreviewUrl: string;
  onImageChange: (dataUrl: string | null) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  year: string;
  setYear: (year: string) => void;
  semester: string;
  setSemester: (semester: string) => void;
  topic: string;
  setTopic: (topic: string) => void;
  subTopic: string;
  setSubTopic: (subTopic: string) => void;
  activePersona?: TutorPersona;
  onOpenTutorModal?: () => void;
}

const InputForm: React.FC<InputFormProps> = ({
  subject,
  setSubject,
  audienceLevel,
  setAudienceLevel,
  prompt,
  setPrompt,
  imagePreviewUrl,
  onImageChange,
  onSubmit,
  isLoading,
  isLoggedIn,
  onLoginClick,
  year,
  setYear,
  semester,
  setSemester,
  topic,
  setTopic,
  subTopic,
  setSubTopic,
  activePersona,
  onOpenTutorModal,
}) => {
  const [countryCode, setCountryCode] = useState<string>(() => getActiveCountryCode());
  const [years, setYears] = useState<string[]>([]);
  const [semesters, setSemesters] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [subTopics, setSubTopics] = useState<string[]>([]);
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>('');

  const currentUser = getCurrentUser();

  // Listen for user country changes if logged in
  useEffect(() => {
    if (currentUser?.country && currentUser.country !== countryCode) {
      setCountryCode(currentUser.country);
      setActiveCountryCode(currentUser.country);
    }
  }, [currentUser]);

  const activeCountry = useMemo(() => {
    return getCountryByCode(countryCode);
  }, [countryCode]);

  const handleCountryChange = (newCode: string) => {
    setCountryCode(newCode);
    setActiveCountryCode(newCode);
    const country = getCountryByCode(newCode);
    if (currentUser) {
      updateUserProfile(currentUser.email, { country: newCode, curriculum: country.curriculumName });
    }
    // Reset selections on country change
    setYear('');
    setSemester('');
    setTopic('');
    setSubTopic('');
  };

  const isUniversityLevel = audienceLevel === AudienceLevel.University || audienceLevel === AudienceLevel.Expert;

  // University Catalog for the selected subject
  const uniCatalog = useMemo(() => {
    return getUniversityCatalogForSubject(subject);
  }, [subject]);

  // University level keys (e.g., "100 Level", "200 Level", ...)
  const uniLevelKeys = useMemo(() => {
    return Object.keys(uniCatalog.levels);
  }, [uniCatalog]);

  // Current selected university semester courses
  const currentSemesterCourses = useMemo(() => {
    if (!isUniversityLevel || !year || !semester) return null;
    const levelData = uniCatalog.levels[year];
    if (!levelData) return null;
    return levelData.semesters[semester] || null;
  }, [isUniversityLevel, uniCatalog, year, semester]);

  // Selected University Course object
  const currentCourse = useMemo<UniversityCourse | null>(() => {
    if (!currentSemesterCourses || !selectedCourseCode) return null;
    return currentSemesterCourses.courses.find(c => c.code === selectedCourseCode) || null;
  }, [currentSemesterCourses, selectedCourseCode]);

  // Real world topic map for child & high school levels
  const realWorldTopicsMap = useMemo<RealWorldCurriculum>(() => {
    if (isUniversityLevel) return {};
    if (audienceLevel === AudienceLevel.Child) {
      return getRealWorldChildTopics(subject, year);
    }
    if (audienceLevel === AudienceLevel.HighSchool) {
      return getRealWorldHighSchoolTopics(subject, year);
    }
    return {};
  }, [subject, audienceLevel, year, isUniversityLevel]);

  // Handle Level & Year logic
  useEffect(() => {
    if (isUniversityLevel) {
      const availLevels = Object.keys(uniCatalog.levels);
      setYears(availLevels);
      if (!availLevels.includes(year)) {
        // Default to 100 Level for university
        setYear(availLevels[0] || '100 Level');
        setSemester('');
        setSelectedCourseCode('');
        setTopic('');
        setSubTopic('');
      }
      return;
    }

    let availableYears: string[] = [];
    if (audienceLevel === AudienceLevel.Child) {
      // Use clean, authentic Nigerian / National primary levels without static base pollution
      availableYears = [...activeCountry.childLevels];
    } else if (audienceLevel === AudienceLevel.HighSchool) {
      availableYears = [...activeCountry.highSchoolLevels];
    } else {
      // University / Expert fallback
      const staticSubjectData = curriculumData[subject];
      if (staticSubjectData) {
        const staticYears = Object.keys(staticSubjectData);
        for (const sy of staticYears) {
          if (!availableYears.includes(sy)) {
            availableYears.push(sy);
          }
        }
      }
    }

    setYears(availableYears);

    if (availableYears.length > 0 && (!year || !availableYears.includes(year))) {
      // Default to first year of the tier
      setYear(availableYears[0]);
      setSemester('');
      setSelectedCourseCode('');
      setTopic('');
      setSubTopic('');
    }
  }, [subject, audienceLevel, isUniversityLevel, uniCatalog, activeCountry]);

  // Handle Semester logic
  useEffect(() => {
    if (isUniversityLevel) {
      if (year && uniCatalog.levels[year]) {
        const availSemesters = Object.keys(uniCatalog.levels[year].semesters);
        setSemesters(availSemesters);
        if (!availSemesters.includes(semester)) {
          const defaultSem = availSemesters[0] || '';
          setSemester(defaultSem);
        }
      } else {
        setSemesters([]);
        setSemester('');
      }
      return;
    }

    let availTerms: string[] = [];
    if (audienceLevel === AudienceLevel.Child) {
      availTerms = [...activeCountry.childTerms];
    } else if (audienceLevel === AudienceLevel.HighSchool) {
      availTerms = [...activeCountry.highSchoolTerms];
    }

    if (audienceLevel !== AudienceLevel.Child && audienceLevel !== AudienceLevel.HighSchool && year && curriculumData[subject]?.[year]) {
      const staticSemesters = Object.keys(curriculumData[subject]![year]);
      for (const ss of staticSemesters) {
        if (!availTerms.includes(ss)) {
          availTerms.push(ss);
        }
      }
    }

    setSemesters(availTerms);
    if (availTerms.length > 0 && (!semester || !availTerms.includes(semester))) {
      setSemester(availTerms[0]);
    }
  }, [subject, year, isUniversityLevel, uniCatalog, audienceLevel, activeCountry]);

  // Handle Course selection in University level
  useEffect(() => {
    if (isUniversityLevel && currentSemesterCourses) {
      if (currentSemesterCourses.courses.length > 0) {
        const exists = currentSemesterCourses.courses.some(c => c.code === selectedCourseCode);
        if (!exists) {
          const firstCourse = currentSemesterCourses.courses[0];
          setSelectedCourseCode(firstCourse.code);
        }
      } else {
        setSelectedCourseCode('');
      }
    }
  }, [isUniversityLevel, currentSemesterCourses]);

  // Handle Topics & Subtopics logic
  useEffect(() => {
    if (isUniversityLevel) {
      if (currentCourse) {
        const moduleTitles = currentCourse.modules.map(m => `Module ${m.moduleNumber}: ${m.title}`);
        setTopics(moduleTitles);
        if (!moduleTitles.includes(topic)) {
          setTopic(moduleTitles[0] || '');
        }
      } else {
        setTopics([]);
        setTopic('');
        setSubTopics([]);
        setSubTopic('');
      }
      return;
    }

    // Child Topics from real-world curriculum (guaranteed age-appropriate & NERDC-aligned)
    if (audienceLevel === AudienceLevel.Child) {
      const childKeys = Object.keys(realWorldTopicsMap);
      setTopics(childKeys);
      if (childKeys.length > 0 && (!topic || !childKeys.includes(topic))) {
        setTopic(childKeys[0]);
      }
      return;
    }

    // High School Topics from real-world curriculum (strictly aligned grade-by-grade JSS 1 to SSS 3)
    if (audienceLevel === AudienceLevel.HighSchool) {
      const hsKeys = Object.keys(realWorldTopicsMap);
      setTopics(hsKeys);
      if (hsKeys.length > 0 && (!topic || !hsKeys.includes(topic))) {
        setTopic(hsKeys[0]);
      }
      return;
    }

    // Fallback topics from static curriculum
    const realWorldKeys = Object.keys(realWorldTopicsMap);
    let combinedTopics: string[] = [...realWorldKeys];

    if (year && semester && curriculumData[subject]?.[year]?.[semester]) {
      const availableTopicsData = curriculumData[subject]![year]![semester];
      for (const t of Object.keys(availableTopicsData)) {
        if (!combinedTopics.includes(t)) {
          combinedTopics.push(t);
        }
      }
    }

    setTopics(combinedTopics);
    if (combinedTopics.length > 0 && (!topic || !combinedTopics.includes(topic))) {
      setTopic(combinedTopics[0]);
    }
  }, [subject, year, semester, isUniversityLevel, currentCourse, realWorldTopicsMap, audienceLevel]);
  
  useEffect(() => {
    if (isUniversityLevel) {
      if (currentCourse && topic) {
        const moduleMatch = currentCourse.modules.find(
          m => `Module ${m.moduleNumber}: ${m.title}` === topic
        );
        if (moduleMatch && moduleMatch.subtopics.length > 0) {
          setSubTopics(moduleMatch.subtopics);
          if (!moduleMatch.subtopics.includes(subTopic)) {
            setSubTopic(moduleMatch.subtopics[0] || '');
          }
        } else {
          setSubTopics([]);
          setSubTopic('');
        }
      } else {
        setSubTopics([]);
        setSubTopic('');
      }
      return;
    }

    // Child subtopics from real-world map
    if (audienceLevel === AudienceLevel.Child) {
      if (topic && realWorldTopicsMap[topic]) {
        const childSubs = realWorldTopicsMap[topic];
        setSubTopics(childSubs);
        if (childSubs.length > 0 && (!subTopic || !childSubs.includes(subTopic))) {
          setSubTopic(childSubs[0]);
        }
      } else {
        setSubTopics([]);
        setSubTopic('');
      }
      return;
    }

    // High School subtopics from real-world map
    if (audienceLevel === AudienceLevel.HighSchool) {
      if (topic && realWorldTopicsMap[topic]) {
        const hsSubs = realWorldTopicsMap[topic];
        setSubTopics(hsSubs);
        if (hsSubs.length > 0 && (!subTopic || !hsSubs.includes(subTopic))) {
          setSubTopic(hsSubs[0]);
        }
      } else {
        setSubTopics([]);
        setSubTopic('');
      }
      return;
    }

    if (topic) {
      const realSubs = realWorldTopicsMap[topic] || [];
      const staticSubs = (year && semester && curriculumData[subject]?.[year]?.[semester]?.[topic]) || [];
      const mergedSubs = Array.from(new Set([...realSubs, ...staticSubs]));
      setSubTopics(mergedSubs);
      if (mergedSubs.length > 0 && (!subTopic || !mergedSubs.includes(subTopic))) {
        setSubTopic(mergedSubs[0]);
      } else if (mergedSubs.length === 0) {
        setSubTopic('');
      }
    } else {
      setSubTopics([]);
      setSubTopic('');
    }
  }, [subject, year, semester, topic, isUniversityLevel, currentCourse, realWorldTopicsMap, audienceLevel]);

  const [isDragging, setIsDragging] = useState(false);

  const processImageFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            processImageFile(file);
            break;
          }
        }
      }
    }
  };
  
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleAutofillUniversityPrompt = (course: UniversityCourse, modTitle?: string, subtop?: string) => {
    const targetTopic = modTitle || (course.modules[0] ? `Module ${course.modules[0].moduleNumber}: ${course.modules[0].title}` : course.title);
    const targetSubtopic = subtop || (course.modules[0]?.subtopics[0] || '');
    
    const formatted = `Explain and provide a comprehensive university lecture solution on [${course.code}: ${course.title} (${course.units} Credit Units)] covering ${targetTopic}${targetSubtopic ? ` — specifically on '${targetSubtopic}'` : ''}. Include theoretical principles, mathematical derivations/formulas, worked step-by-step examples, and practical applications.`;
    setPrompt(formatted);
  };

  const handleAutofillSchoolPrompt = (top: string, sub: string) => {
    const levelLabel = year || (audienceLevel === AudienceLevel.Child ? 'Primary / Basic School' : 'High School / Secondary');
    if (audienceLevel === AudienceLevel.Child) {
      const formatted = `Please explain [${subject}: ${top}${sub ? ` — ${sub}` : ''}] for a ${levelLabel} pupil in the simplest, most gentle, loving, and easy-to-understand way. Use simple English words, joyful everyday Nigerian examples (like sharing sweet mangoes, oranges, biscuits, or ₦ Naira notes), step-by-step easy magic, a fun memory tip, and a simple practice question with answer that a child can easily understand and remember!`;
      setPrompt(formatted);
      return;
    }
    if (audienceLevel === AudienceLevel.HighSchool) {
      const isJunior = (year || '').includes('JSS') || (year || '').includes('Basic 7') || (year || '').includes('Basic 8') || (year || '').includes('Basic 9') || (year || '').includes('BECE');
      const levelStandard = isJunior ? 'Junior Secondary (BECE / Basic 7–9 Standard)' : 'Senior Secondary (WASSCE / WAEC / NECO / JAMB Standard)';
      const formatted = `Provide a comprehensive, step-by-step lesson explanation and worked exam solutions for [${subject}: ${top}${sub ? ` — ${sub}` : ''}] tailored specifically for ${levelLabel} students (${levelStandard}) according to the Nigerian NERDC curriculum. Keep explanations strictly at the student's exact class level without overwhelming college jargon, provide clear definitions, step-by-step calculation working, and exam-style practice questions with complete answers.`;
      setPrompt(formatted);
      return;
    }
    const formatted = `Provide a comprehensive, step-by-step lesson explanation and worked solutions for [${subject}: ${top}${sub ? ` — ${sub}` : ''}] suited for ${levelLabel} level aligned with the ${activeCountry.name} (${activeCountry.curriculumName}) syllabus. Include clear explanations, illustrative examples, and exam-standard practice problems.`;
    setPrompt(formatted);
  };

  const commonSelectClasses = "w-full bg-[var(--color-surface-subtle)] border border-[var(--color-border)] rounded-md p-3 text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none transition placeholder:text-[var(--color-text-subtle)] disabled:opacity-50 text-sm md:text-base";
  const commonLabelClasses = "block text-sm font-bold text-[var(--color-text-secondary)] mb-1.5";

  return (
    <div className="bg-[var(--color-surface)]/90 rounded-xl p-5 md:p-6 flex-grow flex flex-col shadow-lg border border-[var(--color-border)]/80 min-h-[300px] lg:min-h-0 backdrop-blur-sm">
      <div className="space-y-5">
        {/* Global Country & Curriculum Indicator */}
        <div className="bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-indigo-900/10 border border-amber-300/40 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow-sm">{activeCountry.flag}</span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs md:text-sm font-bold text-[var(--color-text-main)]">
                  {activeCountry.name} Standard
                </span>
                <span className="text-[10px] bg-[var(--color-accent)] text-white font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {activeCountry.curriculumName}
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5 font-medium">
                National Exam Boards: <strong className="text-[var(--color-text-main)]">{activeCountry.examBoards.slice(0, 3).join(' · ')}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <label htmlFor="country-selector" className="text-xs text-[var(--color-text-muted)] font-bold whitespace-nowrap">
              Change Country:
            </label>
            <select
              id="country-selector"
              value={countryCode}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-2.5 py-1.5 text-xs font-bold text-[var(--color-text-main)] focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none cursor-pointer shadow-xs"
            >
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject & Audience Level Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="subject-select" className={commonLabelClasses}>
              📚 Academic Subject / Discipline
            </label>
            <select
              id="subject-select"
              value={subject}
              onChange={(e) => setSubject(e.target.value as Subject)}
              className={commonSelectClasses}
            >
              {ALL_SUBJECTS.slice().sort().map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="audience-level-select" className={commonLabelClasses}>
              🎓 Educational Audience Level
            </label>
            <select
              id="audience-level-select"
              value={audienceLevel}
              onChange={(e) => setAudienceLevel(e.target.value as AudienceLevel)}
              className={commonSelectClasses}
            >
              {Object.values(AudienceLevel).map((level) => (
                <option key={level} value={level}>
                  {level === AudienceLevel.University ? '🏛️ University (Undergraduate & NUC BMAS)' :
                   level === AudienceLevel.Expert ? '🔬 Post-Graduate / Expert Research' :
                   level === AudienceLevel.HighSchool ? '🏫 High School / Secondary (WAEC/NECO/JAMB)' :
                   '🌱 Child & Primary Basic School'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* UNIVERSITY ACADEMIC SETTING: SEMESTER -> COURSE UNITS SYSTEM */}
        {/* ------------------------------------------------------------- */}
        {isUniversityLevel ? (
          <div className="bg-gradient-to-br from-amber-500/10 via-blue-500/5 to-slate-900/5 border border-amber-400/40 rounded-xl p-4 md:p-5 space-y-4 shadow-sm">
            {/* University Faculty & Degree Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-amber-300/30 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 border border-amber-400/50">
                    {uniCatalog.faculty}
                  </span>
                  <span className="text-xs font-semibold text-blue-900">
                    {uniCatalog.department}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-[var(--color-text-main)] mt-1">
                  🏛️ {uniCatalog.degreeName} Curriculum
                </h3>
              </div>
              <div className="text-xs text-[var(--color-text-muted)] bg-white/70 px-2.5 py-1 rounded-md border border-slate-200 self-start sm:self-auto font-medium">
                Nigerian & International University Standards
              </div>
            </div>

            {/* Level and Semester Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="uni-level-select" className={commonLabelClasses}>
                  1. Select Academic Level
                </label>
                <select
                  id="uni-level-select"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={commonSelectClasses}
                >
                  {uniLevelKeys.map(lvl => (
                    <option key={lvl} value={lvl}>
                      {uniCatalog.levels[lvl]?.levelName || lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="uni-semester-select" className={commonLabelClasses}>
                  2. Select Semester
                </label>
                <select
                  id="uni-semester-select"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className={commonSelectClasses}
                  disabled={!year}
                >
                  {semesters.map(sem => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Semester Course Units Catalog */}
            {currentSemesterCourses && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label htmlFor="course-unit-select" className="text-sm font-bold text-[var(--color-text-secondary)] flex items-center gap-1.5">
                    <span>3. Registered Course Unit</span>
                    <span className="text-xs font-normal text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                      ⚡ Total Load: {currentSemesterCourses.totalUnits} Credit Units ({currentSemesterCourses.courses.length} Courses)
                    </span>
                  </label>
                </div>

                <select
                  id="course-unit-select"
                  value={selectedCourseCode}
                  onChange={(e) => setSelectedCourseCode(e.target.value)}
                  className={commonSelectClasses}
                >
                  {currentSemesterCourses.courses.map((course) => (
                    <option key={course.code} value={course.code}>
                      [{course.code}] {course.title} — ({course.units} Credit {course.units === 1 ? 'Unit' : 'Units'}) [{course.status}]
                    </option>
                  ))}
                </select>

                {/* Selected Course Unit Card Badge */}
                {currentCourse && (
                  <div className="bg-white/95 rounded-lg p-3.5 border border-amber-400/50 shadow-sm space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-extrabold text-blue-900 bg-blue-100 px-2.5 py-1 rounded border border-blue-300">
                          {currentCourse.code}
                        </span>
                        <h4 className="font-bold text-sm md:text-base text-[var(--color-text-main)]">
                          {currentCourse.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white shadow-xs">
                          {currentCourse.units} Credit {currentCourse.units === 1 ? 'Unit' : 'Units'}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                          currentCourse.status === 'Compulsory' ? 'bg-red-50 text-red-700 border-red-200' :
                          currentCourse.status === 'General Studies' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          {currentCourse.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--color-text-muted)] italic leading-relaxed">
                      "{currentCourse.description}"
                    </p>

                    {/* Course Module (Topic) and Subtopic Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-slate-100">
                      <div>
                        <label htmlFor="uni-module-select" className="block text-xs font-bold text-slate-700 mb-1">
                          Course Module / Lecture Topic
                        </label>
                        <select
                          id="uni-module-select"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="w-full bg-[var(--color-surface-subtle)] border border-slate-300 rounded p-2 text-xs md:text-sm text-[var(--color-text-main)] focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          {topics.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="uni-subtopic-select" className="block text-xs font-bold text-slate-700 mb-1">
                          Lecture Subtopic / Concept
                        </label>
                        <select
                          id="uni-subtopic-select"
                          value={subTopic}
                          onChange={(e) => setSubTopic(e.target.value)}
                          className="w-full bg-[var(--color-surface-subtle)] border border-slate-300 rounded p-2 text-xs md:text-sm text-[var(--color-text-main)] focus:ring-2 focus:ring-amber-500 focus:outline-none"
                          disabled={subTopics.length === 0}
                        >
                          {subTopics.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Quick Action to Insert into Question */}
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => handleAutofillUniversityPrompt(currentCourse, topic, subTopic)}
                        className="text-xs font-semibold text-amber-700 hover:text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 px-3 py-1.5 rounded-md border border-amber-300 transition-colors flex items-center gap-1.5"
                        title="Click to automatically construct a university-grade inquiry for this course"
                      >
                        <span>📝 Insert Course Unit & Topic into Question</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* ------------------------------------------------------------- */
          /* STANDARD BASIC & HIGH SCHOOL CURRICULUM SELECTOR */
          /* ------------------------------------------------------------- */
          <div className="bg-gradient-to-br from-blue-500/5 via-amber-500/5 to-slate-500/5 border border-[var(--color-border)] rounded-xl p-4 md:p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[var(--color-border)] gap-2">
              <div>
                <h3 className="text-sm md:text-base font-bold text-[var(--color-text-main)] flex items-center gap-2">
                  <span>{audienceLevel === AudienceLevel.Child ? '🌱' : '🏫'}</span>
                  <span>{audienceLevel === AudienceLevel.Child ? 'Primary & Basic Education Syllabus' : 'Secondary & High School Exam Syllabus'}</span>
                </h3>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  {audienceLevel === AudienceLevel.Child 
                    ? `Foundational learning aligned with ${activeCountry.name} standard primary milestones.`
                    : `National & International secondary standards (WAEC / NECO / JAMB / GCSE / AP / SAT).`}
                </p>
                {audienceLevel === AudienceLevel.Child && (
                  <div className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    <span>✨ Simplified & Authentic Nigerian Basic 1–6 (NERDC) Curriculum — tailored so any young child can read, understand, and excel!</span>
                  </div>
                )}
                {audienceLevel === AudienceLevel.HighSchool && (
                  <div className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-blue-800 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    <span>🎯 Calibrated JSS 1–3 (Junior / BECE) & SSS 1–3 (Senior / WAEC / JAMB) Syllabi — exact class-level topics without overwhelming complexity!</span>
                  </div>
                )}
              </div>
              <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2.5 py-1 rounded-md border border-amber-200 self-start sm:self-auto">
                {activeCountry.flag} {activeCountry.name}
              </span>
            </div>

            {years.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="year-select" className={commonLabelClasses}>
                    {audienceLevel === AudienceLevel.Child ? '1. Class / Basic Grade' : '1. Academic Grade / Class Level'}
                  </label>
                  <select id="year-select" value={year} onChange={(e) => setYear(e.target.value)} className={commonSelectClasses}>
                    <option value="">Select {audienceLevel === AudienceLevel.Child ? 'Class Level...' : 'Grade...'}</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="semester-select" className={commonLabelClasses}>
                    {audienceLevel === AudienceLevel.Child ? '2. School Term' : '2. Term / Semester'}
                  </label>
                  <select id="semester-select" value={semester} onChange={(e) => setSemester(e.target.value)} className={commonSelectClasses} disabled={!year}>
                    <option value="">Select Term...</option>
                    {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}

            {topics.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="topic-select" className={commonLabelClasses}>
                    3. Standard Curriculum Topic
                  </label>
                  <select id="topic-select" value={topic} onChange={(e) => setTopic(e.target.value)} className={commonSelectClasses}>
                    <option value="">Select Topic...</option>
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="subtopic-select" className={commonLabelClasses}>
                    4. Lesson Subtopic / Focus
                  </label>
                  <select id="subtopic-select" value={subTopic} onChange={(e) => setSubTopic(e.target.value)} className={commonSelectClasses} disabled={subTopics.length === 0}>
                    <option value="">{subTopics.length === 0 ? 'General Topic Coverage' : 'Select Subtopic...'}</option>
                    {subTopics.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>
              </div>
            )}

            {topic && (
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => handleAutofillSchoolPrompt(topic, subTopic)}
                  className="text-xs font-semibold text-[var(--color-text-accent)] hover:text-amber-800 bg-amber-100/90 hover:bg-amber-200 px-3 py-1.5 rounded-md border border-amber-300 transition-colors flex items-center gap-1.5 shadow-2xs"
                  title="Click to automatically construct an aligned lesson question"
                >
                  <span>📝 Insert Topic & Syllabus into Question</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tutor Persona & Video Studio Quick Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-blue-500/5 border border-amber-300/40">
          <div className="flex items-center gap-2.5">
            {activePersona && (
              <div className={`w-8 h-8 rounded-lg ${activePersona.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 border ${activePersona.avatarBorder}`}>
                {activePersona.avatarInitials}
              </div>
            )}
            <div className="text-xs">
              <div className="font-bold text-[var(--color-text-main)] flex items-center gap-1.5">
                <span>Guided by {activePersona?.name || "God's Glory Faculty"}</span>
                <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-medium border border-amber-300">
                  {activePersona?.badge || 'Master Mentor'}
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-1">
                {activePersona?.title || 'Academic Director'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onOpenTutorModal && (
              <button
                type="button"
                onClick={onOpenTutorModal}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-main)] border border-[var(--color-border)] shadow-2xs transition-colors flex items-center gap-1"
                title="Change subject-matter expert persona"
              >
                <span>🎓 Switch Tutor</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Prompt Area */}
        <div>
          <label htmlFor="prompt-textarea" className={commonLabelClasses}>
            Your Academic Question or Problem Statement
          </label>
          <textarea
            id="prompt-textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onPaste={handlePaste}
            placeholder={
              isUniversityLevel
                ? "Type your question here, or paste / load a photo of the problem below..."
                : "Type your academic question here, or paste / load a photo from your textbook or notes below..."
            }
            rows={4}
            className={`${commonSelectClasses} resize-y font-normal`}
          />
        </div>

        {/* Photo / Diagram Upload */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="file-upload" className={`${commonLabelClasses} mb-0`}>
              📸 Load Photo of Question or Diagram (Optional)
            </label>
            {imagePreviewUrl && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-xs text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                Remove Photo
              </button>
            )}
          </div>

          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mt-1 relative flex justify-center px-4 py-4 sm:px-6 sm:py-5 border-2 rounded-xl transition-all duration-200 ${
              isDragging
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 scale-[1.01]'
                : imagePreviewUrl
                ? 'border-emerald-500/50 bg-emerald-500/5'
                : 'border-[var(--color-border)] border-dashed bg-[var(--color-surface-subtle)]/60 hover:bg-[var(--color-surface-subtle)] hover:border-[var(--color-accent)]/50'
            }`}
          >
            <input 
              id="file-upload" 
              name="file-upload" 
              type="file" 
              className="sr-only" 
              onChange={handleFileChange} 
              accept="image/*" 
            />

            {imagePreviewUrl ? (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <div className="relative group shrink-0">
                  <img 
                    src={imagePreviewUrl} 
                    alt="Loaded Question" 
                    className="h-28 w-auto max-w-[200px] object-contain rounded-lg shadow-md border-2 border-emerald-500 bg-white" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-white bg-amber-600 hover:bg-amber-700 text-xs font-bold py-1 px-2.5 rounded shadow transition-colors"
                    >
                      Change Photo
                    </label>
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                    <span>✓</span>
                    <span>Photo of Question Loaded Successfully</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    The AI tutor will analyze every equation, formula, diagram, or handwritten problem in this image.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-xs">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer font-bold text-[var(--color-text-accent)] hover:underline"
                    >
                      Choose different photo
                    </label>
                    <span className="text-slate-300">·</span>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <label 
                htmlFor="file-upload"
                className="cursor-pointer space-y-2 text-center w-full flex flex-col items-center justify-center py-1"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-text-accent)] flex items-center justify-center text-2xl transition-transform hover:scale-105 shadow-2xs">
                  <UploadIcon className="h-6 w-6 text-[var(--color-icon-primary)]" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-[var(--color-text-main)]">
                    <span className="text-[var(--color-text-accent)] underline underline-offset-2">Click to load a photo</span> or drag & drop here
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Take a picture of a textbook question, handwriting, or paste screenshot (Ctrl+V)
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] font-semibold text-[var(--color-text-subtle)] shadow-2xs">
                  <span>📸 Camera & Photo Library supported (PNG, JPG, WEBP)</span>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button & Action Bar */}
      <div className="mt-auto pt-5 space-y-2">
        <button
          onClick={onSubmit}
          disabled={isLoading || (!prompt.trim() && !imagePreviewUrl)}
          className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-3.5 px-4 rounded-lg transition-all duration-200 disabled:bg-[var(--color-accent-disabled)] disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-md hover:shadow-lg text-base"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Solving Problem & Generating Visuals...
            </>
          ) : (
            '⚡ Solve Problem & Generate Visual Solution'
          )}
        </button>

        {!isLoggedIn && (
          <p className="text-center text-xs text-[var(--color-text-subtle)]">
            💡 Using as Guest Scholar. <button type="button" onClick={onLoginClick} className="text-amber-500 font-bold hover:underline">Log in</button> to save search history & track quizzes.
          </p>
        )}
      </div>
    </div>
  );
};

export default InputForm;
