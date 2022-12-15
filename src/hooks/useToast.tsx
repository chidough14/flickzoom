import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setToasts } from '../app/slices/MeetingSlice'
import { ToastType } from '../utils/Types'

const useToast = () => {
  const toasts = useAppSelector((state) => state.meeting.toasts)
  const dispatch = useAppDispatch()

  const createToast = ({title, type}: {title: string, type: any}) => {
    dispatch(setToasts(toasts.concat({
      id: new Date().toISOString(),
      title,
      color: type
    })))
  }
  return [createToast]
}

export default useToast