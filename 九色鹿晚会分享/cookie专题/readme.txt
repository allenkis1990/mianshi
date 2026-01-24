 ssoLogin实现原理
 不同源的网站A和网站B 同时调用网站C的接口，只要C在响应头里写下了cookie，那么无论是A还是B，只要有调C，C设置的cookie就共享

 跨站携带cookie
 ajax请求只要设置对应参数，服务端也配合设置对应参数是可以set-cookie到浏览器上，但不知什么原因显示不出来，
 实际上有,从请求头上可以看出有带了之前设置的cookie
 使用jsonp没问题