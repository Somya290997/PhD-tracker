const state = {
  entrySemester: "",
  profDev6000: false,
  profDev6100: false,
  profDev6200: false,
  bin1: "",
  bin2: "",
  bin3: "",
  csDepthClass: "",
  nonCsCredits: 0,
  areaExam: false,
  proposalDefense: false,
  dissertationDefense: false,
};

const courseOptions = {
  bin1: [
    "CSCI 5229 - Computer Graphics",
    "CSCI 5244 - Quantum Computation and Information",
    "CSCI 5254 - Convex Optimization",
    "CSCI 5434 - Probability for Computer Science",
    "CSCI 5444 - Introduction to Theory of Computation",
    "CSCI 5446 - Chaotic Dynamics",
    "CSCI 5454 - Design and Analysis of Algorithms",
    "CSCI 5526 - Computational Tools for Multiscale Problems",
    "CSCI 5576 - High-Performance Scientific Computing",
    "CSCI 5606 - Principles of Numerical Computation",
    "CSCI 5636 - Numerical Solution of Partial Differential Equations",
    "CSCI 5646 - Numerical Linear Algebra",
    "CSCI 5654 - Linear Programming",
    "CSCI 5676 - Numerical Methods for Unconstrained Optimization",
  ],
  bin2: [
    "CSCI 5202 - Intro to Robotics",
    "CSCI 5302 - Advanced Robotics",
    "CSCI 5322 - Algorithmic Human-Robot Interaction",
    "CSCI 5352 - Network Analysis and Modeling",
    "CSCI 5402 - Research Methods in HRI",
    "CSCI 5502 - Data Mining",
    "CSCI 5616 - Introduction to Virtual Reality",
    "CSCI 5622 - Machine Learning",
    "CSCI 5722 - Computer Vision",
    "CSCI 5822 - Probabilistic and Causal Modeling in Computer Science",
    "CSCI 5832 - Natural Language Processing",
    "CSCI 5839 - User-Centered Design",
    "CSCI 5849 - Input Interaction and Accessibility",
    "CSCI 5922 - Neural Networks and Deep Learning",
    "CSCI 5932 - Deep Reinforcement Learning",
    "CSCI 5942 - AI Engineering",
  ],
  bin3: [
    "CSCI 5135 - Computer-Aided Verification",
    "CSCI 5214 - Big Data Architecture",
    "CSCI 5253 - Datacenter Scale Computing",
    "CSCI 5263 - Quantum Computer Architecture and Systems",
    "CSCI 5273 - Network Systems",
    "CSCI 5403 - Intro to Cyber Security",
    "CSCI 5413 - Ethical Hacking",
    "CSCI 5448 - Object-Oriented Analysis and Design",
    "CSCI 5523 - Modern Offense and Defense in Cybersecurity",
    "CSCI 5525 - Compiler Construction",
    "CSCI 5535 - Fundamental Concepts of Programming Languages",
    "CSCI 5573 - Advanced Operating Systems",
    "CSCI 5673 - Distributed Systems",
    "CSCI 5817 - Database Systems",
    "CSCI 5828 - Foundations of Software Engineering",
    "CSCI 5854 - Theoretical Foundation of Autonomous System",
  ],
};

const semesterRules = [
  {
    id: "binClasses",
    title: "BIN classes",
    note: "Complete all three breadth courses within your first five semesters.",
    offset: 4,
    className: "deadline-card--coursework",
  },
  {
    id: "areaExam",
    title: "Area Exam",
    note: "Become eligible after BIN classes and complete no later than your sixth semester.",
    offset: 5,
    className: "deadline-card--exam",
  },
  {
    id: "proposalDefense",
    title: "Proposal Defense / Comprehensive Exam",
    note:
      "Complete after the Area Exam and 30 total course credits, including one CS depth class. Up to 15 credits may be non-CS.",
    offset: 7,
    className: "deadline-card--proposal",
  },
  {
    id: "dissertationDefense",
    title: "Dissertation Defense",
    note: "Plan to finish by the end of your twelfth semester.",
    offset: 11,
    className: "deadline-card--defense",
  },
];

