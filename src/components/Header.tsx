import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiHeaderSection, EuiHeaderSectionItem, EuiText, EuiTextColor } from '@elastic/eui'
import { signOut } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { changeTheme } from '../app/slices/AuthSlice'
import { getCreatedMeetingBreadCrumbs, getMeetingsBreadCrumbs, getMyMeetingsBreadCrumbs, getOneOnOneMeetingBreadCrumbs, getVideoConferenceBreadCrumbs } from '../utils/breadCrumbs'
import { firebaseAuth } from '../utils/FirebaseConfig'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const username = useAppSelector((state) => state.auth.userInfo?.name)
  const isDarkTheme = useAppSelector((state) => state.auth.isDarkTheme)
  const [breadCrumbs, setBreadCrumbs] = useState([{text: 'Dashboard'}])
  const [isResponsive, setIsResponsive] = useState(false)
  const dispatch = useAppDispatch()

  const logout = () => {
    signOut(firebaseAuth)
  }

  useEffect(() => {
    const { pathname } = location

    if (pathname === "/create") setBreadCrumbs(getCreatedMeetingBreadCrumbs(navigate))
    else if (pathname === "/create1on1") setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate))
    else if (pathname === "/createVideoconference") setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate))
    else if (pathname === "/mymeetings") setBreadCrumbs(getMyMeetingsBreadCrumbs(navigate))
    else if (pathname === "/meetings") setBreadCrumbs(getMeetingsBreadCrumbs(navigate))
  }, [location, navigate])

  const invertTheme = (e: any) => {
    e.stopPropagation()
    const theme = localStorage.getItem("flickzoom-theme")

    localStorage.setItem("flickzoom-theme", theme === "light" ? "dark" : "light")
    dispatch(changeTheme({isDarkTheme: !isDarkTheme}))
  }

  const section = [
      {
        items: [
          <Link to="">
            <EuiText>
              <h2 style={{ padding: "0 1vw"}}>
                <EuiTextColor color="#0b5cff">Flickzoom</EuiTextColor>
              </h2>
            </EuiText>
          </Link>
        ]
      },
      {
        items: [
          <>
            {
              username ? (
                <EuiText>
                  <h3 style={{ padding: "0 1vw"}}>
                    <EuiTextColor color="white">Hello,</EuiTextColor>
                    <EuiTextColor color="#0b5cff">{username}</EuiTextColor>
                  </h3>
                </EuiText>
              ) : null
            }
          </>
        ]
      },
      {
        items: [
          <EuiFlexGroup justifyContent='center' alignItems='center' direction='row' style={{gap: "2vw"}}>
            <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}}>
              {
                isDarkTheme ? (
                  <EuiButtonIcon
                    onClick={invertTheme}
                    iconType="sun"
                    display='fill'
                    size='s'
                    aria-label='invert-button'
                    color='warning'
                  />
                ) : (
                  <EuiButtonIcon
                    onClick={invertTheme}
                    iconType="moon"
                    display='fill'
                    size='s'
                    aria-label='invert-button'
                    color='ghost'
                  />
                )
              }
            </EuiFlexItem>

            <EuiFlexItem grow={false} style={{flexBasis: "fit-content"}}>
              <EuiButtonIcon
                onClick={logout}
                iconType="lock"
                display='fill'
                size='s'
                aria-label='logout-button'
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        ]
      }
  ]

  const responsiveSection = [
    {
      items: [
        <Link to="">
          <EuiText>
            <h2 style={{ padding: "0 1vw"}}>
              <EuiTextColor color="#0b5cff">Flickzoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>
      ]
    }
  ]

  useEffect(() => {
    if (window.innerWidth < 480) setIsResponsive(true)
  }, [])

  return (
    <>
     <EuiHeader
        style={{minHeight: "8vh"}}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />

      <EuiHeader
        style={{minHeight: "8vh"}}
        sections={[{breadcrumbs: breadCrumbs}]}
      />
    </>
  )
}

export default Header