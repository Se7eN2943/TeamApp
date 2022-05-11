import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

import CardEvent from '../../components/CardEvent/CardEvent'
import { RootState } from '../../redux/store'

import Modal from './components/Modal'
import s from './PersonalArea.module.scss'

const eventList = [
  {
    id: 0,
    eventName: 'Выставка картин',
    descriptionEvent: 'Выставка разнообразных картин',
    placeEvent: 'Эрмитаж',
    city: 'Санкт-Петербург',
    timeEvent: [1, 2, 3],
    eventPrivacy: false,
    eventNumberOfParticipant: 100,
    eventType: {
      id: 0,
      type: 'Выставка'
    }
  },
  {
    id: 1,
    eventName: 'Выставка картин',
    descriptionEvent: 'Выставка разнообразных картин',
    placeEvent: 'Эрмитаж',
    city: 'Санкт-Петербург',
    timeEvent: [1, 2, 3],
    eventPrivacy: false,
    eventNumberOfParticipant: 100,
    eventType: {
      id: 0,
      type: 'Выставка'
    }
  },
  {
    id: 2,
    eventName: 'Выставка картин',
    descriptionEvent: 'Выставка разнообразных картин',
    placeEvent: 'Эрмитаж',
    city: 'Санкт-Петербург',
    timeEvent: [1, 2, 3],
    eventPrivacy: false,
    eventNumberOfParticipant: 100,
    eventType: {
      id: 0,
      type: 'Выставка'
    }
  },
  {
    id: 3,
    eventName: 'Выставка картин',
    descriptionEvent: 'Выставка разнообразных картин',
    placeEvent: 'Эрмитаж',
    city: 'Санкт-Петербург',
    timeEvent: [1, 2, 3],
    eventPrivacy: false,
    eventNumberOfParticipant: 100,
    eventType: {
      id: 0,
      type: 'Выставка'
    }
  },
  {
    id: 4,
    eventName: 'Выставка картин',
    descriptionEvent: 'Выставка разнообразных картин',
    placeEvent: 'Эрмитаж',
    city: 'Санкт-Петербург',
    timeEvent: [1, 2, 3],
    eventPrivacy: false,
    eventNumberOfParticipant: 100,
    eventType: {
      id: 0,
      type: 'Выставка'
    }
  },
  {
    id: 5,
    eventName: 'Выставка картин',
    descriptionEvent: 'Выставка разнообразных картин',
    placeEvent: 'Эрмитаж',
    city: 'Санкт-Петербург',
    timeEvent: [1, 2, 3],
    eventPrivacy: false,
    eventNumberOfParticipant: 100,
    eventType: {
      id: 0,
      type: 'Выставка'
    }
  }
]

const PersonalArea: FC = () => {
  const {
    firstName,
    lastName,
    email,
    age,
    city,
    photo,
    username,
    userInterests,
    aboutUser
  } = useSelector((state: RootState) => state.userReducer.userDto)

  const renderEvents = (): number => (window.window.innerWidth >= 1920 ? 3 : 2)

  const [slice, setSlace] = useState<number>(renderEvents())
  const [modalActivate, setModalActivate] = useState<boolean>(false)

  const events: any = eventList.map((event: any) => (
    <div key={event.id} className={`${s.card}`}>
      <CardEvent key={event.id} event={event} />
    </div>
  ))

  const interests: any = userInterests?.map((interest) => {
    const title = interest.title[0].toUpperCase() + interest.title.slice(1)
    return (
      <div key={interest.id} className={`${s.interest}`}>
        {title}
      </div>
    )
  })

  return (
    <>
      <div className={`${s.personalArea}`}>
        <div className={s.edit_btn}>
          <button onClick={() => setModalActivate(true)} className={s.btnFill}>
            Редактировать
          </button>
        </div>
        <div className={`${s.basicData}`}>
          <div className={`${s.basicData_data}`}>
            <div className={`${s.basicData_avatar}`}>
              <img src={photo} alt="Avatar" />
            </div>
            <div className={`${s.basicData_information}`}>
              <h2 className={`${s.basicData_information__name}`}>
                {firstName + ' ' + lastName}
              </h2>
              <span className="basicData_information__username">
                {username}
              </span>
              <span className="basicData_information__email">{email}</span>
              <span className="basicData_information__age">{age}</span>
              <span className="basicData_information__city">{city}</span>
            </div>
          </div>
          <div className={`${s.basicData_subscribesAndEvents}`}>
            <div className={`${s.basicData_subscribes}`}>
              <div className={`${s.basicData_subscribes__images}`}>
                <img src={photo} alt="" />
                <img src={photo} alt="" />
                <img src={photo} alt="" />
              </div>
              <span className="basicData_subscribes__title">
                {`${eventList.length + 17} подписчиков`}
              </span>
            </div>
            <span className="basicData_events">
              {`${eventList.length} мероприятий`}
            </span>
          </div>
        </div>

        <div className={`${s.aboutUs}`}>
          <h3 className={`${s.blockTitle}`}>Обо мне</h3>
          <div className={`${s.aboutUs_block}`}>
            <p className={`${s.aboutUs_text}`}>{aboutUser}</p>
          </div>
        </div>

        <div className={`${s.interests}`}>
          <h3 className={`${s.blockTitle}`}>Интересы</h3>
          <div className={`${s.interests_conteiner}`}>{interests}</div>
        </div>

        <div className={s.myActivities}>
          <h3 className={s.blockTitle}>Мои мероприятия</h3>
          <div className={s.myActivities_conteiner}>
            {events.slice(0, slice)}
          </div>
          <div className={s.myActivities_btn}>
            <button
              onClick={() => setSlace(slice + renderEvents())}
              className={s.btnFill}
            >
              Больше мероприятий
            </button>
          </div>
        </div>
      </div>
      <Modal
        modalActivate={modalActivate}
        setModalActivate={setModalActivate}
      />
    </>
  )
}

export default PersonalArea