const faqItems = [
  {
    title: "What coursework counts before the proposal defense?",
    description:
      "The tracker assumes the three professional development courses, BIN 1-3, one CS depth class worth 3 credits at the 5XXX/6XXX/7XXX level, excluding CSCI 5900, CSCI 7900, and CSCI 8990, and up to 15 non-CS credits for the full 30-course-credit milestone.",
    url: "https://www.colorado.edu/cs/academics/graduate-programs/doctor-philosophy/degree-requirements",
  },
  {
    title: "Where do I find the official breadth course lists?",
    description:
      "Use the department breadth page to confirm current BIN 1, BIN 2, and BIN 3 options before finalizing your tracker.",
    url: "https://www.colorado.edu/cs/academics/graduate-programs/breadth-courses",
  },
  {
    title: "How many credits may be outside computer science?",
    description:
      "This tracker counts up to 15 non-CS credits toward the 30-course-credit milestone before the proposal defense.",
    url: "https://www.colorado.edu/cs/academics/graduate-programs/doctor-philosophy/degree-requirements",
  },
  {
    title: "Where are the department milestone forms?",
    description:
      "Use the Forms and Policies page for department-level Area Exam and related milestone paperwork guidance.",
    url: "https://www.colorado.edu/cs/students/graduate-students/forms-policies",
  },
  {
    title: "Where do Graduate School forms and deadlines live?",
    description:
      "Use the Graduate School pages for candidacy, doctoral exam forms, thesis approval, and semester graduation deadlines.",
    url: "https://www.colorado.edu/graduateschool/academics/graduation-requirements/doctoral-graduation-information/deadlines-doctoral-degree",
  },
  {
    title: "How do I book Rajshree's drop-ins?",
    description:
      "Rajshree's drop-ins are the best place for milestone timing, committee, forms, and deadline questions.",
    url: "https://outlook.office365.com/owa/calendar/CS_GradAdvisor@o365.colorado.edu/bookings/",
  },
];

