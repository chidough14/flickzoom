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

export const getOneOnOneMeetingBreadCrumbs = (navigate: NavigateFunction): Array<BreadCrumbsType> => [
  { 
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/")
    }
  },
  { 
    text: "Create Meeting",
    href: "#",
    onClick: () => {
      navigate("/create")
    }
  },
  { 
    text: "Create One on One Meeting"
  },
]