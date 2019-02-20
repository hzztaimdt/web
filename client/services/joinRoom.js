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
    // await this.publish(this.myRoom);
  }

  leaveRoom() {
    this.myRoom.leaveRoom();
  }

  // async publish(deviceIds) {
  //   let audioDeviceId;
  //   let videoDeviceId;
  //   if (deviceIds && deviceIds.audio) {
  //     audioDeviceId = deviceIds.audio;
  //   }
  //   if (deviceIds && deviceIds.video) {
  //     videoDeviceId = deviceIds.video;
  //   }
  //   const params = {
  //     audio: { enabled: true, tag: 'audio', deviceId: audioDeviceId },
  //     video: { enabled: true, tag: 'video', deviceId: videoDeviceId, width: 1920, height: 1080 },
  //   };
  //   const localTracks = await QNRTC.deviceManager.getLocalTracks(params);
  //   console.log('my local tracks', localTracks);
  //   // 将刚刚的 Track 列表发布到房间中
  //   await this.myRoom.publish(localTracks);
  //   // this.play(localTracks);
  //   console.log('publish success!');
  //   // 遍历本地采集的 Track 对象
  // }

  async publish(localTracks) {
    await this.myRoom.publish(localTracks);
  }
  async unpublish(localTracks) {
    await this.myRoom.unpublish(localTracks.map(track => track.info.trackId));
  }

  getDevices() {
    const deviceInfo = QNRTC.deviceManager.deviceInfo;
    console.log('my local devices', deviceInfo);
    return deviceInfo;
  }

  async getLocalTracks(params) {
    const localTracks = await QNRTC.deviceManager.getLocalTracks(params);
    return localTracks;
  }

  play(localTracks) {
    if (this.videoTracks) {
      Object.values(this.videoTracks).forEach(i => i.release());
    }

    this.videoTracks = {};
    localTracks.forEach(localTrack => {
      this.videoTracks[localTrack.info.tag] = localTrack;
      if (localTrack.info.tag === 'video') {
        localTrack.play(this.room);
      }
    });
  }

  async subscribe(trackInfoList) {
    const remoteTracks = await this.myRoom.subscribe(trackInfoList.map(info => info.trackId));
    this.tracks = {};
    remoteTracks.forEach(remoteTrack => {
      this.tracks[remoteTrack.info.tag] = remoteTrack;
      // if (remoteTrack.info.tag === 'video') {
      remoteTrack.play(this.room);
      // }
    });
  }

  async unsubscribe(trackInfoList) {
    await this.myRoom.unsubscribe(trackInfoList.map(info => info.trackId));
    trackInfoList.forEach(i => i.release());
  }

  autoSubscribe() {
    // const trackInfoList = this.myRoom.trackInfoList;
    // console.log('room current trackInfo list', trackInfoList);

    // 调用我们刚刚编写的 subscribe 方法
    // 注意这里我们没有使用 async/await，而是使用了 Promise，大家可以思考一下为什么
    this.subscribe(this.myRoom.trackInfoList)
      .then(() => console.log('subscribe success!'))
      .catch(e => console.error('subscribe error', e));

    // 添加事件监听，当房间中出现新的 Track 时就会触发，参数是 trackInfo 列表
    this.myRoom.on('track-add', trackInfoList => {
      console.warn('get track-add event!', trackInfoList);
      this.subscribe(trackInfoList)
        .then(() => console.log('subscribe success!'))
        .catch(e => console.error('subscribe error', e));
    });

    // 添加事件监听，当房间中出现新的 Track 时就会触发，参数是 trackInfo 列表
    this.myRoom.on('track-remove', trackInfoList => {
      console.warn('get track-remove event!', trackInfoList);
      this.unsubscribe(trackInfoList)
        .then(() => console.log('unsubscribe success!'))
        .catch(e => console.error('unsubscribe error', e));
    });
  }
}