const milestoneGuide = [
  {
    title: "BIN Classes",
    deadline: "Within the first five semesters",
    offset: 4,
    forms: [{ label: "None" }],
    instructions: [
      "No department form is required for BIN completion.",
      "Complete one approved breadth course from each bin and keep the selections aligned with your degree requirements.",
    ],
    links: [
      {
        label: "Breadth (BIN) course list",
        url: "https://www.colorado.edu/cs/academics/graduate-programs/breadth-courses",
      },
      {
        label: "Degree requirements",
        url: "https://www.colorado.edu/cs/academics/graduate-programs/doctor-philosophy/degree-requirements",
      },
    ],
  },
  {
    title: "Area Exam",
    deadline:
      "Eligible once you complete BIN classes and complete no later than the end of your 6th semester",
    offset: 5,
    forms: [
      {
        label: "Area Exam Report",
        url: "https://www.colorado.edu/cs/students/graduate-students/forms-policies",
      },
    ],
    instructions: [
      "Inform your staff academic advisor of your committee members at least two weeks before your exam.",
      "After you successfully complete the exam, fill out the Area Exam Report and route it through DocuSign to collect signatures.",
      "Email the completed form to your staff academic advisor.",
    ],
    links: [
      {
        label: "Forms and policies",
        url: "https://www.colorado.edu/cs/students/graduate-students/forms-policies",
      },
      {
        label: "Rajshree's drop-ins",
        url: "https://outlook.office365.com/owa/calendar/CS_GradAdvisor@o365.colorado.edu/bookings/",
      },
    ],
  },
  {
    title: "Proposal Defense / Comprehensive Exam",
    deadline:
      "Eligible once you complete your Area Exam and 30 course credits and complete no later than the end of your 8th semester",
    offset: 7,
    forms: [
      {
        label: "Doctoral Comprehensive Exam Form",
        url: "https://www.colorado.edu/graduateschool/academics/forms-current-students/doctoral-comprehensive-exam",
      },
      {
        label: "Candidacy Application Form",
        url: "https://www.colorado.edu/graduateschool/academics/forms-current-students",
      },
    ],
    instructions: [
      "Inform your staff academic advisor of your committee members at least two weeks before your proposal defense.",
      "Once your committee is approved, complete the comprehensive exam form about two weeks before your exam.",
      "Do not submit the exam envelope too early because it expires and must be reissued if it lapses.",
      "After you successfully pass comps, submit the Candidacy Application Form.",
    ],
    links: [
      {
        label: "Doctoral comprehensive exam",
        url: "https://www.colorado.edu/graduateschool/academics/forms-current-students/doctoral-comprehensive-exam",
      },
      {
        label: "Rajshree's drop-ins",
        url: "https://outlook.office365.com/owa/calendar/CS_GradAdvisor@o365.colorado.edu/bookings/",
      },
    ],
  },
  {
    title: "Dissertation Defense",
    deadline: "Complete by the end of your 12th semester",
    offset: 11,
    forms: [
      {
        label: "Doctoral Final Exam Form",
        url: "https://www.colorado.edu/graduateschool/academics/forms/doctoral-final-examination-form",
      },
      {
        label: "Thesis Approval Form",
        url: "https://www.colorado.edu/graduateschool/academics/forms-current-students/thesis-approval-form",
      },
      {
        label: "Survey of Earned Doctorates",
        url: "https://sed-ncses.org/",
      },
    ],
    instructions: [
      "Inform your staff academic advisor of your committee members at least two weeks before your defense.",
      "Once your committee is approved, complete the final exam form about two weeks before your exam.",
      "Do not submit the exam envelope too early because it expires and must be reissued if it lapses.",
      "After you successfully complete your defense, submit the Thesis Approval Form and Survey of Earned Doctorates.",
      "Follow the Graduate School deadlines for the term you are graduating and schedule a milestone meeting with the staff academic advisor.",
    ],
    links: [
      {
        label: "Graduate School deadlines",
        url: "https://www.colorado.edu/graduateschool/academics/graduation-requirements/doctoral-graduation-information/deadlines-doctoral-degree",
      },
      {
        label: "Rajshree's drop-ins",
        url: "https://outlook.office365.com/owa/calendar/CS_GradAdvisor@o365.colorado.edu/bookings/",
      },
    ],
  },
];

const milestones = [
  {
    key: "profDev6000",
    label: "Professional Development 6000",
    requirement: "Required",
    renderInput: () => renderCheckbox("profDev6000"),
    status: () => checkboxStatus("profDev6000"),
    complete: () => state.profDev6000,
  },
  {
    key: "profDev6100",
    label: "Professional Development 6100",
    requirement: "Required",
    renderInput: () => renderCheckbox("profDev6100"),
    status: () => checkboxStatus("profDev6100"),
    complete: () => state.profDev6100,
  },
  {
    key: "profDev6200",
    label: "Professional Development 6200",
    requirement: "Required",
    renderInput: () => renderCheckbox("profDev6200"),
    status: () => checkboxStatus("profDev6200"),
    complete: () => state.profDev6200,
  },
  {
    key: "bin1",
    label: "BIN 1",
    requirement: "One approved breadth course",
    renderInput: () => renderSelect("bin1", courseOptions.bin1, "Select BIN 1 course"),
    status: () => selectStatus(state.bin1),
    complete: () => Boolean(state.bin1),
  },
  {
    key: "bin2",
    label: "BIN 2",
    requirement: "One approved breadth course",
    renderInput: () => renderSelect("bin2", courseOptions.bin2, "Select BIN 2 course"),
    status: () => selectStatus(state.bin2),
    complete: () => Boolean(state.bin2),
  },
  {
    key: "bin3",
    label: "BIN 3",
    requirement: "One approved breadth course",
    renderInput: () => renderSelect("bin3", courseOptions.bin3, "Select BIN 3 course"),
    status: () => selectStatus(state.bin3),
    complete: () => Boolean(state.bin3),
  },
  {
    key: "csDepthClass",
    label: "CS Depth class",
    requirement:
      "1 CSCI depth class required, 3 credits, course level 5XXX/6XXX/7XXX, not CSCI 5900, CSCI 7900, or CSCI 8990",
    renderInput: () =>
      renderText(
        "csDepthClass",
        "",
        "Enter as CSCI ####. Must be a 3-credit CSCI 5XXX/6XXX/7XXX course, excluding 5900, 7900, and 8990."
      ),
    status: () => depthCourseStatus(),
    complete: () => validCsDepthCourse(),
  },
  {
    key: "nonCsCredits",
    label: "Non-CS courses",
    requirement: "15 credits may be non-CS courses",
    renderInput: () => renderNumber("nonCsCredits", null, "15 credits may be non-CS courses"),
    status: () => countStatus(state.nonCsCredits, 15),
    complete: () => state.nonCsCredits >= 15,
  },
  {
    key: "areaExam",
    label: "Area Exam",
    requirement: "BIN 1, BIN 2, BIN 3",
    renderInput: () => renderCheckbox("areaExam", eligibility.areaExam()),
    status: () => gatedStatus("areaExam", eligibility.areaExam()),
    complete: () => state.areaExam,
  },
  {
    key: "proposalDefense",
    label: "Proposal Defense / Comprehensive Exam",
    requirement: "All above + Area Exam",
    renderInput: () => renderCheckbox("proposalDefense", eligibility.proposalDefense()),
    status: () => gatedStatus("proposalDefense", eligibility.proposalDefense()),
    complete: () => state.proposalDefense,
  },
  {
    key: "dissertationDefense",
    label: "Dissertation Defense",
    requirement: "Proposal Defense / Comprehensive Exam",
    renderInput: () =>
      renderCheckbox("dissertationDefense", eligibility.dissertationDefense()),
    status: () => gatedStatus("dissertationDefense", eligibility.dissertationDefense()),
    complete: () => state.dissertationDefense,
  },
];

