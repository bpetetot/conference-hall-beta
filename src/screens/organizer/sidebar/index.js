import forRouter from 'hoc-little-router'
import Sidebar from './sidebar.container'

export { default as Sidebar } from './sidebar.container'
export const SidebarMobile = forRouter('MOBILE_MENU')(Sidebar)
