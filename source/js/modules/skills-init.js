const MAX_SKILL_NUMBER = 10;
const SKILLS = [
  {
    title: "HTML",
    number: 9,
  },
  {
    title: "CSS",
    number: 9,
  },
  {
    title: "Javascript",
    number: 6,
  },
  {
    title: "PHP",
    number: 6,
  },
  {
    title: "Wordpress",
    number: 8,
  },
  {
    title: "Drupal 8",
    number: 5,
  },
];
const template = document.querySelector("#skill-template");
const skillsList = document.querySelector(".skills__list");

if (template && skillsList) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < SKILLS.length; i++) {
    const skill = template.content.cloneNode(true);
    const title = skill.querySelector(".skill__title");
    const number = skill.querySelector(".skill__number");
    const indicator = skill.querySelector(".skill__indicator");
    const indicatorIcons = indicator.querySelectorAll(".skill__indicator-icon");
    const fragmentIndicator = document.createDocumentFragment();

    for (let j = 0; j < MAX_SKILL_NUMBER; j++) {
      let icon;
      if (j < SKILLS[i].number) {
        icon = indicatorIcons[0].cloneNode(true);
      } else {
        icon = indicatorIcons[1].cloneNode(true);
      }
      fragmentIndicator.appendChild(icon);
    }

    title.textContent = SKILLS[i].title;
    number.textContent = `${SKILLS[i].number}/${MAX_SKILL_NUMBER }`;
    indicator.innerHTML = "";
    indicator.appendChild(fragmentIndicator);
    fragment.appendChild(skill);
  }
  skillsList.appendChild(fragment);
}