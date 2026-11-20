// Facts only from veon/client.json (company.contacts, socials, C-002, C-003, C-004, C-012, C-013).
export const clinic = {
  name: "Формула Дент",
  phones: [
    { label: "067 203 22 33", href: "tel:+380672032233", e164: "+380672032233" },
    { label: "073 203 22 33", href: "tel:+380732032233", e164: "+380732032233" },
  ],
  email: { label: "formuladentclinic@gmail.com", href: "mailto:formuladentclinic@gmail.com" },
  telegram: "https://t.me/formuladent",
  instagram: "https://www.instagram.com/stomatolog_formuladent/",
  facebook: "https://www.facebook.com/FormulaDent/",
  address: {
    city: "м. Львів",
    street: "вул. Івана Пулюя, 40, корпус 4",
    short: "вул. Івана Пулюя, 40, корп. 4",
  },
  maps: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Львів, вул. Івана Пулюя, 40, корпус 4"),
  hours: [
    { day: "Понеділок–пʼятниця", time: "9:00–20:00" },
    { day: "Субота", time: "за попереднім записом" },
    { day: "Неділя", time: "вихідний" },
  ],
  copyright: "© 2020–2026 Стоматологія Формула Дент",
} as const;

export type DoctorKey = "segin" | "sloboda" | "gulavska" | "boichuk" | "nazarov" | "slipkevich" | "kruten" | "sauitbekova";

export interface Person {
  key: DoctorKey;
  short: string;     // name as patients say it
  full: string;      // full name from C-004
  role: string;      // role as on the clinic site (C-004)
}

export const team: Person[] = [
  { key: "kruten", short: "Олександра Крутень", full: "Крутень Олександра Сергіївна", role: "Дитячий стоматолог" },
  { key: "boichuk", short: "Степан Бойчук", full: "Бойчук Степан Васильович", role: "Ендодонтист, лікує під мікроскопом" },
  { key: "sloboda", short: "Андрій Слобода", full: "Слобода Андрій Ігорович", role: "Стоматолог-хірург" },
  { key: "nazarov", short: "Олександр Назаров", full: "Назаров Олександр Володимирович", role: "Ортопед і ортодонт" },
  { key: "gulavska", short: "Катерина Гулавська", full: "Гулавська Катерина Петрівна", role: "Стоматолог" },
  { key: "slipkevich", short: "Ірина Сліпкевич", full: "Сліпкевич Ірина Василівна", role: "Стоматолог" },
  { key: "segin", short: "Сергій Сегін", full: "Сегін Сергій Васильович", role: "Керуючий клініки" },
  { key: "sauitbekova", short: "Анна Сауитбекова", full: "Сауитбекова Анна Володимирівна", role: "Адміністратор" },
];

export const person = (k: DoctorKey): Person => {
  const p = team.find((t) => t.key === k);
  if (!p) throw new Error(`Unknown person ${k}`);
  return p;
};

export interface Service {
  topic: string;               // the problem, a future service page (FutureLink)
  verb?: string;               // joins the topic and the doctor
  who: DoctorKey[];
  whoRole?: string;            // role shown in the pill for this service
  price: string[];             // from C-012
}

// Mapping "service → doctor" follows the roles in C-004; the client confirms it (concept.md, client_decision).
export const services: Service[] = [
  { topic: "Дитячі зуби", verb: "лікує", who: ["kruten"], whoRole: "дитячий стоматолог", price: ["вартість — за телефоном"] },
  { topic: "Карієс і реставрації", verb: "лікують", who: ["gulavska", "slipkevich"], whoRole: "стоматолог", price: ["пломба від 2000 грн"] },
  { topic: "Канали під мікроскопом", verb: "лікує", who: ["boichuk"], whoRole: "ендодонтист", price: ["3000–5900 грн"] },
  { topic: "Видалення й імплантацію", verb: "робить", who: ["sloboda"], whoRole: "хірург", price: ["імплантат Osstem $400", "Straumann €700"] },
  { topic: "Коронки й протези", verb: "робить", who: ["nazarov"], whoRole: "ортопед", price: ["металокерамічна коронка 6500 грн"] },
  { topic: "Брекети", verb: "ставить", who: ["nazarov"], whoRole: "ортодонт", price: ["металеві $600 на щелепу"] },
  { topic: "Професійна гігієна й відбілювання", who: [], price: ["гігієна 1800–2000 грн", "відбілювання Beyond 7000 грн"] },
  { topic: "Діагностика і план лікування", who: [], price: ["500 грн"] },
];
