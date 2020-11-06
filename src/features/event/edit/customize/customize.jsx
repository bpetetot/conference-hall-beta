import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import cn from 'classnames'
import firebase from 'firebase/app'

import Button from 'components/button'
import Banner from 'features/event/page/banner'
import { useSaveEvent } from 'features/event/useEvents'
import styles from './customize.module.css'

const MAX_SIZE = 100 * 1024 // 100kB

const CustomizeForm = () => {
  const { eventId } = useParams()
  const [percentage, setPercentage] = useState()
  const [error, setError] = useState()
  const [saveEvent] = useSaveEvent(eventId)

  const handleUpload = (e) => {
    setError()
    if (!e.target.files || e.target.files.length === 0) return
    setPercentage(0.1)

    const file = e.target.files[0]
    if (file.size > MAX_SIZE) {
      setError('Image weight too large, maximum size is 100kB')
      return
    }

    const ref = firebase.storage().ref(`${eventId}/banner.img`)
    const task = ref.put(file)
    task.on(
      'state_changed',
      ({ bytesTransferred, totalBytes }) => {
        setPercentage(parseInt((bytesTransferred / totalBytes) * 100, 10))
      },
      setError,
      async () => {
        const url = await task.snapshot.ref.getDownloadURL()
        setPercentage()
        return saveEvent({ bannerUrl: url })
      },
    )
  }

  return (
    <div className={cn(styles.form, 'card')}>
      <h3>Customize event banner</h3>
      <p>Upload your event banner to have a fancy style.</p>
      <ul>
        <li>Best resolution 1500px x 500px</li>
        <li>Only jpeg or png format</li>
        <li>
          100kB max (you can optimize your image with{' '}
          <a href="https://squoosh.app" target="NEW">
            squoosh.app
          </a>
          )
        </li>
      </ul>

      <div className={styles.uploadWrapper}>
        <div className={styles.upload}>
          <Button disabled={!!percentage}>
            {percentage ? `Uploading ${percentage}%...` : ' Upload a banner image'}
          </Button>
          <input type="file" name="myfile" accept="image/png, image/jpeg" onChange={handleUpload} />
        </div>
        <div className={styles.error}>{error}</div>
      </div>

      <Banner eventId={eventId} />
    </div>
  )
}

export default CustomizeForm
