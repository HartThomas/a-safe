**Instructions**
```
  git clone https://github.com/HartThomas/a-safe.git
```
Now we need to install mongodb:
```
  sudo apt install -y mongodb
```
If like me you are using WSL you will have to start it like this:
```
  sudo mkdir -p /data/db
  sudo chown -R $(whoami) /data/db
  mongod
```
Otherise use this:
```
  sudo systemctl start mongodb
```
Now you need to open a new terminal:
```
  cd backend
  npm install
  cd ../frontend
  npm install
```
We need to populate the database now:
```
  cd ../backend/scripts
  node importJokes.js
```
Lets start the backend:
```
  cd ..
  node server.js
```
A new terminal is neede again:
```
  cd frontend
  npm run dev
```
Now visit http://localhost:5173/
