export const APP_TABS = [
  { id: "all", content: "All" },
  { id: "my-apps", content: "My apps" },
  { id: "boost-sales", content: "Boost Sales" },
  { id: "ux", content: "UX" },
  { id: "engage-users", content: "Engage Users" },
  { id: "social", content: "Social" },
];

export const WIDGETS_TABS = [
  ...APP_TABS,
  { id: "favorite", content: "Favorites"},
];

export const CATEGORIES_ENUM = {
  all: 1,
  myApps: 2,
  boostSales: 3,
  engageUsers: 4,
  ux: 5,
  social: 6,
  favorites: 7,
}