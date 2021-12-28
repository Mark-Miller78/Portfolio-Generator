const inquirer = require("inquirer");
const generatePage = require('./src/page-template.js');
const {writeFile, copyFile} = require('./utils/generate-site.js');


const promptUser=()=>{
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (required)',
            validate: nameInput => {
                if(nameInput){
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type:'input',
            name:'github',
            message:'Enter your GitHub username (required)',
            validate: usernameInput=>{
                if(usernameInput){
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type:'input',
            name:'about',
            message:'Provide some information about yourself:',
            when: ({confirmAbout})=>{
                if(confirmAbout){
                    return true;
                } else{
                    return false;
                }
            }
        }
    ]);
};

const promptProject =portfolioData=>{
    console.log(`
    =================
    Add a New Project
    =================
    `);
    
    if(!portfolioData.projects){
        portfolioData.projects = [];
    }

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project (required)',
            validate: projectName =>{
                if(projectName){
                    return true;
                } else {
                    console.log('Please enter your projects name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (required)',
            validate: projectDescription =>{
                if(projectDescription){
                    return true;
                } else {
                    console.log('Please enter a project description!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery','Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (required)',
            validate: projectLink =>{
                if(projectLink){
                    return true;
                } else {
                    console.log('Please enter a link to your project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        },

        
    ])

    .then(projectData =>{
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject){
            return promptProject(portfolioData);
        } else{
            return portfolioData;
        }
    }); 
};

promptUser()
    .then(promptProject)
    .then(portfolioData=>{
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });



