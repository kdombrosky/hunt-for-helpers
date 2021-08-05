/*
const inquirer = require('inquirer');

const fs = requrie('fs');

const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {

    return inquirer.prompt(
        [
            {
                type: 'input',
                name:'title',
                message:'Whats the name of your project? (Required)',
                validate: nameInput => {
                    if(nameInput) {
                        return true;
                    } else {
                        console.log('Please enter name of project');
                        return false;
                    }
                }
            },
            {
                type:'checkbox',
                name:'contributors',
                message:'Who contributed to this project (required)',
                choices: ['Brad Keller', 'Kayla Dombrosky', 'Jessie Hinojosa', 'Eric Enriquez']
            },
            {
                type:'input',
                name:'description',
                message:'Please provide a description of your project?',
                validate: descriptionInput => {
                    if(descriptionInput) {
                        return true;
                    } else {
                        console.log('Please enter a description of the project');
                        return false;
                    }
                }
                
            },
            
            {
                type:'list',
                name:'licenses',
                message:'What licenses were used in the making of the app?',
                choices: ['MIT', 'more to be added'],
            },
            
            
            
        ]
    );
    
}
function createMarkdown(answer) {
    return `
    # ${answer.title}
    
    # Home
    
    -[title] (#title)
    
    -[contributors] (#contributors)
    
    -[description] (#description)
    
    -[licensing] (#licensing)
    
    ## Title : 
    ![Title] ${answer.title}
    
    ## Contributors:
    ${answer.contributors}
    
    ## Description: 
    ${answer.descriptionInput}
    
    ## Licensing:
    ${answer.licenses}
    `;
}

async function init()
{
    try {
        const response = await promptUser();

        const readMe = generateMarkdown(answer);

        await writeFileAsync('ReadmeHFH.md', readMe);
    } catch (err) {
        console.log(err);
    }
}
init()       
