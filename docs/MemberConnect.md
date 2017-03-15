
# MemberConnect Documentation

## Basics
- The NodeJS Server that is serving up the application is running on port ```9696```
- in the bottom of the ```/etc/httpd/conf/httpd.conf``` file, there is a line that passes all /njs/ routes to the Node Server
    * ```ProxyPass /njs http://localhost:9696```

## Data Query Routes
- To query for data from the MongoDB, use the following route. ``http://dahi.manoa.hawaii.edu/njs/memberconnect/data/```
   * http://dahi.manoa.hawaii.edu/njs/memberconnect/data/richard|david
   * http://dahi.manoa.hawaii.edu/njs/memberconnect/data/first_name=richard
   * http://dahi.manoa.hawaii.edu/njs/memberconnect/data/first_name=richard|his$

## MongoDB
- We have a main user for the MongoDB called ```dev```, with a password of ```p@ssword1```.
    * ```mongo --port 27017 -u "dev" -p "p@ssword1" --authenticationDatabase "memberconnect"```






