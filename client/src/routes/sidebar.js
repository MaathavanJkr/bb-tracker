/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/profile/1',
    icon: 'FormsIcon',
    name: 'Profile',
  },
  {
    path: '/app/add',
    icon: 'CardsIcon',
    name: 'Add Shots',
  },
  {
    path: '/app/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
  },
]

export default routes
