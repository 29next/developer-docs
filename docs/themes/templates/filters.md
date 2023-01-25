---
title: 'Filter Reference'
---

### asset_url
The asset_url filter can be applied to theme asset files to generate CDN link to the asset for loading in the template HTML. The file argument is relative to the assets directory of the theme.
```django
{{ 'style.css'|asset_url }}
```
### add
Adds the argument to the value.
```django
{{ value|add:"2" }}
```
For example, if value is 4, then the output will be 6. The filter will try to force both values to integers. If this fails, it’ll attempt to add the values together anyway. If it fails, the result will be an empty string.

### by_ids
Filters a larger set of objects by id to return only specific objects.
```django
{{ objects|by_ids:'85,84,83' }}
```
Filters the full objects set just only the 3 objects. The filter will return an iterable list of objects which can then access the individual object properties. Used commonly with `products` objects.

### capfirst
Capitalizes the first character of the value.
```django
{{ value|capfirst }}
```
For example,  if the first character is not a letter, this filter has no effect. For example, if value is chicago, the output will be Chicago.

### cut
Removes all values of arg from the given string.
```django
{{ value|cut:" " }}
```
For example, if value is String with spaces, the output will be Stringwithspaces.

### date
Formats a date according to the given format.
```django
{{ value|date:"D d M Y" }}
```

For example, `{{ value|date:"D d M Y" }}` this would convert a date to this format output will be the string Wed 09 Jan 2020. See available date reference for format options.

### default
If value evaluates to False, uses the given default. Otherwise, uses the value.
```django
{{ value|default:"something" }}
```
For example, If value is "" (an empty string), the output will be something.

### default_if_none
If (and only if) value is None, uses the given default. Otherwise, uses the value. Note that if an empty string is given, the default value will not be used. Use the default filter if you want to fallback for empty strings.
```django
{{ value|default_if_none:"something" }}
```
For example, if value is None, the output will be something.

### dictsort
Takes a list of dictionaries and returns that list sorted by the key given in the argument.
```django
{{ value|dictsort:"name" }}
```
For example:
```django
{{ value|dictsort:"category" }}
```
If value is:

```json
[
    {'category': 'B', 'count': 4},
    {'category': 'C', 'count': 22},
    {'category': 'A', 'count': 12}
]
```
then the output would be:
```json
[
    {'category': 'A', 'count': 12},
    {'category': 'B', 'count': 4},
    {'category': 'B', 'count': 4}
]
```
### dictsortedreversed
Takes a list of dictionaries and returns that list sorted in reverse order by the key given in the argument. This works exactly the same as the above filter, but the returned value will be in reverse order.


### divisibleby
Returns True if the value is divisible by the argument.
```django
{{ value|divisibleby:"3" }}
```
For example, if value is 21, the output would be True.

### escape
Escapes a string’s HTML. Specifically, it makes these replacements:
< is converted to &lt;> is converted to &gt;' (single quote) is converted to &#x27;" (double quote) is converted to &quot;& is converted to &amp;
```django
{{ title|escape }}
```

### escapejs
Escapes characters for use in JavaScript strings. This does not make the string safe for use in HTML or JavaScript template literals, but does protect you from syntax errors when using templates to generate JavaScript/JSON.
```django
{{ value|escapejs }}
```
For example, if value is <b>escaping</b>, the output will be \\u003Cb\\u003Eescaping\\u003C/b\\u003E

### first
Returns the first item in a list.

```django
{{ value|first }}
```

For example, if value is the list ['a', 'b', 'c'], the output will be 'a'.

### floatformat

Allows you to specify the number of decimal places to format a float to.

```django
{{ value|floatformat:2 }}
```

For example, if value is 34.2342 and use floatformat:2, the output will be 34.23.

### join

Joins a list with a string.

```django
{{ value|join:" - " }}
```

For example, if value is the list ['a', 'b', 'c'], the output will be the string "a - b - c".

### json_script

Safely outputs a variable object as JSON, wrapped in a `<script>` tag, ready for Javascript.

```django
{{ value|json_script:"my-data" }}
```

For example, if value is the dictionary `{'hello': 'world'}`, the output will be:

```html
<script id="my-data" type="application/json">{"hello": "world"}</script>
```

### last

Returns the last item in a list.

```django
{{ value|last }}
```
For example, if value is the list ['a', 'b', 'c', 'd'], the output will be the string "d".

### language_name_local
Returns a localized name of the language.
```django
{{ LANGUAGE_CODE|language_name_local }}
```
For example, if the value is `fr`, the output would be `Français`.


