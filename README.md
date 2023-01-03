# Ah


## 環境設定（初めて）
npm i
npm install webpack



### ファイアウォール関連のコマンド
sudo ufw status
sudo ufw allow 3000/tcp
sudo ufw status numbered 
sudo ufw delete 6


### 
git pull && webpack --mode production
### dockerイメージ作成
sudo docker build . -t ojagggyo/accounthistory

### docker PUSH
sudo docker login -u ojagggyo 
sudo docker push ojagggyo/accounthistory

### コンテナ作成
sudo docker run -d --name accounthistory --net=mynet0 --ip=172.100.0.102 -p 3000:3000 ojagggyo/accounthistory

