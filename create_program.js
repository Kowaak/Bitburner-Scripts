/** @param {NS} ns */
export async function main(ns) {

// need singularity

const programName = "BruteSSH.exe";
const success = ns.singularity.createProgram(programName);
if (!success) ns.tprint(`ERROR: Failed to start working on ${programName}`);


}