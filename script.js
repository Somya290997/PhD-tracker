const STORAGE_KEY = "responsive_phd_tracker";

const initialState = {
  studentName: "",
  programName: "",
  advisorName: "",
  entrySemester: "",
  orientation: false,
  coreCredits: 0,
  methodsSeminar: false,
  qualifyingExam: false,
  committeeFormation: false,
  proposalDefense: false,
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
    note: "Aim to complete by the sixth semester.",
    offset: 5,
    className: "deadline-card--exam",
  },
  {
    id: "proposal",
    title: "Proposal defense",
    note: "Usually planned around the eighth semester.",
    offset: 7,
    className: "deadline-card--proposal",
  },
  {
    id: "defense",
    title: "Final defense",
    note: "A twelfth-semester finish is a common target.",
    offset: 11,
    className: "deadline-card--defense",
  },
];

const milestones = [
  {
    key: "orientation",
    label: "Program orientation",
    dependency: "None",
    renderInput: () => renderCheckbox("orientation"),
    status: () => (state.orientation ? "Completed" : "Not started"),
    complete: () => state.orientation,
  },
  {
    key: "coreCredits",
    label: "Core coursework credits",
    dependency: "None",
    renderInput: () => renderNumber("coreCredits", 30, "30 credits"),
    status: () => countStatus(state.coreCredits, 30),
    complete: () => state.coreCredits >= 30,
  },
  {
    key: "methodsSeminar",
    label: "Research methods seminar",
    dependency: "None",
    renderInput: () => renderCheckbox("methodsSeminar"),
    status: () => (state.methodsSeminar ? "Completed" : "Not started"),
    complete: () => state.methodsSeminar,
  },
  {
    key: "qualifyingExam",
    label: "Qualifying exam",
    dependency: "18+ credits and methods seminar",
    renderInput: () => renderCheckbox("qualifyingExam", eligibility.qualifyingExam()),
    status: () => gatedStatus("qualifyingExam", eligibility.qualifyingExam()),
    complete: () => state.qualifyingExam,
  },
  {
    key: "committeeFormation",
    label: "Dissertation committee formed",
    dependency: "Qualifying exam",
    renderInput: () =>
      renderCheckbox("committeeFormation", eligibility.committeeFormation()),
    status: () => gatedStatus("committeeFormation", eligibility.committeeFormation()),
    complete: () => state.committeeFormation,
  },
  {
    key: "proposalDefense",
    label: "Proposal defense",
    dependency: "Qualifying exam, committee formed, and 30 credits",
    renderInput: () => renderCheckbox("proposalDefense", eligibility.proposalDefense()),
    status: () => gatedStatus("proposalDefense", eligibility.proposalDefense()),
    complete: () => state.proposalDefense,
  },
  {
    key: "dissertationDraft",
    label: "Dissertation draft ready",
    dependency: "Proposal defense",
    renderInput: () =>
      renderCheckbox("dissertationDraft", eligibility.dissertationDraft()),
    status: () => gatedStatus("dissertationDraft", eligibility.dissertationDraft()),
    complete: () => state.dissertationDraft,
  },
  {
    key: "finalDefense",
    label: "Final dissertation defense",
    dependency: "Proposal defense and dissertation draft",
    renderInput: () => renderCheckbox("finalDefense", eligibility.finalDefense()),
    status: () => gatedStatus("finalDefense", eligibility.finalDefense()),
    complete: () => state.finalDefense,
  },
];

const eligibility = {
  qualifyingExam() {
    return state.coreCredits >= 18 && state.methodsSeminar;
  },
  committeeFormation() {
    return state.qualifyingExam;
  },
  proposalDefense() {
    return state.qualifyingExam && state.committeeFormation && state.coreCredits >= 30;
  },
  dissertationDraft() {
    return state.proposalDefense;
  },
  finalDefense() {
    return state.proposalDefense && state.dissertationDraft;
  },
};

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { ...initialState };

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
      <span>${state[key] ? "Completed" : "Mark complete"}</span>
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
          <h3>${milestone.label}</h3>
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
  ["studentName", "programName", "advisorName", "entrySemester"].forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    input.value = state[fieldId];
  });
}

function renderProfileSummary() {
  const title = document.getElementById("summaryTitle");
  const body = document.getElementById("summaryBody");

  if (!state.studentName && !state.programName && !state.advisorName) {
    title.textContent = "No student profile yet";
    body.textContent = "Add your basic details to personalize the tracker.";
    return;
  }

  const name = state.studentName || "Unnamed student";
  const program = state.programName || "PhD program";
  const advisor = state.advisorName ? `with ${state.advisorName}` : "with advisor TBD";
  const semester = state.entrySemester || "an upcoming semester";

  title.textContent = `${name} · ${program}`;
  body.textContent = `Tracking progress for ${name}, starting in ${semester}, ${advisor}.`;
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
  const completedCount = document.getElementById("completedCount");
  const nextDeadlineLabel = document.getElementById("nextDeadlineLabel");

  completedCount.textContent = `${completedMilestonesCount()} / ${milestones.length}`;

  const next = currentNextDeadline();
  if (!next) {
    nextDeadlineLabel.textContent = state.entrySemester
      ? "All planned deadlines met"
      : "Select a semester";
    return;
  }

  nextDeadlineLabel.textContent = state.entrySemester
    ? `${next.title} · ${semesterLabelAfter(state.entrySemester, next.offset)}`
    : next.title;
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
