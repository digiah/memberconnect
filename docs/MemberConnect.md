# MemberConnect Documentation

## Basics
- The NodeJS Server that is serving up the application is running on port ```9696``` through PM2 ```pm2 list```
- in the bottom of the ```/etc/httpd/conf/httpd.conf``` file, there is a line that is redirecting all traffic of the dahi.manoa.hawaii.edu/njs/ route to our NodeJS application.```ProxyPass /njs http://localhost:9696```

## Data Query Routes
- To query for data from the MongoDB, use the following route. ```http://dahi.manoa.hawaii.edu/njs/memberconnect/data/{params}``` where the {params} can be any word, or key value pair. Examples.
   * http://dahi.manoa.hawaii.edu/njs/memberconnect/data/richard|david
   * http://dahi.manoa.hawaii.edu/njs/memberconnect/data/first_name=richard
   * http://dahi.manoa.hawaii.edu/njs/memberconnect/data/first_name=richard|history
