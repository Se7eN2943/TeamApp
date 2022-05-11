export const GetAllEvents = async () => {
  try {
    const res = await fetch('http://localhost:8080/public/event')
    if (!res.ok) {
      throw new Error(`${res.status}`)
    }

    const body = await res.json()
    return body
  } catch (err) {
    return err
  }
}

//не используется
