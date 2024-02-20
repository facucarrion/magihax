import HBInit from './index.js'
import { ROOM_CONFIG } from './config/room.config.js'

const room = HBInit(ROOM_CONFIG)

room.onRoomLink = link => console.log(link)
