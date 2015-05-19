#Vulcun Coding Challenge
#!-Database is no longer connected-!.

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

- Try to avoid (at all cost) storing collection data in a relational database column. If you really need to store object or array data going with a NoSQL db might be a better choice. Amended: After futher reading to say 'NEVER DO THIS' is not a good way to look at a tool. The use case for storing JSON may be small but never say never.

- [JSON Query SQL Database Info](http://stackoverflow.com/questions/23723473/query-json-inside-sql-server-2012-column).
to be continued...

