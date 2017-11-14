import forRouter from 'hoc-little-router'
import Sidebar from './sidebar'

export { default as Sidebar } from './sidebar'
export const SidebarMobile = forRouter('MOBILE_MENU')(Sidebar)
