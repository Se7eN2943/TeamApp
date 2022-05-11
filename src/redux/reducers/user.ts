import { createSlice } from '@reduxjs/toolkit'

import { UserDtoRedux } from '../../types'

const initialState: UserDtoRedux = {
  token: '',
  userDto: {
    id: 0,
    username: '',
    firstName: 'Иван',
    lastName: 'Иванов',
    middleName: 'Иванович',
    photo: 'https://images.unsplash.com/photo-1532318065232-2ba7c6676cd5?w=200',
    email: '',
    city: 'Москва',
    aboutUser: '',
    userInterests: [],
    age: 18,
    role: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDTO(state, action) {
      return (state = action.payload)
    }
  }
})

export default userSlice.reducer
export const { userDTO } = userSlice.actions
