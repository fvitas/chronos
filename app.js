
process.env.NODE_ENV === 'development'
    ? require('./src/main/main')
    : require('./build/main/main')
