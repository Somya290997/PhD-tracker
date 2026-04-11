const STORAGE_KEY = "responsive_phd_tracker";

const initialState = {
  studentName: "",
  programName: "",
  advisorName: "",
  entrySemester: "",
  orientation: false,
  coreCredits: 0,
  methodsSeminar: false,
  professionalDevelopment: false,
  qualifyingExam: false,
  committeeFormation: false,
  proposalDefense: false,
  annualReviews: 0,
  publications: 0,
  dissertationDraft: false,
  finalDefense: false,
};

const state = loadState();

const semesterRules = [
  {
    id: "coursework",
    title: "Core coursework",
    note: "Finish within the first five semesters.",
    offset: 4,
    className: "deadline-card--coursework",
  },
  {
    id: "exam",
    title: "Qualifying exam",
    note: "Target completion by the end of the sixth semester.",
    offset: 5,
    className: "deadline-card--exam",
  },
  {
    id: "proposal",
    title: "Proposal defense",
    note: "Schedule around the eighth semester after committee formation.",
    offset: 7,
    className: "deadline-card--proposal",
  },
  {
    id: "defense",
    title: "Dissertation defense",
    note: "A twelfth-semester finish keeps the final stretch manageable.",
    offset: 11,
    className: "deadline-card--defense",
  },
];

const milestones = [
  {
    key: "orientation",
    label: "Program orientation",
    type: "Onboarding",
    dependency: "None",
    renderInput: () => renderCheckbox("orientation"),
    status: () => (state.orientation ? "Completed" : "Not started"),
    complete: () => state.orientation,
  },
  {
    key: "coreCredits",
    label: "Core coursework credits",
    type: "Coursework",
    dependency: "None",
    renderInput: () => renderNumber("coreCredits", 30, "30 credits"),
    status: () => countStatus(state.coreCredits, 30),
    complete: () => state.coreCredits >= 30,
  },
  {
    key: "methodsSeminar",
    label: "Research methods seminar",
    type: "Coursework",
    dependency: "None",
    renderInput: () => renderCheckbox("methodsSeminar"),
    status: () => (state.methodsSeminar ? "Completed" : "Not started"),
    complete: () => state.methodsSeminar,
  },
  {
    key: "professionalDevelopment",
    label: "Teaching or professional development",
    type: "Professional",
    dependency: "None",
    renderInput: () => renderCheckbox("professionalDevelopment"),
    status: () => (state.professionalDevelopment ? "Completed" : "Not started"),
    complete: () => state.professionalDevelopment,
  },
  {
    key: "qualifyingExam",
    label: "Qualifying exam",
    type: "Exam",
    dependency: "18+ core credits, methods seminar, and professional development",
    renderInput: () => renderCheckbox("qualifyingExam", eligibility.qualifyingExam()),
    status: () => gatedStatus("qualifyingExam", eligibility.qualifyingExam()),
    complete: () => state.qualifyingExam,
  },
  {
    key: "committeeFormation",
    label: "Dissertation committee formed",
    type: "Governance",
    dependency: "Qualifying exam",
    renderInput: () => renderCheckbox("committeeFormation", eligibility.committeeFormation()),
    status: () => gatedStatus("committeeFormation", eligibility.committeeFormation()),
    complete: () => state.committeeFormation,
  },
  {
    key: "proposalDefense",
    label: "Proposal defense",
    type: "Defense",
    dependency: "Qualifying exam, committee formed, and 30 core credits",
    renderInput: () => renderCheckbox("proposalDefense", eligibility.proposalDefense()),
    status: () => gatedStatus("proposalDefense", eligibility.proposalDefense()),
    complete: () => state.proposalDefense,
  },
  {
    key: "annualReviews",
    label: "Annual reviews completed",
    type: "Review",
    dependency: "Ongoing each year",
    renderInput: () => renderNumber("annualReviews", 4, "4 reviews"),
    status: () => countStatus(state.annualReviews, 4),
    complete: () => state.annualReviews >= 4,
  },
  {
    key: "publications",
    label: "Publication submissions",
    type: "Research",
    dependency: "Recommended before the final writing push",
    renderInput: () => renderNumber("publications", 2, "2 submissions"),
    status: () => countStatus(state.publications, 2),
    complete: () => state.publications >= 2,
  },
  {
    key: "dissertationDraft",
    label: "Dissertation draft ready",
    type: "Writing",
    dependency: "Proposal defense, 2 annual reviews, and 1 submission",
    renderInput: () => renderCheckbox("dissertationDraft", eligibility.dissertationDraft()),
    status: () => gatedStatus("dissertationDraft", eligibility.dissertationDraft()),
    complete: () => state.dissertationDraft,
  },
  {
    key: "finalDefense",
    label: "Final dissertation defense",
    type: "Defense",
    dependency: "Proposal defense, draft ready, 4 annual reviews, and 2 submissions",
    renderInput: () => renderCheckbox("finalDefense", eligibility.finalDefense()),
    status: () => gatedStatus("finalDefense", eligibility.finalDefense()),
    complete: () => state.finalDefense,
  },
];

