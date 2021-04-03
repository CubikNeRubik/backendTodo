export const dbName = "todo";
export const dbUser = "admin";
export const dbPassword = "n1tF0zSpm302zLvp";
export const dbHost = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.b8l4t.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export const AccessTokenSignConfig = {
    secret: 'spIsVUElJl9hlgKBIjMDk6IDC3BWlGUkB2ThH4QVUs6l73Jj24Glj0McCXzovovWzoiiUqcnlbBvlj291ok9kKMJHvtvVemoVri8PZsho2TV5zeQ7kKM0zX2LqBdxDS9jga5eiJceoHbhDN3Xsa0zahICOZ3R_oiV7FlgOlbku8IOTzMWeLoS8jB3vkfIs4NOcXj6zzr3TlwAWr7-6edPbRNWAdIABnxWjFDROcUOlm1r-fCXb3yTwQe5Uq-56K3G0LjjefDuaVukedeGqDaLqpFS5ubq6eKkeSHc4Vp6i32v3GG-H02Cz9S5p2jCnmJMq2UUgAU3dc8jN0zYKv7miw',
    expiresIn: '60s'
};

export const AccessTokenVerifyConfig = {
    secret: AccessTokenSignConfig.secret,
};

export const RefreshTokenSignConfig = {
    secret: 'qnXmniCI7W2Gt3viS3vHYFUuLSjHKNJgtbP1eNu_enx7VYHbtlf3eKtfpfRgMRdaUEoCU_U-LRQ2dThF8cv1bWEWZC4GYRTDxG3IE-Vzuwjz61Ycy9cLU6j1QHN21hqd-B-lDUnWoEZSx1K4oYLEy6Q00BTEc26NfQ2_f1CnbJdTYnTWtCc6p9uyikd7piHZek69unQbn6R853gPKlAr_N4_yLXE-AisoSpFQHZuzMv18WLb_TPd09IgLRE9PMbkUA9cXofFUSmZNIWu8UdgdQwIawk2FqabZkIurQqMeePS5sBfIu5sYoL7GZ4Nv8JuRqCbbU33yfe5DIeNFX9NBQ',
    expiresIn: '14d'
}

export const RefreshTokenVerifyConfig = {
    secret: RefreshTokenSignConfig.secret,
}