import { NavigateFunction } from 'react-router-dom'
import { BreadCrumbsType } from './Types'

export const getCreatedMeetingBreadCrumbs = (navigate: NavigateFunction): Array<BreadCrumbsType> => [
  { 
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/")
    }
  },
  { 
    text: "Create Meeting"
  },
]