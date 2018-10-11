# Check environment variables
# bash check-env-variables.sh

# Build server side
echo "===== Bundling server side ====="
npm run server-build


# Build server side
echo "===== Bundling client side ====="
npm run client-build

# PRODUCTION: this statement will be ignored and  heroku will run command in Procfile to start the server.
# DEVELOPMENT: server will be started within the following statement.
if [ "$NODE_ENV" = 'development' ]; then
    echo "===== Running express server ====="
    node server-dist/server.js
fi