const eligibility = {
  areaExam() {
    return binsComplete();
  },
  proposalDefense() {
    return professionalDevelopmentComplete() && state.areaExam && totalCourseCredits() >= 30;
  },
  dissertationDefense() {
    return state.proposalDefense;
  },
};

function professionalDevelopmentComplete() {
  return state.profDev6000 && state.profDev6100 && state.profDev6200;
}

function binsComplete() {
  return ["bin1", "bin2", "bin3"].every((key) => Boolean(state[key]));
}

function totalCourseCredits() {
  const professionalDevelopment =
    Number(state.profDev6000) + Number(state.profDev6100) + Number(state.profDev6200);
  const binCredits =
    (Number(Boolean(state.bin1)) +
      Number(Boolean(state.bin2)) +
      Number(Boolean(state.bin3))) *
    3;
  const csDepthCredits = validCsDepthCourse() ? 3 : 0;

  return professionalDevelopment + binCredits + csDepthCredits + state.nonCsCredits;
}

function countStatus(value, goal) {
  if (value >= goal) return "Completed";
  if (value > 0) return "In progress";
  return "Not started";
}

function checkboxStatus(key) {
  return state[key] ? "Completed" : "Not started";
}

function selectStatus(value) {
  return value ? "Completed" : "Not started";
}

function validCsDepthCourse() {
  const normalized = state.csDepthClass.trim().toUpperCase();
  const match = normalized.match(/^CSCI\s*(\d{4})\b/);

  if (!match) return false;

  const courseNumber = match[1];
  const firstDigit = courseNumber[0];
  const excludedCourses = new Set(["5900", "7900", "8990"]);

  return ["5", "6", "7"].includes(firstDigit) && !excludedCourses.has(courseNumber);
}

