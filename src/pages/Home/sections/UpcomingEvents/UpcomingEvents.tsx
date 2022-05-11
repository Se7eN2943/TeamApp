import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { Link } from 'react-router-dom'

import Slider from '../../../../components/Slider'
import { EventDto } from '../../../../types'
import { GetEventsInCity } from '../../../../services/GetEventsInCity'

import s from './UpcomingEvents.module.scss'

const UpcomingEvents = () => {
  const [events, setEvents] = useState<any>([])

  useEffect(() => {
    GetEventsInCity('Москва').then((events) => setEvents(events.eventDtoList))
  }, [])

  return (
    <section className={s.upcomingEvents}>
      <h1 className={s.title}>Ближайшие мероприятия возле вас</h1>
      <Slider<EventDto>
        gap={9}
        width={516}
        height={268}
        data={events}
        startFrom="middle"
        renderItem={(event) => {
          return (
            <div className={s.eventCard} key={v4()}>
              <div className={s.eventCard__tags}>
                {event.eventInterests.map((item) => (
                  <div key={item.id} className={s.eventCard__tag}>
                    {item.title}
                  </div>
                ))}
              </div>
              <div className={s.eventCard__info}>
                <div className={s.eventCard__name}>{event.eventName}</div>
                <div className={s.eventCard__desc}>
                  {event.descriptionEvent}
                </div>
                <div className={s.eventCard__dateTime}>{event.timeEvent}</div>
                <div className={s.eventCard__address}>город {event.city}</div>
              </div>
            </div>
          )
        }}
      />
      <Link to={'/events/moscow'}>
        <button className={s.upcomingEvents__otherEvents}>
          Другие мероприятия
        </button>
      </Link>

      {/* <div className={s.stats}>
        {[
          {
            title: "Всего мероприятий",
            count: "335 003",
          },
          {
            title: "Всего участников",
            count: "1 335 003",
          },
        ].map(({ title, count }) => (
          <div className={s.statsCard} key={title}>
            <div className={s.statsCard__title}>{title}</div>
            <div className={s.statsCard__count}>{count}</div>
          </div>
        ))}
      </div> */}
    </section>
  )
}

export default UpcomingEvents
