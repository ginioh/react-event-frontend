import fs from 'fs';

let isDockerCached;

const _hasDockerEnv = () => {
	try {
		fs.statSync('/.dockerenv');
		return true;
	} catch {
		return false;
	}
}

const _hasDockerCGroup = () => {
	try {
		return fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker');
	} catch {
		return false;
	}
}

const isDocker = () => {
	// TODO: Use `??=` when targeting Node.js 16.
	if (isDockerCached === undefined) {
		isDockerCached = _hasDockerEnv() || _hasDockerCGroup();
	}

	return isDockerCached;
}

export default isDocker;