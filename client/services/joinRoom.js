import * as QNRTC from 'pili-rtc-web';

export default class JoinRoom {
  constructor(roomToken, room) {
    this.roomToken = roomToken;
    this.room = room;
  }
  async joinRoom() {
    this.myRoom = new QNRTC.TrackModeSession();
    // 这里替换成刚刚生成的 RoomToken
    await this.myRoom.joinRoomWithToken(this.roomToken);
    console.log('joinRoom success!');
    await this.publish(this.myRoom);
  }

  async publish() {
    const params = {
      audio: { enabled: true, tag: 'audio' },
      video: { enabled: true, tag: 'video' },
      screen: { enabled: true, tag: 'screen' },
    };
    const localTracks = await QNRTC.deviceManager.getLocalTracks(params);
    console.log('my local tracks', localTracks);
    console.log('track 1 tag is', localTracks[0].info.track);
    console.log('track 2 tag is', localTracks[1].info.track);
    console.log('track 3 tag is', localTracks[2].info.track);
    // 将刚刚的 Track 列表发布到房间中
    await this.myRoom.publish(localTracks);
    console.log('publish success!');
    // 遍历本地采集的 Track 对象
    this.tracks = {};
    localTracks.forEach(localTrack => {
      this.tracks[localTrack.info.tag] = localTrack;
    });
  }

  playVideo() {
    this.tracks.video.play(this.room, true);
  }

  playScreen() {
    this.tracks.screen.play(this.room, true);
  }
}
