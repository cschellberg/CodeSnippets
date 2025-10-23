### Code Snippets

This repository contains a collection of useful code snippets 
for various programming languages and tasks. Each snippet is 
designed to solve a specific problem or demonstrate a particular technique. 
They are meant to be packaged separately.
Each has its own package.json and its own webpack.config.

### Counters

The counters snippet is a javascript class that implements a
multi-counter multi-radix series of counters.  Each counter in 
the collection can have a distinct radix.  It works similar to
an odometer in a car.  The counters are only incremented by the least
significant counter.  When a counter reaches its radix it rolls
over to zero and increments the next most significant counter.

Here is the readme for the counters snippet:
[Counters Readme](./packages/counters/README.md)

### React Forms and Tables

This package implements a generic solution for building forms and tables
in React.  The forms and tables are built from a JSON configuration file. The configuration file
specifies the fields, labels, data types, and validation rules for the form or table. It maintains
state through react-redux and one slice is shared between 
diferent forms and tables.  The item slice are separated by the slice type
which is determined by the user.  In the example there are 
two types of forms/tables: members and events.  So the respective slice types
are members and events.

Here is the readme for the react-forms-tables snippet:
[React Forms and Tables Readme](./packages/react/form/README.md)
