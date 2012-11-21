## firstNameToGender

### What?

Determine the gender for a given first-name.
The data-source was scraped from the german wikipedia and converted to json.

Data-Source: http://de.wikipedia.org/wiki/Liste_von_Vornamen

There is a scraper included which can be run to update the names.

### Usage

```javascript

firstNameToGender("Michael"); //=> "m"
firstNameToGender("Veronika"); //=> "f"

```

The function is returning __m__ ale __f__ emale of __mf__ for names that can be both.
