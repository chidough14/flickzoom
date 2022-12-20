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

export const getVideoConferenceBreadCrumbs = (navigate: NavigateFunction): Array<BreadCrumbsType> => [
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
    text: "Create video conference"
  },
]

export const getMyMeetingsBreadCrumbs = (navigate: NavigateFunction): Array<BreadCrumbsType> => [
  { 
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/")
    }
  },
  { 
    text: "My Meetings"
  },
]

export const getMeetingsBreadCrumbs = (navigate: NavigateFunction): Array<BreadCrumbsType> => [
  { 
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/")
    }
  },
  { 
    text: "Meetings"
  },
]