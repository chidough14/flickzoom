import { EuiGlobalToastList, EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui';
import React, { useEffect, useState } from 'react';

import { Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAppDispatch, useAppSelector } from './app/hooks';
import ThemeSelector from './components/ThemeSelector';
import CreateMeeting from './pages/CreateMeeting';
import OneOnOneMeeting from './pages/OneOnOneMeeting';
import { setToasts } from './app/slices/MeetingSlice';

function App() {
  const dispatch = useAppDispatch()
  const isDarkTheme = useAppSelector((state) => state.auth.isDarkTheme)
  const toasts = useAppSelector((state) => state.meeting.toasts)
  const [theme, setTheme] = useState<EuiThemeColorMode>("light")
  const [isInitialTheme, setIsInitialTheme] = useState(true)

  useEffect(() => {
    const currentTheme = localStorage.getItem("flickzoom-theme")

    if (currentTheme) {
      setTheme(currentTheme as EuiThemeColorMode)
    } else {
      localStorage.setItem("flickzoom-theme", "light")
    }
  }, [])

  useEffect(() => {
    if (isInitialTheme) {
      setIsInitialTheme(false)
    } else {
      window.location.reload()
    }
  }, [isDarkTheme])

  const overrides = {
    colors: {
      LIGHT: {primary: "#0b5cff"},
      DARK: {primary: "#0b5cff"}
    }
  }

  const removeToast = (removeToast: {id: string}) => {
    dispatch(setToasts(toasts.filter((toast: any) => toast.id === removeToast.id)))
  }

  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/create' element={<CreateMeeting />} />
            <Route path='/create1on1' element={<OneOnOneMeeting />} />
            <Route path='*' element={<Dashboard />} />
          </Routes>
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={(e) => removeToast(e)}
            toastLifeTimeMs={5000}
          />
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
   );
}

export default App;
