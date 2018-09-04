const path = require('path');
// Using fs-extra because of removeSync is easy to do than fs
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');

// Delete the entire build folder 
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');

// Read the contents of Campaign.sol file
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

console.log('output-->', output);

// Create build folder. ensureDirSync checks if the dir is already exists and creates if doesn't
fs.ensureDirSync(buildPath);

for(let contract in output){

	// outputJsonSync writes json files at given dir.
	fs.outputJsonSync(
		path.resolve(buildPath, contract.replace(':','') + '.json'),
		output[contract]
	);
}

