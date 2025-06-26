import { CoHome, CoSchool, FaUserGraduate, LaChalkboardTeacherSolid } from 'oh-vue-icons/icons'
import type { IconType } from 'oh-vue-icons/types/icons'

interface ISidebarData {
  href?: string
  title: string
  icon?: IconType
  target: string
  children?: ISidebarData[]
}

export const SidebarData: ISidebarData[] = [
  {
    title: 'Dashboard',
    href: 'home',
    target: '_self',
    icon: CoHome,
  },
  {
    title: 'About',
    href: 'about',
    target: '_self',
  },
  // {
  //   title: 'Colleges',
  //   href: 'colleges',
  //   target: '_self',
  //   icon: CoSchool,
  // },
  {
    title: 'Students',
    target: '_self',
    icon: FaUserGraduate,
    children: [
      {
        title: 'Student Informations',
        href: 'students',
        target: '_self',
      },
    ],
  },
  //   {
  //     title: 'Teachers',
  //     href: 'teachers',
  //     target: '_self',
  //     icon: LaChalkboardTeacherSolid,
  //   },
]
