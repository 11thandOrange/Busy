#!/bin/bash

#nvm use 20

node /startScripts.js
echo "startScripts ran successfully."

export PORT=3030

npm run start
