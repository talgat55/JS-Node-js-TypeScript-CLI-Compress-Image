#!/usr/bin/env node
const app = require('commander');
const fs = require('fs');
const compressImages = require("compress-images");


interface  IInputValues {
    input: string,
    output: string,
}
app
    .version('1.0.0')
    .option('-i, --input [input]', 'Path input file')
    .option('-o, --output [output]', 'Name output file')
    .action((options: IInputValues) => {
        if(!options.input){
            console.log('Error, entry path to img file.');
        }
        if(!options.output){
            console.log('Error, entry name output file.');
        }
        if (options.input && options.output){
            compressImages(options.input, `./${options.output}`, { compress_force: false, statistic: true, autoupdate: true }, false,
                {
                    jpg: {
                        engine: "jpegtran",
                        command: ["-trim", "-progressive", "-copy", "none", "-optimize"],
                    },
                },
                { png: { engine: false, command: false } },
                { svg: { engine: false, command: false } },
                { gif: { engine: false, command: false } },
                function (error:string, completed:boolean, statistic:object) {
                    console.log("-------------");
                    console.log(error);
                    console.log(completed);
                    console.log(statistic);
                    console.log("-------------");
                }
            );
        }
    });


app.parse(process.argv);