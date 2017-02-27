# memberconnect
Membership connection project

The membership function is now covered by a google sheet with a layout page that gets piped into wordpress.  It is hacky and has grown to large to be really useful, but I will outline the workflow as a ground zero to start from.

## Current method
1. meet new person interested in DAHI
2. ask person to enter name, email, affiliation (usually a dept or major), role (student, faculty, etc) in a scratch google sheet
3. import one or more lines to live spreadsheet and resort the sheet alphabetically on last name.
4. send out welcome message to new member that outlines DAHI and how to participate, and asks new member to take a moment and fill in their interests in the live spreadsheet and check that it turns up on the web site.  This is a "behavior" step to get the person to interact a little bit after they have joined by thinking about areas of interest and possible participation in a context where they can look around and see what others are interested in at the same time.  In short, this step could be streamlined out of the flow by collecting all the info at the outset, but it lose the slight socialization effect.  We want new members to to get oriented by that little short and easy participation.
5. a second page in the live sheet takes a subset of the first page columns: name, affilation, and interests and pipes them in as callouts on the second page.  This serves the function of splitting public info on the second page afrom info that only other people with access to the spreadsheet have like web site and email and role, all columns on the first page.
6. Via a wordpress plugin, the second page of the live sheet appears in an iframe as the "[People](http://dahi.manoa.hawaii.edu/people-2/)" page of the web site.  
7. if a member ceases to partici[pate, they can delete their own line or we can do it for them.  

### advantages
1. participatory in a very shallow learning curve way.
2. introduces new participant to others
3. instant gratification: goes live as soon as you enter it.
4. separation of public from internal info

### problems
1. Layout is clunky and difficult to format.
2. the list has grown too big and is a bit too much to just read through
3. the info is limited to the supplied fields and would be a pain to change in any meaningful way
4. not connected to [achievements](https://github.com/digiah/2do/issues/134) or [resources](http://dahi.manoa.hawaii.edu/resources/) (an even hackier mess based on goole forms=>sheets=>wordpress sheets iframe).  Would like to see them all integrated.  
5. it is ugly :)

## Proposed method:
move to a database (mongo?) and figure out new ways to interact with it.  
I am thinking something like several spaces: 
* A name space with everything associated with a person, 
* an achievements space where a person could complete achievements and have them tacked on to their namespace, 
* an interests space, maybe based on some sort of tag cloud, that would drill down to names and their attendant namespaces.
* A resources space.  We would need to talk about how to connect this, and what the criteria for inclusion would be.  a giant link farm would not be helpful, but a clearinghouse for "meta" resources like [DiRT](http://dirtdirectory.org/) and [HASTAC](https://www.hastac.org/) would be useful, as would a collection of UH or Hawaiʻi-specific resources, like the [UH Mānoa plants on campus](http://manoa.hawaii.edu/landscaping/plantmap.php) interactive map.  Needs some discussion and planning
* Anything else? Am I missing anything?

@kelseykato and @damg70 had discussed the front end as some sort of gaming interface.  They can fill that in.  


# Local Installation

Prerequisites ([Node](https://nodejs.org/))

```
git clone https://github.com/digiah/memberconnect.git
  
cd /memberconnect

npm install
  
node index.js
```

### Description

Served up with PM2 and Apache 

#### Things Changed

Bottom of Apache httpd.conf file

```
pm2 list
```
