# text-ssg-tool

A Cli tool reading an file with text and converting to an out file in html using Node.js.

## Installation

1. Install the dependencies:

```
npm i
```

2. cd to project folder

## Usage

To get a list of options type "text-ssg-tool" followed by -h.</br>
For any of the commands listed below in the help menu type in "text-ssg-tool" before the command.</br>

# Options

1. `node src/index.js --help` or `node src/index.js -h` to display the usage information

2. Run `node src/index.js --version` or `node src/index.js -v` to display the tool name and version

3. Run `node src/index.js -i [name of the file]` to convert file from markdown or text to html.

4. Run `node src/index.js -l [language] -i [name of the file]` to convert file from markdown or text to html.

5. Run `node src/index.js -i [name of the file] -l [language]` to convert file from markdown or text to html.

# Examples

1. `node src/index.js -i input/inputMD.md` (convert a markdown file inside input folder into html)

2. `node src/index.js -i input/text.txt` (convert a text file inside input folder into html)

3. `node src/index.js -i input/text.txt` (convert all files inside input folder inside Sherlock-Holmes-Selected-Stories into html)

To use a specific language other English add -l followed by the language code dash language Country</br>
"Display help"</br>
"-i, --input <input-file>", "file or folder to parse"</br>
"-l, --lang <laguage>", "language support"</br>
"-o, --output <output-folder>", "output folder"</br>
"-v, --version", "version"</br>
"-h, --help", "display help for SSG"</br>
