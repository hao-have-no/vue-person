//令牌机制

1.RFC-reader:
Break-token规范：
在通过http访问被Oauth2保护的资源，如何使用令牌规范
特点:令牌就是身份，置于请求头中，无需证明所有权
具体规定:请求头中定义Authorization
Authorization:Bearer<token>

2.json Web Token(jwt认证)
概念：令牌的具体定义
规定：令牌由头，载荷，签名组成
头：加密算法，令牌类型
载荷：用户信息，签发时间，过期时间
签名：根据头，载荷及秘钥加密得到的字符串（加密算法:HS256,后端可见）