const eligibility = {
  qualifyingExam() {
    return (
      state.coreCredits >= 18 &&
      state.methodsSeminar &&
      state.professionalDevelopment
    );
  },
  committeeFormation() {
    return state.qualifyingExam;
  },
  proposalDefense() {
    return state.qualifyingExam && state.committeeFormation && state.coreCredits >= 30;
  },
  dissertationDraft() {
    return state.proposalDefense && state.annualReviews >= 2 && state.publications >= 1;
  },
  finalDefense() {
    return (
      state.proposalDefense &&
      state.dissertationDraft &&
      state.annualReviews >= 4 &&
      state.publications >= 2
    );
  },
};

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { ...initialState };
  }

  try {
    return { ...initialState, ...JSON.parse(raw) };
  } catch (error) {
    return { ...initialState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function countStatus(value, goal) {
  if (value >= goal) return "Completed";
  if (value > 0) return "In progress";
  return "Not started";
}

function gatedStatus(key, isEligible) {
  if (state[key]) return "Completed";
  return isEligible ? "Eligible" : "Not eligible";
}

function renderCheckbox(key, isEligible = true) {
  const disabledClass = isEligible || state[key] ? "" : "input-disabled";

  return `
    <label class="input-inline ${disabledClass}">
      <input
        type="checkbox"
        data-key="${key}"
        ${state[key] ? "checked" : ""}
        ${isEligible || state[key] ? "" : "disabled"}
      />
      <span>${state[key] ? "Marked complete" : "Mark complete"}</span>
    </label>
  `;
}

function renderNumber(key, max, caption) {
  return `
    <div>
      <input
        type="number"
        data-key="${key}"
        min="0"
        max="${max}"
        value="${state[key]}"
      />
      <div class="credit-caption">Goal: ${caption}</div>
    </div>
  `;
}

function getStatusClass(status) {
  return `status-badge--${status.toLowerCase().replace(/\s+/g, "-")}`;
}

function renderStatus(status) {
  return `<span class="status-badge ${getStatusClass(status)}">${status}</span>`;
}

function renderTracker() {
  const tableBody = document.getElementById("trackerTableBody");
  const cardWrap = document.getElementById("trackerCards");

  tableBody.innerHTML = milestones
    .map((milestone) => {
      const status = milestone.status();

      return `
        <tr>
          <td><strong>${milestone.label}</strong></td>
          <td class="tracker-table__type">${milestone.type}</td>
          <td>${milestone.renderInput()}</td>
          <td>${renderStatus(status)}</td>
          <td class="tracker-table__dependency">${milestone.dependency}</td>
        </tr>
      `;
    })
    .join("");

  cardWrap.innerHTML = milestones
    .map((milestone) => {
      const status = milestone.status();

      return `
        <article class="tracker-card">
          <div class="tracker-card__meta">
            <div>
              <h3>${milestone.label}</h3>
            </div>
            <span class="tracker-card__type">${milestone.type}</span>
          </div>
          <div class="tracker-card__row">
            <span>Input</span>
            ${milestone.renderInput()}
          </div>
          <div class="tracker-card__row">
            <span>Status</span>
            ${renderStatus(status)}
          </div>
          <div class="tracker-card__row">
            <span>Dependency</span>
            <p class="tracker-card__dependency">${milestone.dependency}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function setupProfileFields() {
  const profileFields = [
    "studentName",
    "programName",
    "advisorName",
    "entrySemester",
  ];

  profileFields.forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    input.value = state[fieldId];
  });
}

function renderProfileSummary() {
  const title = document.querySelector(".profile-summary__title");
  const body = document.querySelector(".profile-summary__body");

  if (!state.studentName && !state.programName && !state.advisorName) {
    title.textContent = "No student profile yet";
    body.textContent =
      "Add your name, program, advisor, and start term to tailor the dashboard.";
    return;
  }

  const name = state.studentName || "Unnamed student";
  const program = state.programName || "PhD program";
  const advisor = state.advisorName ? `with ${state.advisorName}` : "with advisor TBD";
  const semester = state.entrySemester || "an upcoming semester";

  title.textContent = `${name} · ${program}`;
  body.textContent = `This roadmap is configured for ${name}, starting in ${semester}, ${advisor}. Update these fields anytime and the tracker will keep the same saved progress.`;
}

function generateSemesterOptions() {
  const select = document.getElementById("entrySemester");
  const terms = [];

  for (let year = 2022; year <= 2036; year += 1) {
    terms.push(`Spring ${year}`, `Fall ${year}`);
  }

  terms.forEach((term) => {
    const option = document.createElement("option");
    option.value = term;
    option.textContent = term;
    select.appendChild(option);
  });
}

function semesterLabelAfter(start, offset) {
  if (!start) return "";

  const [term, yearText] = start.split(" ");
  const startIndex = term === "Spring" ? 0 : 1;
  const year = Number(yearText);
  const absolute = startIndex + offset;
  const targetTerm = absolute % 2 === 0 ? "Spring" : "Fall";
  const targetYear = year + Math.floor(absolute / 2);

  return `${targetTerm} ${targetYear}`;
}

function renderDeadlines() {
  const wrap = document.getElementById("deadlineCards");

  if (!state.entrySemester) {
    wrap.innerHTML = `
      <article class="deadline-placeholder">
        <p>Select an entry semester to generate your roadmap.</p>
      </article>
    `;
    return;
  }

  wrap.innerHTML = semesterRules
    .map((rule) => {
      const label = semesterLabelAfter(state.entrySemester, rule.offset);

      return `
        <article class="deadline-card ${rule.className}">
          <p>${rule.title}</p>
          <strong>${label}</strong>
          <h3>${rule.note}</h3>
        </article>
      `;
    })
    .join("");
}

function completedMilestonesCount() {
  return milestones.filter((milestone) => milestone.complete()).length;
}

function currentNextDeadline() {
  if (!state.entrySemester) return null;

  const completionMap = {
    coursework: state.coreCredits >= 30,
    exam: state.qualifyingExam,
    proposal: state.proposalDefense,
    defense: state.finalDefense,
  };

  return semesterRules.find((rule) => !completionMap[rule.id]) || null;
}

function renderOverview() {
  const total = milestones.length;
  const completed = completedMilestonesCount();
  const percent = Math.round((completed / total) * 100);
  const ring = document.getElementById("progressRing");
  const ringLabel = document.getElementById("progressPercent");
  const completedCount = document.getElementById("completedCount");
  const readinessLabel = document.getElementById("readinessLabel");
  const readinessNote = document.getElementById("readinessNote");
  const nextDeadlineLabel = document.getElementById("nextDeadlineLabel");
  const nextDeadlineNote = document.getElementById("nextDeadlineNote");
  const overviewList = document.getElementById("overviewList");

  ring.style.setProperty("--progress", `${(percent / 100) * 360}deg`);
  ringLabel.textContent = `${percent}%`;
  completedCount.textContent = `${completed} / ${total}`;

  let readiness = "Building momentum";
  let readinessBody = "Start with your profile and core requirements";

  if (state.finalDefense) {
    readiness = "Graduation ready";
    readinessBody = "Every major milestone in this tracker is marked complete.";
  } else if (state.proposalDefense) {
    readiness = "Writing phase";
    readinessBody = "Shift attention toward drafting, reviews, and defense prep.";
  } else if (state.qualifyingExam) {
    readiness = "Committee phase";
    readinessBody = "You can focus on committee alignment and your proposal.";
  } else if (eligibility.qualifyingExam()) {
    readiness = "Exam eligible";
    readinessBody = "Core requirements are lined up for the qualifying exam.";
  }

  readinessLabel.textContent = readiness;
  readinessNote.textContent = readinessBody;

  const next = currentNextDeadline();
  if (!next) {
    nextDeadlineLabel.textContent = state.entrySemester
      ? "All planned deadlines met"
      : "Select an entry semester";
    nextDeadlineNote.textContent = state.entrySemester
      ? "Keep using the tracker for writing and review prep."
      : "Recommended milestones update instantly";
  } else {
    nextDeadlineLabel.textContent = next.title;
    nextDeadlineNote.textContent = semesterLabelAfter(state.entrySemester, next.offset);
  }

  overviewList.innerHTML = [
    `${Math.max(0, 30 - state.coreCredits)} core credits remaining until coursework is complete.`,
    `${Math.max(0, 4 - state.annualReviews)} annual review milestone(s) remaining.`,
    `${Math.max(0, 2 - state.publications)} publication submission(s) remaining before the final defense target.`,
  ]
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function handleInputChange(event) {
  const target = event.target;
  const key = target.dataset.key || target.id;

  if (!key || !(key in state)) return;

  if (target.type === "checkbox") {
    state[key] = target.checked;
  } else if (target.type === "number") {
    const nextValue = Number.parseInt(target.value, 10) || 0;
    const max = Number.parseInt(target.max, 10) || nextValue;
    state[key] = Math.max(0, Math.min(nextValue, max));
  } else {
    state[key] = target.value;
  }

  saveState();
  renderAll();
}

function resetTracker() {
  Object.assign(state, initialState);
  saveState();
  renderAll();
  setupProfileFields();
}

function bindEvents() {
  document.addEventListener("input", handleInputChange);
  document.addEventListener("change", handleInputChange);
  document.getElementById("resetTracker").addEventListener("click", resetTracker);
}

function renderAll() {
  renderProfileSummary();
  renderTracker();
  renderDeadlines();
  renderOverview();
}

generateSemesterOptions();
setupProfileFields();
bindEvents();
renderAll();
