module.exports = {
    apps : [{
      name: 'My-Next-Todo',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 7779', //running on port 3000
      instances: 1,
      watch: false,   
    }]
  };