### length

Returns the length of the value. This works for both strings and lists.

```django
{{ value|length }}
```
For example, if value is `['a', 'b', 'c', 'd']` or "abcd", the output will be 4.

### length_is

Returns True if the value’s length is the argument, or False otherwise.

```django
{{ value|length_is:"4" }}
```
For example, if value is ['a', 'b', 'c', 'd'] or "abcd", the output will be True.

### linebreaks
Replaces line breaks in plain text with appropriate HTML; a single newline becomes an HTML line break `<br>` and a new line followed by a blank line becomes a paragraph break `</p>`.
```django
{{ value|linebreaks }}
```
For example, if value is Joel\nis a slug, the output will be `<p>Joel<br>is a slug</p>`.

### linebreaksbr

Converts all newlines in a piece of plain text to HTML line breaks `<br>`. If value is Sandy is a slug, the output will be ```Sandy<br>is a slug```.

```django
{{ value|linebreaksbr }}
```

### linenumbers

Displays text with line numbers.

```django
{{ value|linenumbers }}
```
For example, if value is:
```django
one
two
three
```
the output will be:

```django
1. one
2. two
3. three
```

### lower
Converts a string into all lowercase.
```django
{{ value|lower }}
```
For example, if value is Totally LOVING this Product!, the output will be totally loving this product!.

### make_list

Returns the value turned into a list. For a string, it’s a list of characters. For an integer, the argument is cast to a string before creating a list.

```django
{{ value|make_list }}
```

For example, if value is the string "Sandy", the output would be the list ['S', 'a', 'n', 'd', 'y']. If value is 123, the output will be the list ['1', '2', '3'].

### pluralize
Returns a plural suffix if the value is not 1, '1', or an object of length 1. By default, this suffix is 's'.

```
You have { num_messages }} message {{ num_messages|pluralize }}
```

### slice

Returns a slice of the list.

```django
{{ some_list|slice:":2" }}
```
For example, if some_list is ['a', 'b', 'c'], and slice to first 2, the output will be ['a', 'b'].

### slugify

Converts to ASCII. Converts spaces to hyphens. Removes characters that aren’t alphanumerics, underscores, or hyphens. Converts to lowercase. Also strips
leading and trailing whitespace.

```django
{{ value|slugify }}
```

For example, if value is "Sandy is a slug", the output will be "sandy-is-a-slug".

### title

Converts a string into titlecase by making words start with an uppercase character and the remaining characters lowercase. This tag makes no effort to keep “trivial words” in lowercase.

```django
{{ value|title }}
```
For example, if value is "my FIRST post", the output will be "My First Post".

### truncatechars_html
Truncates a string if it is longer than the specified number of characters. Truncated strings will end with a translatable ellipsis character ("…").
```django
{{ value|truncatechars:7 }}
```
For example, if value is "Sandy is a slug", the output will be "Sandy i…".


### truncatewords
Truncates a string after a certain number of words based on the argument.

```django
{{ value|truncatewords:2 }}
```
For example, if value is "Sandy is a slug", the output will be "Sandy is …".

### truncatewords_html
Similar to truncatechars, except that it is aware of HTML tags. Any tags that are opened in the string and not closed before the truncation point are closed immediately after the truncation.

```django
{{ value|truncatechars_html:7 }}
```
For example, if value is `<p>Sandy is a slug</p>`, the output will be `<p>Sandy i…</p>`.

### unordered_list

Recursively takes a self-nested list and returns an HTML unordered list – WITHOUT opening and closing  `<ul>` tags. The list is assumed to be in the proper format.

```django
{{ value|unordered_list }}
```

For example, if var contains `['States', ['Kansas', ['Lawrence', 'Topeka'], 'Illinois']]`, then `{{ var|unordered_list }}` would return:

```django
<li>States
    <ul>
        <li>Kansas
            <ul>
                <li>Lawrence</li>
                <li>Topeka</li>
            </ul>
        </li>
        <li>Illinois</li>
    </ul>
</li>
```

### upper
Converts a string into all uppercase.
```django
{{ value|upper }}
```
For example, if value is "Sandy is a slug", the output will be "SANDY IS A SLUG".


### urlencode
Escapes a value for use in a URL.
```django
{{ value|urlencode }}
```

For example, if value is "https://www.example.org/", the output will be "https%3A%2F%2Fwww.example.org%2F".


### wordcount

Returns the number of words.

```django
{{ value|wordcount }}
```


For example, if value is "Joel is a slug", the output will be 4.
