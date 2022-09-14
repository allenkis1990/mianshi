/**
 * Created by Allen Liu on 2022/8/30.
 */

const NodeMediaServer = require('node-media-server');
//http://localhost:8082/admin 管理端
let path = require('path')
let ffmpegUrl = path.resolve('F:\\刘伟恒日常工具\\ffmpeg\\ffmpeg-5.0.1-essentials_build\\bin\\ffmpeg.exe')
console.log(ffmpegUrl);
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 3030
  },
  http: {
    port: 8082,
    mediaroot: './media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: ffmpegUrl,
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        hlsKeep: true, // to prevent file delete after end the stream
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};

var nms = new NodeMediaServer(config)
nms.run();