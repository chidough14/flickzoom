import { EuiBadge, EuiBasicTable, EuiButton, EuiButtonIcon, EuiCopy, EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui'
import { getDocs, query, where } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import { meetingsRef } from '../utils/FirebaseConfig'
import { MeetingType } from '../utils/Types'

const Meeting = () => {
  useAuth()
  // const [meetings, setMeetings] = useState<Array<MeetingType>>([])
  const [meetings, setMeetings] = useState<any>([])
  const uid = useAppSelector((state) => state.auth.userInfo?.uid)

  useEffect(() => {
    const getMyMeetings = async () => {
      const firestoreQuery = query(meetingsRef);
      const fetchedMeetings = await getDocs(firestoreQuery);

      if (fetchedMeetings.docs.length) {
        const myMeetings: Array<MeetingType> = [];
        fetchedMeetings.forEach((meeting) => {
          const data = meeting.data() as MeetingType;
          if (data.createdBy === uid)
            myMeetings.push(meeting.data() as MeetingType);
          else if (data.meetingType === "anyone-can-join")
            myMeetings.push(meeting.data() as MeetingType);
          else {
            const index = data.invitedUsers.findIndex(
              (user: string) => user === uid
            );
            if (index !== -1) {
              myMeetings.push(meeting.data() as MeetingType);
            }
          }
        });

        setMeetings(myMeetings);
      }
    };
    if (uid) getMyMeetings();
  }, [uid]);

  const columns = [
    {
      field: 'meetingName',
      name: 'Meeting Name'
    },
    {
      field: 'meetingType',
      name: 'Meeting Type'
    },
    {
      field: 'meetingDate',
      name: 'Meeting Date'
    },
    {
      field: '',
      name: 'Status',
      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format("L")) {
            return <EuiBadge color='success'>
              <Link to={`/join/${meeting.meetingId}`} style={{color: 'black'}}>
                Join now
              </Link>
            </EuiBadge>
          } else if (moment(meeting.meetingDate).isBefore(moment().format('L'))) {
            return <EuiBadge color='default'>Ended</EuiBadge>
          } else {
            return <EuiBadge color='primary'>Upcoming</EuiBadge>
          }
        } else return <EuiBadge color='danger'>Cancelled</EuiBadge>
      }
    },
    {
      field: 'meetingId',
      name: 'Copy Link',
      render: (meetingId: string) => {
        return <EuiCopy textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}>
          {
            (copy: any) => (
              <EuiButtonIcon iconType='copy' onClick={copy} display="base" aria-label='Meeting-copy' />
            )
          }
        </EuiCopy>
      }
    }
  ]
  
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column"
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent='center' style={{ margin: "1rem"}}>
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable
              items={meetings}
              columns={columns}
            />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export default Meeting