import React, { FC, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import Loop from '../../../../components/Loop/Loop'
import { getTopUsers } from '../../../../services/getTopUsers'
import { CardProps, UserDto } from '../../../../types'

import Card from './Card'
import s from './Organizators.module.scss'

const Organizators: FC = () => {
  const [runLoop, setRunLoop] = useState<boolean>(false)
  const [data, setData] = useState<Partial<CardProps>[]>([
    {
      name: 'Danil',
      surname: 'Ternovoi',
      age: 24
    },

    {
      name: 'Anton',
      surname: 'Ternovoi',
      age: 24
    },

    {
      name: 'Olga',
      surname: 'Belova',
      age: 24
    },

    {
      name: 'Lena',
      surname: 'Zotova',
      age: 24
    },

    {
      name: 'Sergey',
      surname: 'Zotov',
      age: 24
    },
    {
      name: 'Danil',
      surname: 'Ternovoi',
      age: 24
    },

    {
      name: 'Anton',
      surname: 'Ternovoi',
      age: 24
    },

    {
      name: 'Olga',
      surname: 'Belova',
      age: 24
    },

    {
      name: 'Lena',
      surname: 'Zotova',
      age: 24
    },

    {
      name: 'Sergey',
      surname: 'Zotov',
      age: 24
    },

    {
      name: 'Sergey',
      surname: 'Zotov',
      age: 24
    }
  ])

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getTopUsers('Москва').then((users) => {
      const topUsers: Partial<CardProps>[] = users.map((user: UserDto) => {
        return {
          name: user.firstName,
          surname: user.lastName,
          age: user.age,
          photo: user.photo,
          desc: user.aboutUser
        }
      })
      setData(topUsers)
    })
  }, [])

  useEffect(() => {
    if (wrapperRef.current) {
      const {
        current: { clientHeight, offsetTop }
      } = wrapperRef

      const check = () => {
        const isTreshold = window.scrollY >= offsetTop - clientHeight * 0.9

        if (isTreshold) return setRunLoop((prev) => (prev ? prev : true))
        return setRunLoop(false)
      }

      window.addEventListener('scroll', check)
      window.addEventListener('load', check)
      return () => window.removeEventListener('scroll', check)
    }
  }, [wrapperRef])

  return (
    <section ref={wrapperRef}>
      <header className={s.header}>
        <h1 className={s.title}>Популярные организаторы</h1>
        <p className={s.subTitle}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
      </header>

      <Loop<Partial<CardProps>>
        data={data}
        renderItem={(el) => <Card {...el} />}
        width={325}
        height={435}
        gap={6}
        run={runLoop}
      />
      <Link to="/people">
        <button className={s.more}>Больше организаторов</button>
      </Link>
    </section>
  )
}

export default Organizators
