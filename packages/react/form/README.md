## Pre-Requisites
You need to install node js on your machine to run this project. You can download it from [here](https://nodejs.org/en/download/).

### Overview

This package provides a set of React components and hooks to simplify form handling in React applications. It includes features such as form validation, state management, and easy integration with popular UI libraries.
Forms and tables are configured using JSON schema, making it easy to create dynamic and complex forms with minimal code.

The schema can be found [schema](./form-config.schema.json)
### Schema Breakdown
This JSON Schema defines the following constraints:

**Root Level:** The configuration must be an object and must contain formClassName and elements.  
**formClassName:** Must be a string.  
**elements:** Must be an array of element objects.  
**Element Object:**
**Required Fields:** Every element must have a name and a type.  
**Conditional Logic (allOf / if/then):** If the element's "type" is "select", "checkbox", or "radio", it is required to include the "options" array.  
**validation:** Defined as an object, primarily checking for a "pattern" string (which is expected to be a regex).  
**options:** Defined as an array where each item must be an object containing a label and a value.  

### Building the Package
From the react/form directory, run the following command to build the package:  
npm run build

### Running Tests
After cloning the directory you can run the react front end by executing this command  
npm run start

### Running the Demo
After building the package, you can run the demo by executing this command  
npm run demo

