'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Constants from '../../../helpers/constants'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/userContext'
import NotificationsService from '../../../services/notificationsService'
import { formatDate } from '../../../helpers/datesFormats'

interface NotificationsDropDownProps {
    collapseNavbar?: () => void
}

export default function NotificationsDropDown({ collapseNavbar }: NotificationsDropDownProps) {

    const router = useRouter()
    const { userContext } = useContext(UserContext)
    const constants = new Constants();

    const [listIndex, setListIndex] = useState<[]>()
    const _notificationService = new NotificationsService()
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        _notificationService.index()
            .then((data) => {
                data && setListIndex(data.listActive)
                data && console.log(data)
            })
    }, [])

    return (
        <>
            <li className="nav-item dropdown nav-item-custom user-notification" >
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa-solid fa-bell notification-bell" style={listIndex && (listIndex.length > 0) ? { color: "#aa0000" } : { color: "gray" }}></i>
                </a>
                <ul className="dropdown-menu" id="user-dropdown-account" aria-labelledby="navbarDropdown">
                    {listIndex && listIndex.length > 0 && listIndex.map((notification: any, index) => (
                        <>
                            <li className='notification-li'>
                                {notification.notification_type === "Destete" ?
                                    <Link href={`/animals/detail/${notification.code}`}>{notification.notification_type} - {formatDate(notification.notification_date)}</Link> : ""
                                }
                                {notification.notification_type === "Injectable" ?
                                    <Link href={`/injectables/injectable/detail/${notification.code}`}>{notification.notification_type} - {formatDate(notification.notification_date)}</Link> : ""
                                }
                            </li>
                            <div className="dropdown-divider"></div>
                        </>
                    ))}
                </ul>
            </li>
        </>
    )
}