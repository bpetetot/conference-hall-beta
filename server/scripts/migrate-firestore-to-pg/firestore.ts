import path from 'path'
import { initializeApp, cert } from 'firebase-admin/app'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env.local') })

const projectId = process.env.FIREBASE_PROJECT_ID
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL

export function initFirestore() {
  console.log('Connect to firestore...')
  initializeApp({ credential: cert({ projectId, privateKey, clientEmail }) })
  console.log('Connected.')
}
