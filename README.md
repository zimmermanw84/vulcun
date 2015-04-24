# Vulcun Coding Challenge

##TODOS:

- Add DB indexing for search optimization

- Learn more about node layout templating to DRY it up

- Add Mocha.js for testing

- Pagination for cleanliness

##Lessions Learned:

- Read the documentation thoroughly before choosing any module (esp. ORM)

- When running multiple dynos on Heroku and Socket.io there will be connection issues. Will have to use a non-memory session store. Such as RedisStore, MongoStore etc.

- When dealing with big databases setup search indexes from the beginning for search optimization.

- Also dealing with big databases make sure to choose a server and/or hosting platform that can handle data.

- Try to avoid (at all cost) storing serialized data in a relational database. If you really need to store object or array data going with a NoSQL db might be a better choice.

- Don't check in node_modules

to be continued...

