import { CoHome, CoSchool, FaUserGraduate, LaChalkboardTeacherSolid } from 'oh-vue-icons/icons'
import type { IconType } from 'oh-vue-icons/types/icons'

interface ISidebarData {
  href?: string
  title: string
  icon?: IconType
  target?: string
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
    title: 'College',
    href: 'college',
    target: '_self',
  },
  {
    title: 'Users',
    href: 'users',
    target: '_self',
    // icon: CoSchool,
  },
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
  {
    title: 'Settings',

    icon: LaChalkboardTeacherSolid,
    children: [
      {
        title: 'Batch',
        href: 'batch',
        target: '_self',
      },
      {
        title: 'Level',
        href: 'levels',
        target: '_self',
      },
      {
        title: 'Faculty',
        href: 'faculty',
        target: '_self',
      },
      {
        title: 'Programs',
        href: 'programs',
        target: '_self',
      },
    ],
  },
]
