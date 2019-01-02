import React from 'react'

import Thread from 'components/thread'

import styles from './organizersThread.module.css'

const OrganizersThread = () => (
  <Thread
    className={styles.organizersThread}
    description="Discuss with other organizers about this proposal. The speaker WILL NOT see these comments."
    messages={[
      {
        id: 'message1',
        name: 'Luke Skywalker',
        content:
          'May the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with you',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
      {
        id: 'message2',
        name: 'Darth Vader',
        content: 'Luke, I am your father',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/7/76/Darth_Vader.jpg',
      },
      {
        id: 'message3',
        name: 'Luke Skywalker',
        content: 'Noooooooooooo !!!!!',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
      {
        id: 'message4',
        name: 'Luke Skywalker',
        content:
          'May the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with you',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
      {
        id: 'message5',
        name: 'Darth Vader',
        content: 'Luke, I am your father',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/7/76/Darth_Vader.jpg',
      },
      {
        id: 'message6',
        name: 'Luke Skywalker',
        content: 'Noooooooooooo !!!!!',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
      {
        id: 'message7',
        name: 'Luke Skywalker',
        content:
          'May the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with you',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
      {
        id: 'message8',
        name: 'Darth Vader',
        content: 'Luke, I am your father',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/7/76/Darth_Vader.jpg',
      },
      {
        id: 'message9',
        name: 'Luke Skywalker',
        content: 'Noooooooooooo !!!!!',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
      {
        id: 'message10',
        name: 'Luke Skywalker',
        content:
          'May the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with you',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
      {
        id: 'message11',
        name: 'Darth Vader',
        content: 'Luke, I am your father',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/7/76/Darth_Vader.jpg',
      },
      {
        id: 'message12',
        name: 'Luke Skywalker',
        content: 'Noooooooooooo !!!!!',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
      {
        id: 'message13',
        name: 'Luke Skywalker',
        content:
          'May the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with youMay the force be with you',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
      {
        id: 'message14',
        name: 'Darth Vader',
        content: 'Luke, I am your father',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/7/76/Darth_Vader.jpg',
      },
      {
        id: 'message15',
        name: 'Luke Skywalker',
        content: 'Noooooooooooo !!!!!',
        date: new Date(),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
    ]}
  />
)

export default OrganizersThread
