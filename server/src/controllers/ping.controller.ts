import {get} from '@loopback/rest';

export class PingController {
  @get('/')
  ping(): object {
    return {started: new Date().toISOString(), uptime: process.uptime()};
  }
}
