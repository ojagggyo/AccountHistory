# Ah


## 環境設定（初めて）
npm i
npm install webpack



### 
git pull && webpack --mode production
### dockerイメージ作成
sudo docker build . -t ojagggyo/accounthistory



### コンテナ作成
sudo docker run -d --name accounthistory --net=mynet0 --ip=172.100.0.102 -p 3000:3000 ojagggyo/accounthistory