function depthCourseStatus() {
  if (!state.csDepthClass.trim()) return "Not started";
  return validCsDepthCourse() ? "Completed" : "Not eligible";
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

function renderSelect(key, options, placeholder) {
  const optionMarkup = options
    .map(
      (option) => `
        <option value="${option}" ${state[key] === option ? "selected" : ""}>${option}</option>
      `
    )
    .join("");

  return `
    <select data-key="${key}">
      <option value="">${placeholder}</option>
      ${optionMarkup}
    </select>
  `;
}

function renderText(key, placeholder, caption = "") {
  return `
    <div>
      <input
        type="text"
        data-key="${key}"
        value="${state[key]}"
        placeholder="${placeholder}"
      />
      ${caption ? `<div class="credit-caption">${caption}</div>` : ""}
    </div>
  `;
}

function renderNumber(key, max, caption) {
  const maxAttribute = Number.isFinite(max) ? `max="${max}"` : "";

  return `
    <div>
      <input
        type="number"
        data-key="${key}"
        min="0"
        ${maxAttribute}
        value="${state[key]}"
      />
      <div class="credit-caption">${caption}</div>
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
          <td class="tracker-table__dependency">${milestone.requirement}</td>
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
            <span>Requirement</span>
            <p class="tracker-card__dependency">${milestone.requirement}</p>
          </div>
        </article>
      `;
    })
    .join("");
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

function formatGuideDeadline(label, offset) {
  if (!state.entrySemester) return label;
  return `${label} · Target term: ${semesterLabelAfter(state.entrySemester, offset)}`;
}

function renderDeadlines() {
  const wrap = document.getElementById("deadlineCards");

  if (!state.entrySemester) {
    wrap.innerHTML = "";
    return;
  }

  wrap.innerHTML = semesterRules
    .map(
      (rule) => `
        <article class="deadline-card ${rule.className}">
          <p>${rule.title}</p>
          <strong>${semesterLabelAfter(state.entrySemester, rule.offset)}</strong>
        </article>
      `
    )
    .join("");
}

function renderMilestoneGuide() {
  const wrap = document.getElementById("guideCards");

  wrap.innerHTML = milestoneGuide
    .map(
      (item, index) => `
        <details class="guide-card" ${index === 0 ? "open" : ""}>
          <summary class="guide-card__summary">
            <div class="guide-card__summary-copy">
              <h3>${item.title}</h3>
              <p>${formatGuideDeadline(item.deadline, item.offset)}</p>
            </div>
            <span class="guide-card__chevron" aria-hidden="true"></span>
          </summary>

          <div class="guide-card__content">
            <div class="guide-card__block">
              <span>Forms</span>
              <ul class="guide-list">
                ${item.forms
                  .map((form) =>
                    form.url
                      ? `<li><a href="${form.url}" target="_blank" rel="noreferrer">${form.label}</a></li>`
                      : `<li>${form.label}</li>`
                  )
                  .join("")}
              </ul>
            </div>

            <div class="guide-card__block">
              <span>Instructions</span>
              <ul class="guide-list">
                ${item.instructions.map((instruction) => `<li>${instruction}</li>`).join("")}
              </ul>
            </div>

            <div class="guide-card__block">
              <span>Recommended links</span>
              <div class="guide-actions">
                ${item.links
                  .map(
                    (link) => `
                      <a href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>
                    `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </details>
      `
    )
    .join("");
}

function renderFaqs() {
  const wrap = document.getElementById("faqCards");

  wrap.innerHTML = faqItems
    .map(
      (item) => `
        <article class="resource-link">
          <strong>${item.title}</strong>
          <span>${item.description}</span>
          <a href="${item.url}" target="_blank" rel="noreferrer">Open official page</a>
        </article>
      `
    )
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
    const max = Number.parseInt(target.max, 10);
    state[key] = Number.isFinite(max)
      ? Math.max(0, Math.min(nextValue, max))
      : Math.max(0, nextValue);
  } else {
    state[key] = target.value;
  }

  renderAll();
}

function setActiveTab(tabName) {
  const planTab = document.getElementById("planTab");
  const faqTab = document.getElementById("faqTab");

  document.querySelectorAll(".tab-button").forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("tab-button--active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  planTab.classList.toggle("tab-panel--active", tabName === "plan");
  faqTab.classList.toggle("tab-panel--active", tabName === "faq");
}

function bindEvents() {
  document.addEventListener("change", handleInputChange);

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
  });
}

function renderAll() {
  renderTracker();
  renderDeadlines();
  renderMilestoneGuide();
  renderFaqs();
}

generateSemesterOptions();
bindEvents();
setActiveTab("plan");
renderAll();
