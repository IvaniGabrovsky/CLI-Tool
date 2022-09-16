var sys = require('sys,');

inputFile = '';
    outputFile = 'defaultOut.txt';
    outputFolder = './dist';
    name = 'SSJ SSG the Super Saiyan Site Tool';
    version = '0.0.1';
    token = '<body>';
    template = /* <!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Filename</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

</body>
</html> */
pos = template.find(token) + len(token);

    try {
        opts, args = getopt.getopt(argv, 'vhi:o:', ['version', 'help', 'input=', 'output=']);
    } catch ( getopt.GetoptError) {
        console.log ('Error with GetOpt');
        sys.exit(2);
    }
    for (opt, arg in opts) {
        if (opt in ('-v', '--version')) {
           console.log ('Name: ' + name, '\nVersion: ' + version)
        } else if (opt in ('-h', '--help') {
            console.log('This tool is designed to take a plain text file and generate a HTML markup file based upon it.\nPossible options:\n -i or --input to specify an input file\n -o or --output to specify the name of the output file that will be created\n -v or --version to see the name and version of the tool\n');
        } else if (opt in ('-i', '--input') {
            inputFile = arg;
        } else if (opt in ('-o', '--output') {
            outputFile = arg;

    paragraphs = []

    try {
        file = open(inputFile, 'r');

        Lines = file.readlines();

        for (line in Lines) {
            if (line != '\n') {
                newLine = '<p>' + line + '</p>';
            }
                paragraphs.push(newLine);

    } catch ( OSError as e) {
        console.log('Error: ' + String(e));


    try {
        fileOut = open(outputFile, 'w');

        for (paragraph in reversed(paragraphs)) {
            template = template[:pos] + paragraph + template[pos:];

        fileOut.write(template);

    } catch ( OSError as err) {
        console.log('Error: ' + String(err));

        }
    console.log ('Input file: ', inputFile);
    console.log ('Output file: ', outputFile);
    console.log (template);
    console.log (paragraphs);


if (__name__ == '__main__') {
   main(sys.argv[1:]);
}
    }

        }

    }

        }

) {;

        }
) {;

        }
) {;

        }
    }